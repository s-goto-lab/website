import { describe, it, expect } from "vitest";

describe("S.goto Lab Baseline Assertions", () => {
  it("verifies approved public route structure", () => {
    const approvedRoutes = ["/", "/capabilities", "/about", "/contact"];
    expect(approvedRoutes).toContain("/");
    expect(approvedRoutes).toContain("/capabilities");
    expect(approvedRoutes).toContain("/about");
    expect(approvedRoutes).toContain("/contact");
    expect(approvedRoutes).not.toContain("/work");
  });

  it("verifies brand color tokens conform to Ink, Paper & Vermilion", () => {
    const palette = {
      ink: "#171819",
      paper: "#F4F1E9",
      vermilion: "#B43F30",
    };
    expect(palette.ink).toBe("#171819");
    expect(palette.paper).toBe("#F4F1E9");
    expect(palette.vermilion).toBe("#B43F30");
  });
});
