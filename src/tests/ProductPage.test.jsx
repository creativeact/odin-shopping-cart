import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartContext } from "../context/CartContext.jsx";
import { ToastContext } from "../context/ToastContext";
import { useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const dummyProduct = {
  availabilityStatus: "In Stock",
  description:
    "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
  id: 16,
  title: "apple",
  price: "1.99",
  thumbnail: "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
  images: ["https://cdn.dummyjson.com/product-images/groceries/apple/1.webp"],
  rating: "4.19",
  reviews: [
    {
      rating: 5,
      comment: "Very satisfied!",
      reviewerName: "John",
      date: new Date().toISOString(),
    },
    {
      rating: 1,
      comment: "Very dissatisfied!",
      reviewerName: "Jane",
      date: new Date().toISOString(),
    },
    {
      rating: 3,
      comment: "Very unhappy with my purchase!",
      reviewerName: "Doe",
      date: new Date().toISOString(),
    },
  ],
};

vi.mock("../utils/fetchProduct.js", () => ({
  fetchProduct: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(() => ({ slugAndProductId: "apple-16" })),
  };
});

vi.mock("../../utils/useToast.js", () => ({
  useToast: () => ({
    productAdded: mockProductAdded,
  }),
}));

const mockProductAdded = vi.fn();
const mockAddToCart = vi.fn();
const mockAddToast = vi.fn();

import { fetchProduct } from "../utils/fetchProduct.js";
import { ProductPage } from "../pages/ProductPage/ProductPage.jsx";

describe("ProductPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading card initially", async () => {
    fetchProduct.mockResolvedValue(dummyProduct);
    render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <ProductPage />
      </CartContext.Provider>,
    );
    const loadingCards = screen.getAllByRole("status");
    expect(loadingCards.length).toBe(2);
  });

  it("displays error message on fetch failure", async () => {
    fetchProduct.mockRejectedValue(new Error("API error"));
    render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <ProductPage />
      </CartContext.Provider>,
    );
    const errorMessage = await screen.findByText(
      "Failed to load product. Please try again.",
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("extracts productId correctly from various slugAndProductId formats", async () => {
    const testCases = [
      { input: "apple-16", expected: "16" },
      { input: "red-delicious-apple-sauce-25", expected: "25" },
      { input: "42", expected: "42" },
      { input: "complex-product-name-with-many-hyphens-999", expected: "999" },
    ];

    for (const { input, expected } of testCases) {
      // Re-mock useParams for each test case
      vi.mocked(useParams).mockReturnValue({ slugAndProductId: input });

      fetchProduct.mockResolvedValue(dummyProduct);

      render(
        <CartContext.Provider value={{ addToCart: mockAddToCart }}>
          <ProductPage />
        </CartContext.Provider>,
      );

      expect(fetchProduct).toHaveBeenCalledWith(expected);

      // Clean up for next iteration in testCases
      vi.clearAllMocks();
    }
  });

  it("calls addToCart and shows toast when Add to Cart button is clicked", async () => {
    const mockAddToCart = vi.fn();
    fetchProduct.mockResolvedValue(dummyProduct);

    const user = userEvent.setup();

    render(
      <ToastContext.Provider value={{ addToast: mockAddToast }}>
        <CartContext.Provider value={{ addToCart: mockAddToCart }}>
          <ProductPage />
        </CartContext.Provider>
      </ToastContext.Provider>,
    );

    // Wait for product to load
    await screen.findByText(dummyProduct.title);

    const addToCartButton = screen.getByRole("button", { name: "Add to Cart" });
    await user.click(addToCartButton);
    expect(mockAddToCart).toHaveBeenCalledWith(dummyProduct, 1);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);

    expect(mockAddToast).toHaveBeenCalledWith({
      message: "apple added to cart",
      image: dummyProduct.thumbnail,
      type: "success",
    });
  });

  it("adjust product quantity when + and - buttons are clicked", async () => {
    fetchProduct.mockResolvedValue(dummyProduct);

    const user = userEvent.setup();

    render(
      <ToastContext.Provider value={{ addToast: mockAddToast }}>
        <CartContext.Provider value={{ addToCart: mockAddToCart }}>
          <ProductPage />
        </CartContext.Provider>
      </ToastContext.Provider>,
    );

    const increaseBtn = await screen.findByRole("button", { name: "+" });
    const decreaseBtn = await screen.findByRole("button", { name: "-" });
    const quantity = await screen.findByLabelText("Quantity");

    // Prevent decreasing when quantity is at 1
    await user.click(decreaseBtn);
    expect(quantity.textContent).toBe("1");

    await user.click(increaseBtn);
    expect(quantity.textContent).toBe("2");

    await user.click(decreaseBtn);
    expect(quantity.textContent).toBe("1");
  });
});
