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
 * Returns the InquiryCategory matching the provided ID, defaulting to the problem category.
 */
export function getCategoryById(id: string): InquiryCategory {
  const found = INQUIRY_CATEGORIES.find((cat) => cat.id === id);
  return found ?? INQUIRY_CATEGORIES[0];
}

/**
 * Formats a valid mailto: URL with percent-encoded query parameters.
 * If recipient is empty, null, or undefined, returns null to prevent generating unsafe links.
 */
export function generateMailtoUri(options: {
  recipient?: string | null;
  subject: string;
  body?: string;
}): string | null {
  const { recipient, subject, body } = options;

  if (!recipient || recipient.trim() === "") {
    return null;
  }

  const trimmedRecipient = recipient.trim();
  const encodedSubject = encodeURIComponent(subject.trim());
  
  if (body && body.trim() !== "") {
    const encodedBody = encodeURIComponent(body.trim());
    return `mailto:${trimmedRecipient}?subject=${encodedSubject}&body=${encodedBody}`;
  }

  return `mailto:${trimmedRecipient}?subject=${encodedSubject}`;
}
