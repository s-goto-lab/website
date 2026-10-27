import { describe, it, expect } from "vitest";
import {
  INQUIRY_CATEGORIES,
  getCategoryById,
  generateMailtoUri,
} from "../../src/utils/contact";

describe("Contact Inquiry & Mailto Logic (WEB-007, WEB-008)", () => {
  it("defines exactly three approved inquiry categories", () => {
    expect(INQUIRY_CATEGORIES).toHaveLength(3);
    const ids = INQUIRY_CATEGORIES.map((cat) => cat.id);
    expect(ids).toEqual(["problem", "collaboration", "general"]);
  });

  it("getCategoryById retrieves expected categories and defaults to problem", () => {
    expect(getCategoryById("problem").id).toBe("problem");
    expect(getCategoryById("collaboration").id).toBe("collaboration");
    expect(getCategoryById("general").id).toBe("general");
    expect(getCategoryById("unknown-id").id).toBe("problem");
  });

  it("returns null when recipient is missing or whitespace (local preview safety gate)", () => {
    expect(generateMailtoUri({ recipient: undefined, subject: "Test" })).toBeNull();
    expect(generateMailtoUri({ recipient: null, subject: "Test" })).toBeNull();
    expect(generateMailtoUri({ recipient: "", subject: "Test" })).toBeNull();
    expect(generateMailtoUri({ recipient: "   ", subject: "Test" })).toBeNull();
  });

  it("properly percent-encodes subjects and body parameters", () => {
    const uri = generateMailtoUri({
      recipient: "inquiries@lab.example",
      subject: "[S.goto Lab Inquiry: Problem Evaluation]",
      body: "Hello! We would like to discuss an operational friction point.",
    });

    expect(uri).not.toBeNull();
    expect(uri).toContain("mailto:inquiries@lab.example?");
    expect(uri).toContain("subject=%5BS.goto%20Lab%20Inquiry%3A%20Problem%20Evaluation%5D");
    expect(uri).toContain("body=Hello!%20We%20would%20like%20to%20discuss%20an%20operational%20friction%20point.");
  });

  it("generates mailto with subject only when body is omitted", () => {
    const uri = generateMailtoUri({
      recipient: "inquiries@lab.example",
      subject: "[S.goto Lab Inquiry: Collaboration]",
    });

    expect(uri).toBe("mailto:inquiries@lab.example?subject=%5BS.goto%20Lab%20Inquiry%3A%20Collaboration%5D");
  });
});
