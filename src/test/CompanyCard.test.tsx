import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CompanyCard from "@/components/CompanyCard";
import { Company } from "@/data/companies";

const mockCompany: Company = {
  id: "test-company",
  name: "Test Company",
  description: "A test company for testing purposes",
  logo: "TC",
  phone: "0800-123-4567",
  email: "test@test.com",
  website: "www.test.com",
  address: "Test Address 123",
  rating: 4.5,
  plansCount: 3,
  priceFrom: 50000,
  features: {
    hospitalization: true,
    emergency: true,
    medications: true,
    dental: false,
    vision: false,
    gym: false,
  },
};

describe("CompanyCard", () => {
  it("renders company name", () => {
    render(<CompanyCard company={mockCompany} />);
    expect(screen.getByText("Test Company")).toBeInTheDocument();
  });

  it("renders company description", () => {
    render(<CompanyCard company={mockCompany} />);
    expect(
      screen.getByText("A test company for testing purposes")
    ).toBeInTheDocument();
  });

  it("renders price formatted correctly", () => {
    render(<CompanyCard company={mockCompany} />);
    // Price should be formatted as ARS currency (with non-breaking space)
    expect(screen.getByText(/\$\s*50\.000/)).toBeInTheDocument();
  });

  it("renders rating stars", () => {
    render(<CompanyCard company={mockCompany} />);
    // Rating text should be displayed
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("renders correct number of filled stars based on rating", () => {
    render(<CompanyCard company={mockCompany} />);
    // Should have 4 filled stars (rating 4.5 -> 4 filled stars)
    const stars = document.querySelectorAll(".text-yellow-400");
    expect(stars.length).toBe(4);
  });

  it("has correct link with aria-label", () => {
    render(<CompanyCard company={mockCompany} />);
    const link = screen.getByRole("article");
    expect(link).toHaveAttribute("href", "/company/test-company");
    expect(link).toHaveAttribute("aria-label", "Ver planes de Test Company");
  });

  it("displays company logo", () => {
    render(<CompanyCard company={mockCompany} />);
    expect(screen.getByText("TC")).toBeInTheDocument();
  });

  it("renders 'Ver planes' link text", () => {
    render(<CompanyCard company={mockCompany} />);
    expect(screen.getByText(/Ver planes/)).toBeInTheDocument();
  });
});
