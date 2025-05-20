import { describe, it, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import { CategoryPage } from '../pages/CategoryPage/CategoryPage.jsx';
import userEvent from "@testing-library/user-event";

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ categoryName: 'groceries' }),
  };
});

vi.mock('../../utils/fetchProductsByMetacategory', () => ({
  fetchProductsByMetacategory: vi.fn(() => new Promise(() => {})), // never resolves
}));

vi.mock('../../utils/categoryConfig', () => ({
  categoryConfig: {
    getDisplayName: () => 'groceries',
    getApiCategories: () => ['groceries'],
  },
}));

describe('Loading state', () => {
    it('display loading cards', () => {
        render(<CategoryPage />)
        const loadingCards = screen.getAllByRole('status');
        expect(loadingCards.length).toBeGreaterThan(0);
    });
});