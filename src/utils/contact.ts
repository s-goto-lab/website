// src/utils/contact.ts
// Contact mailto generation and inquiry encoding utilities (WEB-007 & WEB-008)

export interface InquiryCategory {
  id: string;
  label: string;
  badge: string;
  description: string;
  subjectPrefix: string;
  bodyPlaceholder: string;
}

export const INQUIRY_CATEGORIES: InquiryCategory[] = [
  {
    id: "problem",
    label: "Discuss a Problem / Commissioned Solution",
    badge: "Selected Inquiries",
    description: "Describe an operational bottleneck, repetitive friction, or opportunity for a purpose-built system.",
    subjectPrefix: "[S.goto Lab Inquiry: Problem Evaluation]",
    bodyPlaceholder: "Brief description of the problem, who it impacts, and current workarounds...",
  },
  {
    id: "collaboration",
    label: "Collaboration & Partnership",
    badge: "Partnership",
    description: "Explore research, co-creation, or technical alignment with S.goto Lab initiatives.",
    subjectPrefix: "[S.goto Lab Inquiry: Collaboration]",
    bodyPlaceholder: "Overview of your initiative, team, and proposed area of collaboration...",
  },
  {
    id: "general",
    label: "General Inquiry",
    badge: "General",
    description: "Questions regarding our studio philosophy, published work, or general orientation.",
    subjectPrefix: "[S.goto Lab Inquiry: General]",
    bodyPlaceholder: "Your question or comment for the studio...",
  },
];

/**
 * Validates whether an email string conforms to standard format.
 */
export function validateEmail(email: string | null | undefined): boolean {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  // Standard RFC 5322 compatible email format regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Retrieves the validated public contact email from environment variables,
 * or returns null if unconfigured or malformed.
 */
export function getPublicContactEmail(): string | null {
  const envEmail = (typeof process !== "undefined" && process.env?.PUBLIC_CONTACT_EMAIL)
    || (typeof import.meta !== "undefined" && (import.meta as any).env?.PUBLIC_CONTACT_EMAIL);

  if (!envEmail || typeof envEmail !== "string") {
    return null;
  }

  const trimmed = envEmail.trim();
  return validateEmail(trimmed) ? trimmed : null;
}

/**
 * Returns the InquiryCategory matching the provided ID, defaulting to the problem category.
 */
export function getCategoryById(id: string): InquiryCategory {
  const found = INQUIRY_CATEGORIES.find((cat) => cat.id === id);
  return found ?? INQUIRY_CATEGORIES[0];
}

/**
 * Formats a valid mailto: URL with percent-encoded query parameters.
 * If recipient is missing, invalid, or empty, returns null to prevent generating unsafe links.
 */
export function generateMailtoUri(options: {
  recipient?: string | null;
  subject: string;
  body?: string;
}): string | null {
  const { recipient, subject, body } = options;

  if (!validateEmail(recipient)) {
    return null;
  }

  const trimmedRecipient = (recipient as string).trim();
  const encodedSubject = encodeURIComponent(subject.trim());
  
  if (body && body.trim() !== "") {
    const encodedBody = encodeURIComponent(body.trim());
    return `mailto:${trimmedRecipient}?subject=${encodedSubject}&body=${encodedBody}`;
  }

  return `mailto:${trimmedRecipient}?subject=${encodedSubject}`;
}
