import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import catchFunction from "../common/catchFunction";
import { getCartSliceData, useLazyGetAllUserCartDataQuery } from "../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { useSaveOrderProductsMutation } from "../redux/slices/orderSlice";
import toast from "react-hot-toast";

const taxes = 10.0;

export default function Checkout() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("usertoken");
  const [getAllCartDataApi] = useLazyGetAllUserCartDataQuery();
  const { cartProduct } = useSelector(getCartSliceData);
  useEffect(() => {
    if (isLoggedIn) {
      getCartAllData();
    } else {
      navigate(-1);
    }
  }, [isLoggedIn]);
  const getCartAllData = async () => {
    try {
      await getAllCartDataApi().unwrap();
    } catch (error) {
      catchFunction(error);
    }
  };
  const subtotal = cartProduct.reduce((sum, item) => sum + item.price, 0);
  const total = (subtotal + taxes).toFixed(2);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    address: "",
    city: "",
    region: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [saveOrderProductApi] = useSaveOrderProductsMutation();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate field while typing
    validateField(name, value);
  };

  // Field validation
  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "cardNumber":
        errorMsg = /^\d{16}$/.test(value.replace(/\s/g, "")) ? "" : "Invalid card number (16 digits required)";
        break;
      case "expiryDate":
        errorMsg = /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? "" : "Invalid format (MM/YY)";
        break;
      case "cvc":
        errorMsg = /^\d{3,4}$/.test(value) ? "" : "Invalid CVC (3-4 digits required)";
        break;
      default:
        errorMsg = "";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (!formData[key]) {
        validationErrors[key] = "This field is required";
      }
    });

    if (Object.values(validationErrors).some((err) => err !== "")) {
      setErrors(validationErrors);
      return;
    }
    try {
      await saveOrderProductApi({ ...formData, products: cartProduct.map((v) => ({ product: v._id, price: v.price, quantity: 1 })) }).unwrap();
      toast.success("Your order successfully placed");
      setFormData({});
      setErrors({});
      navigate("/order-history");
    } catch (error) {
      catchFunction(error);
    }
  };
  return (
    <>
      <h2 id="payment-heading" className=" flex justify-center text-4xl font-semibold underline py-10">
        Payment and shipping details
      </h2>
      <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
        <h1 className="sr-only">Checkout</h1>

        {/* Mobile order summary */}
        <section aria-labelledby="order-heading" className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden">
          <div className="mx-auto max-w-lg">
            <div className="flex items-center justify-between">
              <h2 id="order-heading" className="text-lg font-medium text-gray-900">
                Your Order
              </h2>
              <button className="group font-medium text-indigo-600 hover:text-indigo-500">
                <span className="group-not-data-open:hidden">Hide full summary</span>
                <span className="group-data-open:hidden">Show full summary</span>
              </button>
            </div>

            <div>
              <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
                {cartProduct.map((product) => (
                  <li key={product.id} className="flex space-x-6 py-6">
                    <img alt={product.title} src={product.image} className="size-40 flex-none rounded-md bg-gray-200 object-cover" />
                    <div className="flex flex-col justify-between space-y-4">
                      <div className="space-y-1 text-sm font-medium">
                        <h3 className="text-gray-900">{product.title}</h3>
                        <p className="text-gray-900">{product.price}</p>
                      </div>
                      <div className="flex space-x-4">
                        <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          Edit
                        </button>
                        <div className="flex border-l border-gray-300 pl-4">
                          <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">{subtotal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-gray-900">{taxes}</dd>
                </div>
              </dl>
            </div>

            <p className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
              <span className="text-base">Total</span>
              <span className="text-base">{total}</span>
            </p>
          </div>
        </section>

        {/* Order summary */}
        <section aria-labelledby="summary-heading" className="hidden w-full max-w-3xl flex-col bg-gray-50 lg:flex mx-auto">
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <ul role="list" className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6">
            {cartProduct.map((product) => (
              <li key={product.id} className="flex space-x-6 py-6">
                <img alt={product.title} src={product.image} className="size-40 flex-none rounded-md bg-gray-200 object-cover" />
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-1 text-sm font-medium">
                    <h3 className="text-gray-900">{product.title}</h3>
                    <p className="text-gray-900">{product.price}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Edit
                    </button>
                    <div className="flex border-l border-gray-300 pl-4">
                      <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
            <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">{subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-gray-900">{taxes}</dd>
              </div>
            </dl>
            <p className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
              <span className="text-base">Total</span>
              <span className="text-base">{total}</span>
            </p>
          </div>
        </section>

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
        >
          <div className="mx-auto max-w-2xl">
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                {/* Card Name */}
                <div className="col-span-full">
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                    Name on card
                  </label>
                  <input
                    id="cardName"
                    name="cardName"
                    type="text"
                    value={formData.cardName}
                    onChange={handleChange}
                    className="block w-full rounded-md px-3 py-2 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600"
                  />
                  {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}
                </div>

                {/* Card Number */}
                <div className="col-span-full">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                    Card number
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    maxLength="16"
                    inputMode="numeric"
                    className="block w-full rounded-md px-3 py-2 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600"
                  />
                  {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                </div>

                {/* Expiration Date */}
                <div className="col-span-6 ">
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                    Expiration date (MM/YY)
                  </label>
                  <input
                    id="expiryDate"
                    name="expiryDate"
                    type="text"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    maxLength="5"
                    placeholder="MM/YY"
                    className="block w-full rounded-md px-3 py-2 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600"
                  />
                  {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                </div>

                {/* CVC */}
                <div className="col-span-6 ">
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    name="cvc"
                    type="text"
                    value={formData.cvc}
                    onChange={handleChange}
                    maxLength="4"
                    inputMode="numeric"
                    className="block w-full rounded-md px-3 py-2 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600"
                  />
                  {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
                </div>

                {/* Address */}
                <div className="col-span-full">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full rounded-md px-3 py-2 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600"
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                {/* City */}
                <div className="col-span-full ">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    className="block w-full rounded-md px-3 py-2 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600"
                  />
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>
                {/* region */}
                <div className="col-span-6 ">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    Region
                  </label>
                  <input
                    id="region"
                    name="region"
                    type="text"
                    value={formData.region}
                    onChange={handleChange}
                    className="block w-full rounded-md px-3 py-2 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600"
                  />
                  {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
                </div>
                {/* pincode*/}
                <div className="col-span-6 ">
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="block w-full rounded-md px-3 py-2 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600"
                  />
                  {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Pay {total}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
