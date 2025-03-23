import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getProductSliceData, useLazyGetAllProductsQuery } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const sortOptions = [
  { name: "Most Popular", value: "popular" },
  { name: "Highest Rated", value: "rated" },
  { name: "Newest Arrivals", value: "new" },
  { name: "Price: Low to High", value: "low-high" },
  { name: "Price: High to Low", value: "high-low" },
];

const categories = [
  { name: "Abstract", value: "abstract" },
  { name: "Modern", value: "modern" },
  { name: "Classical", value: "classical" },
  { name: "Landscape", value: "landscape" },
  { name: "Portraits", value: "portraits" },
];

const filters = [
  {
    id: "medium",
    name: "Medium",
    options: [
      { value: "oil", label: "Oil Painting" },
      { value: "watercolor", label: "Watercolor" },
      { value: "acrylic", label: "Acrylic" },
      { value: "digital", label: "Digital Art" },
    ],
  },
  {
    id: "style",
    name: "Style",
    options: [
      { value: "abstract", label: "Abstract" },
      { value: "realism", label: "Realism" },
      { value: "impressionism", label: "Impressionism" },
      { value: "minimalism", label: "Minimalism" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" },
    ],
  },
];

export default function ArtGallery() {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showSortOption, setShowSortOption] = useState(false);
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

  const handleSortChange = (value) => {
    setSelectedSort(value);
  };

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category]?.includes(value)) {
        newFilters[category] = newFilters[category].filter((v) => v !== value);
      } else {
        newFilters[category] = [...(newFilters[category] || []), value];
      }
      return newFilters;
    });
  };

  const handleViewOneProduct = async (data) => {
    navigate(`/gallery-details/${data._id}`);
  };

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-4 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900"> Gallery List</h1>

          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <button
                className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setShowSortOption(!showSortOption)}
              >
                Sort
                <FaChevronDown className="ml-1 text-gray-400 group-hover:text-gray-500" />
              </button>
              {showSortOption ? (
                <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedSort === option.value ? "font-medium text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <form className="hidden lg:block">
              <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                {categories.map((category) => (
                  <li key={category.value}>
                    <button onClick={() => handleFilterChange("category", category.value)}>{category.name}</button>
                  </li>
                ))}
              </ul>
              {filters.map((section) => (
                <div key={section.id} className="border-b border-gray-200 py-6">
                  <h3 className="text-sm font-medium text-gray-900">{section.name}</h3>
                  <div className="space-y-4 pt-4">
                    {section.options.map((option) => (
                      <div key={option.value} className="flex gap-3">
                        <input type="checkbox" onChange={() => handleFilterChange(section.id, option.value)} />
                        <label className="text-sm text-gray-600">{option.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </form>

            <div className="lg:col-span-3">
              {/* product data */}
              <div className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-1">
                  <h2 id="products-heading" className="sr-only">
                    Products
                  </h2>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {productTableData.map((product) => (
                      <div key={product._id} className="group cursor-pointer" onClick={() => handleViewOneProduct(product)}>
                        <img
                          alt={product.title}
                          src={product.image}
                          className="aspect-square w-full overflow-hidden rounded-lg object-cover group-hover:opacity-75 sm:aspect-2/3"
                        />
                        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                          <h3>{product.title}</h3>
                          <p>&#8377; {product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 italic">{product.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
