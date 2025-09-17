import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchState {
  searchTerm: string;
  selectedCategory: string | null;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string | null) => void;
  clearSearchTerm: () => void;
  clearSelectedCategory: () => void;
  clearAll: () => void;
}

export const useSearchStore = create<SearchState>()(persist(
  (set) => ({
    searchTerm: "",
    selectedCategory: null,
    setSearchTerm: (term) => set({ searchTerm: term }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    clearSearchTerm: () => set({ searchTerm: "" }),
    clearSelectedCategory: () => set({ selectedCategory: null }),
    clearAll: () => set({ searchTerm: "", selectedCategory: null }),
  }),
  {
    name: "search-store",
  }
));
