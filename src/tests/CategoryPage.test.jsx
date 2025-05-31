import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryPage } from "../pages/CategoryPage/CategoryPage.jsx";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mocks = vi.hoisted(() => {
  return {
    fetchProductsByMetacategory: vi.fn()
  }
})

vi.mock("../utils/fetchProductsByMetacategory.js", () => ({
  fetchProductsByMetacategory: mocks.fetchProductsByMetacategory
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ categoryName: "vehicles" }),
  };
});

vi.mock("../../utils/categoryConfig", () => ({
  categoryConfig: {
    getDisplayName: () => "vehicles",
    getApiCategories: () => ["vehicle", "motorcycle"],
  },
}));

describe("CategoryPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading cards initially", () => {
    mocks.fetchProductsByMetacategory.mockResolvedValue([
      { id: 1, category: "vehicle", name: "Car A" },
    ]);
    render(<CategoryPage />);
    const loadingCards = screen.getAllByRole("status");
    expect(loadingCards.length).toBeGreaterThan(0);
  });

  it("displays error message on fetch failure", async () => {
    mocks.fetchProductsByMetacategory.mockRejectedValue(new Error("API error"));
    render(<CategoryPage />);
    const errorMessage = await screen.findByText(
      "Failed to load products. Please try again.",
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays subcategory tiles and products", async () => {
    mocks.fetchProductsByMetacategory.mockResolvedValue([
      { id: 1, category: "vehicle", name: "Car A" },
      { id: 2, category: "motorcycle", name: "Motorbike B" },
    ]);

    render(
      <MemoryRouter>
        <CategoryPage />
      </MemoryRouter>,
    );

    const allTile = await screen.findByRole("button", { name: "All" });
    const vehicleTile = await screen.findByRole("button", { name: "Vehicle" });
    const motorcycleTile = await screen.findByRole("button", {
      name: "Motorcycle",
    });

    expect(allTile).toBeInTheDocument();
    expect(vehicleTile).toBeInTheDocument();
    expect(motorcycleTile).toBeInTheDocument();
  });

  it("filters products when subcategory is clicked", async () => {
    mocks.fetchProductsByMetacategory.mockResolvedValue([
      { id: 1, category: "vehicle", name: "Car A" },
      { id: 2, category: "motorcycle", name: "Motorbike B" },
    ]);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CategoryPage />
      </MemoryRouter>,
    );

    await screen.findByText("Car A");

    // Initially, all products should be shown
    expect(screen.getByText("Car A")).toBeInTheDocument();
    expect(screen.getByText("Motorbike B")).toBeInTheDocument();
    expect(screen.getByText("2 products found")).toBeInTheDocument();

    // After clicking vechile, only vehicle category should be shown
    const vehicleTile = screen.getByRole("button", { name: "Vehicle" });
    await user.click(vehicleTile);
    expect(screen.getByText("Car A")).toBeInTheDocument();
    expect(screen.queryByText("Motorbike B")).toBeNull();
    expect(screen.getByText("1 product found")).toBeInTheDocument();
  });

  it("correctly displays number of products", async () => {
    mocks.fetchProductsByMetacategory.mockResolvedValue([
      { id: 1, category: "vehicle", name: "Car A" },
      { id: 2, category: "motorcycle", name: "Motorbike B" },
    ]);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CategoryPage />
      </MemoryRouter>,
    );
    const initialProductCount = await screen.findByText("2 products found");
    expect(initialProductCount).toBeInTheDocument();

    const motorcycleTile = screen.getByRole("button", { name: "Motorcycle" });
    await user.click(motorcycleTile);
    expect(screen.getByText("1 product found")).toBeInTheDocument();
  });
});
