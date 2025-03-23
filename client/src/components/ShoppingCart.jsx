import { FaChevronDown, FaCheck, FaClock, FaQuestionCircle, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartSliceData } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function ShoppingCart() {
  const taxPrice = 10;
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.usertoken;
  const { cartProduct } = useSelector(getCartSliceData);
  const handleShippingCart = () => {
    if (isLoggedIn) {
      navigate("/checkout-product");
    } else {
      toast("You should be login", { icon: "⚠️", duration: 2000 });
      setTimeout(() => {
        navigate("/user-login");
      }, 2500);
    }
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <section className="lg:col-span-7">
            <ul className="divide-y border-t border-b border-gray-200">
              {cartProduct.map((product) => (
                <li key={product._id} className="flex py-6 sm:py-10">
                  <img src={product.image} alt={product.title} className="size-24 rounded-md object-cover sm:size-48" />
                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          <a href={product.href}>{product.title}</a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.size && `| ${product.size}`}</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="relative w-full max-w-16">
                          <select className="rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 border-gray-300 focus:outline-indigo-600 sm:text-sm">
                            {[...Array(8)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                          <FaChevronDown className="absolute right-2 top-2 text-gray-500" />
                        </div>
                        <button className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-500">
                          <FaTimes className="size-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <dl className="mt-6 space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-900">&#8377; {cartProduct.reduce((acc, curr) => acc + parseFloat(curr.price), 0)}</dd>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4 text-sm text-gray-600">
                <dt className="flex items-center">
                  Tax estimate
                  <FaQuestionCircle className="ml-2 text-gray-400" />
                </dt>
                <dd className="font-medium text-gray-900">&#8377; {taxPrice}</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-medium text-gray-900">
                <dt>Order total</dt>
                <dd>&#8377; {cartProduct.reduce((acc, curr) => acc + parseFloat(curr.price), 0) + taxPrice}</dd>
              </div>
            </dl>
            <button
              onClick={handleShippingCart}
              className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Checkout
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
