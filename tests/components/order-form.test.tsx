import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OrderForm } from "@/components/order-form";
import { site } from "@/lib/site";

const searchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useSearchParams: () => searchParams,
}));

afterEach(() => {
  searchParams.delete("cake");
});

function setup() {
  return userEvent.setup();
}

/** A date comfortably past the lead time, whenever the suite happens to run. */
const FUTURE_DATE = new Date(Date.now() + 200 * 86_400_000).toISOString().slice(0, 10);

async function fillValidEnquiry(user: ReturnType<typeof setup>) {
  await user.type(screen.getByLabelText("Your name"), "Nadeesha");
  await user.type(screen.getByLabelText("Email or phone"), "nadeesha@example.com");
  // A `date` input takes a value rather than keystrokes.
  fireEvent.change(screen.getByLabelText("Date needed"), { target: { value: FUTURE_DATE } });
  await user.type(screen.getByLabelText("Number of guests"), "40");
}

describe("OrderForm", () => {
  it("does not show send links until the enquiry has been reviewed", () => {
    render(<OrderForm />);
    expect(screen.queryByRole("link", { name: /send on whatsapp/i })).not.toBeInTheDocument();
  });

  it("reports every missing answer when submitted empty", async () => {
    const user = setup();
    render(<OrderForm />);

    await user.click(screen.getByRole("button", { name: /review my enquiry/i }));

    expect(screen.getByText("Please tell us your name.")).toBeInTheDocument();
    expect(screen.getByText(/we need a way to reply/i)).toBeInTheDocument();
    expect(screen.getByText("When is the cake for?")).toBeInTheDocument();
    expect(screen.getByLabelText("Your name")).toHaveAttribute("aria-invalid", "true");
  });

  it("links each error message to its field for screen readers", async () => {
    const user = setup();
    render(<OrderForm />);

    await user.click(screen.getByRole("button", { name: /review my enquiry/i }));

    const nameField = screen.getByLabelText("Your name");
    const describedBy = nameField.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent("Please tell us your name.");
  });

  it("offers WhatsApp, email and Instagram once the enquiry is complete", async () => {
    const user = setup();
    render(<OrderForm />);

    await fillValidEnquiry(user);
    await user.click(screen.getByRole("button", { name: /review my enquiry/i }));

    const whatsapp = screen.getByRole("link", { name: /send on whatsapp/i });
    expect(whatsapp).toHaveAttribute("href", expect.stringContaining(`wa.me/${site.whatsapp}`));
    expect(decodeURIComponent(whatsapp.getAttribute("href") ?? "")).toContain("Name: Nadeesha");

    expect(screen.getByRole("link", { name: /send by email/i })).toHaveAttribute(
      "href",
      expect.stringContaining(`mailto:${site.email}`),
    );
    expect(screen.getByRole("link", { name: /dm on instagram/i })).toHaveAttribute(
      "href",
      site.instagram.href,
    );
  });

  it("shows the visitor the exact message before they send it", async () => {
    const user = setup();
    render(<OrderForm />);

    await fillValidEnquiry(user);
    await user.click(screen.getByRole("button", { name: /review my enquiry/i }));

    expect(screen.getByText(/Guests: 40/)).toBeInTheDocument();
  });

  it("clears an error as soon as the visitor fixes the field", async () => {
    const user = setup();
    render(<OrderForm />);

    await user.click(screen.getByRole("button", { name: /review my enquiry/i }));
    expect(screen.getByText("Please tell us your name.")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Your name"), "Nadeesha");
    expect(screen.queryByText("Please tell us your name.")).not.toBeInTheDocument();
  });

  it("pre-fills the enquiry from the cake the visitor arrived with", () => {
    searchParams.set("cake", "ivory-cascade");
    render(<OrderForm />);

    expect(screen.getByText(/Ivory Cascade/)).toBeInTheDocument();
    expect(screen.getByLabelText(/type of cake/i)).toHaveValue("wedding");
  });

  it("ignores a cake parameter that is not in the catalogue", () => {
    searchParams.set("cake", "ghost-cake");
    render(<OrderForm />);

    expect(screen.getByLabelText(/type of cake/i)).toHaveValue("");
  });
});
