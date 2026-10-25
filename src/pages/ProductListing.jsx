import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../context/filtersSilce";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import api from "../utils/api";

const ProductListing = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedCategories, selectedBrands, minPrice, maxPrice, currentPage } =
    useSelector((state) => state.filters);

  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 8;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const skip = (currentPage - 1) * pageSize;
  const firstVisiblePage = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - 4),
  );
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => firstVisiblePage + index,
  );

  useEffect(() => {
    let isActive = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        if (selectedCategories.length === 0) {
          setProducts([]);
          setTotalProducts(0);
          return;
        }

        if (isActive) {
          if (selectedCategories.includes("All")) {
            const response = await api.get(
              `/products?limit=${pageSize}&skip=${skip}`,
            );
            setProducts(response.data.products);
            setTotalProducts(response.data.total);
          } else {
            const categoryCounts = await Promise.all(
              selectedCategories.map(async (category) => {
                const response = await api.get(
                  `/products/category/${category}?limit=${pageSize}&skip=${skip}`,
                );
                return { category, total: response.data.total };
              }),
            );
            const total = categoryCounts.reduce(
              (sum, category) => sum + category.total,
              0,
            );
            const pageEnd = Math.min(skip + pageSize, total);
            let categoryStart = 0;
            const pageRequests = [];

            for (const { category, total: categoryTotal } of categoryCounts) {
              const overlapStart = Math.max(skip, categoryStart);
              const overlapEnd = Math.min(
                pageEnd,
                categoryStart + categoryTotal,
              );

              if (overlapStart < overlapEnd) {
                pageRequests.push(
                  api.get(
                    `/products/category/${encodeURIComponent(category)}?limit=${overlapEnd - overlapStart}&skip=${overlapStart - categoryStart}`,
                  ),
                );
              }
              categoryStart += categoryTotal;
            }

            const responses = await Promise.all(pageRequests);
            setProducts(
              responses.flatMap((response) => response.data.products),
            );
            setTotalProducts(total);
          }
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
    return () => {
      isActive = false;
    };
  }, [selectedCategories, currentPage, skip]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategories.includes("All") ||
        selectedCategories.includes(product.category);
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);
      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      return (
        matchesCategory && matchesBrand && matchesMinPrice && matchesMaxPrice
      );
    });
  }, [products, selectedCategories, selectedBrands, minPrice, maxPrice]);

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500 font-medium">
        Loading items...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Error: {error}
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <FilterSidebar maxPrice={maxPrice} minPrice={minPrice} />

        <div>
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Product Catalog
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                rating={product.rating}
                imageUrl={product.thumbnail}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
              No products match your selected filters.
            </div>
          )}
        </div>
      </div>
      {totalPages > 1 && (
        <nav aria-label="Product pages" className="mt-8 flex justify-center">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>
            {visiblePages.map((page) => (
              <button
                key={page}
                type="button"
                aria-current={currentPage === page ? "page" : undefined}
                onClick={() => dispatch(setCurrentPage(page))}
                className={`h-9 min-w-9 rounded-md border px-3 text-sm shadow-sm transition ${
                  currentPage === page
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default ProductListing;
