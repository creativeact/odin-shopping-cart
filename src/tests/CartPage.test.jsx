import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartPage } from "../pages/CartPage/CartPage";
import { MockCartProvider } from "./MockCartProvider.jsx";
import userEvent from "@testing-library/user-event";

const sampleMultipleItems = [
  {
    availabilityStatus: "In Stock",
    description:
      "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    id: 16,
    title: "apple",
    price: 1.99,
    quantity: 2,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
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
  },
  {
    availabilityStatus: "In Stock",
    description:
      "Crisp and hydtrating cucumbers, ideal for salads, snacks, or as a refreshing side",
    id: 21,
    title: "cucumber",
    price: 1.49,
    quantity: 1,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
    images: ["https://cdn.dummyjson.com/product-images/groceries/apple/1.webp"],
    rating: "4.07",
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
  },
];

const sampleOneItem = [
  {
    availabilityStatus: "In Stock",
    description:
      "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    id: 16,
    title: "apple",
    price: 1.99,
    quantity: 1,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
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
  },
];

const sampleTwoItems = [
  {
    availabilityStatus: "In Stock",
    description:
      "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    id: 16,
    title: "apple",
    price: 1.99,
    quantity: 2,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
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
  },
];

describe("CartPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays empty cart when items are 0", () => {
    render(
      <MockCartProvider>
        <CartPage />
      </MockCartProvider>,
    );
    const emptyCartText = screen.getByText("Your cart is empty.");
    expect(emptyCartText).toBeInTheDocument();
  });

  it("displays product details when cart has items", () => {
    render(
      <MockCartProvider initialItems={sampleMultipleItems}>
        <CartPage />
      </MockCartProvider>,
    );

    expect(screen.getByText("apple")).toBeInTheDocument();
    expect(screen.getByText("3.98", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("cucumber")).toBeInTheDocument();
    expect(
      screen.getAllByText("1.49", { exact: false }).length,
    ).toBeGreaterThan(0); // Price displays twice in item total and item price
    expect(screen.getByText("Subtotal (3 Items) $5.47")).toBeInTheDocument();
  });

  it("removes item from cart after clicking delete", async () => {
    const user = userEvent.setup();

    render(
      <MockCartProvider initialItems={sampleOneItem}>
        <CartPage />
      </MockCartProvider>,
    );

    expect(screen.getByText("apple")).toBeInTheDocument();

    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    await user.click(deleteBtn);

    const emptyCartText = screen.getByText("Your cart is empty.");
    expect(emptyCartText).toBeInTheDocument();
  });

  it("removes item from cart after clicking decrease when quantity is 1", async () => {
    const user = userEvent.setup();

    render(
      <MockCartProvider initialItems={sampleOneItem}>
        <CartPage />
      </MockCartProvider>,
    );

    expect(screen.getByText("apple")).toBeInTheDocument();

    const trashBtn = screen.getByLabelText("Remove Item");
    await user.click(trashBtn);

    const emptyCartText = screen.getByText("Your cart is empty.");
    expect(emptyCartText).toBeInTheDocument();
  });

  it("increases and decreases item quantity in cart", async () => {
    const user = userEvent.setup();

    render(
      <MockCartProvider initialItems={sampleTwoItems}>
        <CartPage />
      </MockCartProvider>,
    );

    const quantity = await screen.findByLabelText("Quantity");
    expect(quantity.textContent).toBe("2");
    const increaseBtn = await screen.findByRole("button", { name: "+" });
    const decreaseBtn = await screen.findByRole("button", { name: "-" });

    await user.click(increaseBtn);
    expect(quantity.textContent).toBe("3");

    await user.click(decreaseBtn);
    expect(quantity.textContent).toBe("2");
  });
});
