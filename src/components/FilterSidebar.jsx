import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import {
  clearFilters,
  setPriceRange,
  setSelectedBrands,
  setSelectedCategories,
} from "../context/filtersSilce";

const FilterSidebar = () => {
  const [categories, setCategories] = useState([{ slug: "All", name: "All" }]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const { selectedCategories, selectedBrands, minPrice, maxPrice } =
    useSelector((state) => state.filters);
  const [draftMinPrice, setDraftMinPrice] = useState(minPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxPrice);
  const brandOptions = [
    "Apple",
    "Samsung",
    "OPPO",
    "Huawei",
    "Microsoft Surface",
    "Infinix",
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/products/categories");
        setCategories([
          { slug: "All", name: "All" },
          ...response.data.map(({ slug, name }) => ({ slug, name })),
        ]);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = (category) => {
    if (category === "All") {
      dispatch(setSelectedCategories(["All"]));
      return;
    }

    const withoutAll = selectedCategories.filter((item) => item !== "All");
    dispatch(
      setSelectedCategories(
        withoutAll.includes(category)
          ? withoutAll.filter((item) => item !== category)
          : [...withoutAll, category],
      ),
    );
  };

  const toggleBrand = (brand) => {
    dispatch(
      setSelectedBrands(
        selectedBrands.includes(brand)
          ? selectedBrands.filter((item) => item !== brand)
          : [...selectedBrands, brand],
      ),
    );
  };

  const applyPriceFilter = () => {
    dispatch(
      setPriceRange({ minPrice: draftMinPrice, maxPrice: draftMaxPrice }),
    );
  };

  const resetFilters = () => {
    setDraftMinPrice("");
    setDraftMaxPrice("");
    dispatch(clearFilters());
  };

  return (
    <aside className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          Clear all
        </button>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-lg font-semibold text-gray-800">Category</h3>
        <div className="space-y-2">
          {(showAllCategories ? categories : categories.slice(0, 6)).map(
            (category) => (
              <label
                key={category.slug}
                className="flex items-center gap-2 text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => toggleCategory(category.slug)}
                  className="h-4 w-4 accent-black"
                />
                <span className="capitalize">{category.name}</span>
              </label>
            ),
          )}
        </div>
        {categories.length > 6 && (
          <button
            type="button"
            onClick={() => setShowAllCategories((isExpanded) => !isExpanded)}
            className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {showAllCategories ? "Show less" : "More"}
          </button>
        )}
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-gray-800">
          Price Range
        </h3>
        <div>
          <div className="flex gap-4 items-center">
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={draftMinPrice}
              onChange={(event) => setDraftMinPrice(event.target.value)}
              className=" no-spinner rounded-xl border border-gray-200 bg-white px-3 py-1 shadow-sm w-28 h-9 text-sm"
            />
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={draftMaxPrice}
              onChange={(event) => setDraftMaxPrice(event.target.value)}
              className="no-spinner rounded-xl border border-gray-200 bg-white px-3 py-1 shadow-sm w-28 h-9 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={applyPriceFilter}
            className="mt-3 h-9 w-full cursor-pointer rounded-xl border border-blue-600 bg-blue-600 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-lg font-semibold text-gray-800">Brand</h3>
        <div className="space-y-2">
          {brandOptions.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="h-4 w-4 accent-black"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
