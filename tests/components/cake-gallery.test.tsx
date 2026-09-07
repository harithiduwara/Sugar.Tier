import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CakeGallery } from "@/components/sections/cake-gallery";
import { cakes, categoryLabels, getCakesByCategory } from "@/lib/cakes";

const searchParams = new URLSearchParams();
const replace = vi.fn();

vi.mock("next/navigation", () => ({
  useSearchParams: () => searchParams,
  useRouter: () => ({ replace }),
}));

afterEach(() => {
  searchParams.delete("category");
  replace.mockClear();
});

describe("CakeGallery", () => {
  it("shows the whole catalogue when no filter is applied", async () => {
    render(<CakeGallery />);
    expect(await screen.findByText(`Showing all ${cakes.length} cakes.`)).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(cakes.length);
  });

  it("shows only the requested category when the URL carries one", async () => {
    searchParams.set("category", "wedding");
    render(<CakeGallery />);

    const wedding = getCakesByCategory("wedding");
    expect(await screen.findByRole("button", { name: categoryLabels.wedding })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getAllByRole("article")).toHaveLength(wedding.length);
  });

  it("falls back to the full catalogue for an unknown category", async () => {
    searchParams.set("category", "cupcakes");
    render(<CakeGallery />);
    expect(await screen.findByText(`Showing all ${cakes.length} cakes.`)).toBeInTheDocument();
  });

  it("writes the chosen filter to the URL so the view can be shared", async () => {
    const user = userEvent.setup();
    render(<CakeGallery />);

    await user.click(await screen.findByRole("button", { name: categoryLabels.bento }));
    expect(replace).toHaveBeenCalledWith("/cakes?category=bento", { scroll: false });
  });

  it("clears the filter from the URL when Everything is chosen", async () => {
    searchParams.set("category", "bento");
    render(<CakeGallery />);

    const user = userEvent.setup();
    await user.click(await screen.findByRole("button", { name: "Everything" }));
    expect(replace).toHaveBeenCalledWith("/cakes", { scroll: false });
  });
});
