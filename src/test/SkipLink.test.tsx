import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SkipLink from "@/components/SkipLink";

describe("SkipLink", () => {
  beforeEach(() => {
    // Create a target element for the skip link
    const target = document.createElement("main");
    target.id = "content";
    // Mock scrollIntoView since jsdom doesn't support it
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);
  });

  afterEach(() => {
    // Clean up
    const target = document.getElementById("content");
    if (target) {
      document.body.removeChild(target);
    }
  });

  it("renders with default text", () => {
    render(<SkipLink targetId="content" />);
    expect(screen.getByText("Saltar al contenido")).toBeInTheDocument();
  });

  it("renders with custom text", () => {
    render(<SkipLink targetId="content" text="Ir al contenido principal" />);
    expect(screen.getByText("Ir al contenido principal")).toBeInTheDocument();
  });

  it("is not visible initially", () => {
    render(<SkipLink targetId="content" />);
    const skipLink = screen.getByText("Saltar al contenido");
    // Should have opacity-0 class initially
    expect(skipLink).toHaveClass("opacity-0");
  });

  it("becomes visible on Tab key press", () => {
    render(<SkipLink targetId="content" />);
    const skipLink = screen.getByText("Saltar al contenido");

    // Simulate Tab key press
    fireEvent.keyDown(window, { key: "Tab" });

    // Should now have opacity-100 class
    expect(skipLink).toHaveClass("opacity-100");
  });

  it("has correct href attribute", () => {
    render(<SkipLink targetId="content" />);
    const skipLink = screen.getByText("Saltar al contenido");
    expect(skipLink).toHaveAttribute("href", "#content");
  });

  it("focuses target element when clicked", () => {
    render(<SkipLink targetId="content" />);
    const skipLink = screen.getByText("Saltar al contenido");
    const target = document.getElementById("content");

    // Make target focusable
    if (target) {
      target.tabIndex = -1;
    }

    // Click the skip link
    fireEvent.click(skipLink);

    // Target should be focused
    expect(document.activeElement).toBe(target);
  });

  it("applies custom className", () => {
    render(<SkipLink targetId="content" className="custom-class" />);
    const skipLink = screen.getByText("Saltar al contenido");
    expect(skipLink).toHaveClass("custom-class");
  });
});
