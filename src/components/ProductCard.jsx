import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, title, price, rating, imageUrl }) => {
  const fullStars = Math.round(rating);

  return (
    <Link
      to={`/product/${id}`}
      className="flex w-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-4 text-left no-underline transition-shadow hover:shadow-md"
    >
      <div className="flex h-44 items-center justify-center bg-transparent mix-blend-multiply pb-4">
        <img
          src={imageUrl}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="pt-2 border-t border-gray-50">
        <h3 className="text-base font-semibold text-gray-800 leading-tight mb-2">
          {title}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${price}</span>

          <div className="flex items-center gap-1">
            <div className="flex items-center text-xs">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={index < fullStars ? "text-yellow-500" : "text-gray-300"}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs font-medium text-gray-400">({rating})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
