import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategories: ["All"],
  selectedBrands: [],
  minPrice: "",
  maxPrice: "",
  currentPage: 1,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedCategories(state, action) {
      state.selectedCategories = action.payload;
      state.currentPage = 1;
    },
    setSelectedBrands(state, action) {
      state.selectedBrands = action.payload;
      state.currentPage = 1;
    },
    setPriceRange(state, action) {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
      state.currentPage = 1;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    clearFilters() {
      return initialState;
    },
  },
});

export const {
  setSelectedCategories,
  setSelectedBrands,
  setPriceRange,
  setCurrentPage,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
