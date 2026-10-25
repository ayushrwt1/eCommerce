import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utils/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get(`/products/${id}`);
        console.log("Fetched product:", response.data);
        if (isActive) setProduct(response.data);
      } catch (fetchError) {
        if (isActive) setError(fetchError.message || "Unable to load product.");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      isActive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading product...</div>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <Link
          to="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Back to products
        </Link>
        <p className="mt-6 text-red-600">{error || "Product not found."}</p>
      </main>
    );
  }

  const fullStars = Math.round(product.rating);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <Link
        to="/"
        className="text-sm font-medium border flex text-grey-500items-center gap-1 w-fit px-2 py-1 rounded-md border-gray-300 "
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        {"   "} Back
      </Link>
      <section className="mt-2 grid gap-8 md:grid-cols-2">
        <div className="flex aspect-square w-full self-start items-center justify-center rounded-xl border border-gray-200 bg-white p-6 ">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-96 max-w-full object-contain"
          />
        </div>
        <div className="py-2">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <div className="mt-2 flex items-center gap-4">
            <p className="mt-4 text-2xl font-bold text-gray-900">
              ${product.price}
            </p>
            <div className="flex items-center text-xs pt-4">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={
                    index < fullStars ? "text-yellow-500" : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
              ({product.rating})
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-1000">
            <b>Brand:</b> {product.brand}
          </p>
          <p className="mb-2 text-sm capitalize text-gray-1000">
            <b>Category:</b> {product.category}
          </p>

          <hr className="my-5 border-gray-200" />

          <h1 className="mt-6 text-xl">Description</h1>
          <p className="mt-2  leading-7 text-gray-700 text-sm">
            {product.description}
          </p>

          <hr className="my-5 border-gray-200" />

          <h1 className="mt-6 text-xl">
            <b>Reviews</b>
          </h1>

          {product.reviews && product.reviews.length > 0 ? (
            <ul className="mt-2 space-y-4">
              {product.reviews.map((review, index) => (
                <>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm ">
                      <b>{review.reviewerName}</b>
                    </h2>
                    <div className="flex items-center text-xs pt-1">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <span
                          key={starIndex}
                          className={
                            starIndex < Math.round(review.rating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                      ({review.rating})
                    </div>
                  </div>
                  <li key={index} className="border-b pb-4">
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </li>
                </>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-gray-700">No reviews yet.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
