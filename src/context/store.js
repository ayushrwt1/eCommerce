import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSilce";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});
export default store;
