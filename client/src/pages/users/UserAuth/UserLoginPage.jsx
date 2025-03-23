import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";
import catchFunction from "../../../common/catchFunction";
import { IoEye, IoEyeOff } from "react-icons/io5";

export const UserLoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginApi] = useLoginMutation();

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((pre) => ({ ...pre, [name]: "" }));
  };
  const validation = () => {
    let newErrors = {};
    if (!values.email?.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) newErrors.email = "Invalid email format";

    if (!values.password?.trim()) newErrors.password = "Password is required";
    else if (values.password?.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validation()) {
      try {
        const JSON = {
          ...values,
        };
        await loginApi(JSON).unwrap();
        toast.success("Login Successfully");
        navigate(-1);
      } catch (error) {
        catchFunction(error);
      }
    }
  };
  return (
    <div className="relative">
      {/* Background Image */}
      <img
        src="https://images.pexels.com/photos/2747902/pexels-photo-2747902.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        className="absolute inset-0 object-cover w-full h-full"
        alt="Art Gallery Background"
      />

      {/* Dark Overlay */}
      <div className="relative bg-opacity-50">
        <svg className="absolute inset-x-0 bottom-0 text-white" viewBox="0 0 1160 163">
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>

        <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            {/* Left Side (Text for Buyers) */}
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">Buy Unique Art, Handpicked Just for You</h2>
              <p className="max-w-xl mb-4 text-base text-gray-300 md:text-lg">
                Discover exclusive paintings and artworks from top artists. Sign in to browse and purchase your next masterpiece.
              </p>
              <a
                href="/gallery"
                className="inline-flex items-center font-semibold tracking-wider transition duration-200 text-teal-300 hover:text-teal-500"
              >
                Browse Art
                <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>

            {/* Right Side (Login Form) */}
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded-lg shadow-xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold text-gray-800 sm:text-center sm:mb-6 sm:text-2xl">Sign In to Start Collecting</h3>
                <form>
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      placeholder="Enter Email"
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={values.email || ""}
                      onChange={handleChangeInput}
                      className="w-full h-12 px-4 bg-white border border-gray-300 rounded shadow-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                    {errors.email ? <span className="text-sm text-red-400">{errors.email}</span> : null}
                  </div>
                  <div className="relative">
                    <div className="absolute right-4 top-10 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}{" "}
                    </div>
                    <label className="block text-gray-700">Password</label>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full h-12 px-4 bg-white border border-gray-300 rounded shadow-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                      placeholder="Enter password"
                      value={values.password || ""}
                      onChange={handleChangeInput}
                      required
                    />
                    {errors.password ? <span className="text-sm text-red-400">{errors.password}</span> : null}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <a href="/forgot-password" className="text-sm text-purple-500 hover:underline">
                      Forgot Password?
                    </a>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="w-full h-12 px-6 font-medium text-white transition bg-purple-500 rounded shadow-md hover:bg-purple-600 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    >
                      Sign In
                    </button>
                  </div>

                  <p className="mt-4 text-sm text-gray-600 sm:text-center">
                    New here?{" "}
                    <a href="/user-register" className="text-purple-500 hover:underline">
                      Create an account
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
