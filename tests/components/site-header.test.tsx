import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/layout/site-header";
import { primaryNav } from "@/lib/site";

vi.mock("next/navigation", () => ({
  usePathname: () => "/cakes",
}));

describe("SiteHeader", () => {
  it("renders every primary nav link", () => {
    render(<SiteHeader />);
    for (const link of primaryNav) {
      expect(screen.getAllByRole("link", { name: link.label }).length).toBeGreaterThan(0);
    }
  });

  it("marks the current section as the active page", () => {
    render(<SiteHeader />);
    const [cakesLink] = screen.getAllByRole("link", { name: "Cakes" });
    expect(cakesLink).toHaveAttribute("aria-current", "page");
  });

  it("keeps the mobile menu closed until the toggle is pressed", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("closes the mobile menu once a link inside it is tapped", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const mobileNav = screen.getByRole("navigation", { name: "Primary mobile" });
    await user.click(within(mobileNav).getByRole("link", { name: "About" }));

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
