import { useEffect } from "react";
import { AiFillStar, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCheckCircle, BsQuestionCircle, BsShieldCheck } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyGetOneProductByIDQuery } from "../redux/slices/productSlice";
import { useDispatch } from "react-redux";
import { setCartProduct } from "../redux/slices/cartSlice";

const reviews = { average: 4, totalCount: 1624 };

export default function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { productId } = useParams();
  const [fetchProduct, { data: product, isLoading, isError }] = useLazyGetOneProductByIDQuery();

  useEffect(() => {
    if (!productId || productId === "undefined" || productId.trim() === "") {
      navigate("/gallery", { replace: true });
    } else {
      fetchProduct(productId);
    }
  }, [productId, fetchProduct, navigate]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError || !product) return <div className="text-center py-10 text-red-500">Product not found!</div>;
  const handleAddProductToCart = async () => {
    dispatch(setCartProduct({ ...product}));
    navigate("/cart-product");
  };
  return (
    <div className="bg-white max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
      {/* Product Details */}
      <div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">{product.title}</h1>

        {/* Price & Reviews */}
        <div className="mt-2 flex items-center">
          <p className="text-lg text-gray-900">&#8377; {product.price}</p>
          <div className="ml-4 flex items-center border-l border-gray-300 pl-4">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} className={`w-5 h-5 ${reviews.average > i ? "text-yellow-400" : "text-gray-300"}`} />
            ))}
            <span className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</span>
          </div>
        </div>

        <p className="mt-4 text-gray-500">{product.description}</p>

        <div className="mt-6 flex items-center">
          <BsCheckCircle className="w-5 h-5 text-green-500" />
          <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
        </div>
      </div>

      {/* Product Image */}
      <div className="flex justify-center">
        <img src={product.image} alt={product.title} className="w-full max-w-md rounded-lg object-cover" />
      </div>

      {/* Product Options */}
      <div className="lg:col-span-2">
        <h3 className="text-sm font-medium text-gray-700">Size</h3>

        <p className="text-lg text-gray-900">{product.size}</p>
        <div className="mt-4 text-sm">
          <a href="#" className="flex items-center text-gray-500 hover:text-gray-700">
            <BsQuestionCircle className="w-5 h-5 mr-2" />
            What size should I buy?
          </a>
        </div>

        <button
          className="mt-6 w-full flex items-center justify-center bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 cursor-pointer"
          onClick={handleAddProductToCart}
        >
          <AiOutlineShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </button>

        <div className="mt-4 text-center text-sm">
          <a href="#" className="flex items-center justify-center text-gray-500 hover:text-gray-700">
            <BsShieldCheck className="w-6 h-6 mr-2" />
            Lifetime Guarantee
          </a>
        </div>
      </div>
    </div>
  );
}
