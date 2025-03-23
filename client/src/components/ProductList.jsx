import React, { useEffect } from "react";
import { getProductSliceData, useLazyGetAllProductsQuery } from "../redux/slices/productSlice";
import { useSelector } from "react-redux";
import catchFunction from "../common/catchFunction";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [getAllProductDataApi] = useLazyGetAllProductsQuery();
  const { productTableData } = useSelector(getProductSliceData);
  const navigate = useNavigate();
  useEffect(() => {
    getAllProductData();
  }, []);

  const getAllProductData = async () => {
    try {
      await getAllProductDataApi().unwrap();
    } catch (error) {
      catchFunction(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-6xl text-center font-bold tracking-tight text-gray-900">Art Gallery</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productTableData?.length > 0 ? (
            productTableData?.slice(0, 4).map((product) => (
              <div key={product._id} className="group relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={`/gallery-details/${product._id}`}>
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.style}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">&#8377; {product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg col-span-full">No products available</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/gallery")}
            className="flex justify-center rounded-md bg-blue-600 px-10 py-2 cursor-pointer text-sm font-semibold text-white shadow-xs h focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
}
