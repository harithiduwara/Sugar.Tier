import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CakeCard } from "@/components/cake-card";
import { cakes, formatLkr } from "@/lib/cakes";

const cake = cakes[0]!;

describe("CakeCard", () => {
  it("shows the name, category, tagline and guide price", () => {
    render(<CakeCard cake={cake} />);

    expect(screen.getByRole("heading", { name: cake.name })).toBeInTheDocument();
    expect(screen.getByText(cake.tagline)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(formatLkr(cake.priceFromLkr).replace(/\s/g, "\\s"))),
    ).toBeInTheDocument();
  });

  it("links the whole card to the cake's page exactly once", () => {
    render(<CakeCard cake={cake} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", `/cakes/${cake.slug}`);
  });

  it("labels the link with more than the cake's name for screen readers", () => {
    render(<CakeCard cake={cake} />);
    expect(
      screen.getByRole("link", { name: `${cake.name} — ${cake.tagline}` }),
    ).toBeInTheDocument();
  });

  it("renders the image with its alt text", () => {
    render(<CakeCard cake={cake} />);
    expect(screen.getByAltText(cake.image.alt)).toBeInTheDocument();
  });
});
