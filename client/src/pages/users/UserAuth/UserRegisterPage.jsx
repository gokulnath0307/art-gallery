import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/slices/authSlice";
import { IoEye, IoEyeOff } from "react-icons/io5";
import catchFunction from "../../../common/catchFunction";
import toast from "react-hot-toast";

export const UserRegisterPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [registerApi] = useRegisterMutation();
  useEffect(() => {
    localStorage.clear();
  }, []);
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setValues((pre) => ({ ...pre, [name]: value }));
    setErrors((pre) => ({ ...pre, [name]: "" }));
  };
  const validation = () => {
    let newErrors = {};
    if (!values.name?.trim()) newErrors.name = "Name is required";
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
          role: "user",
        };
        await registerApi(JSON).unwrap();
        toast.success("Register Successfully");
        navigate(-1);
      } catch (error) {
        catchFunction(error);
      }
    }
  };
  return (
    <div className="relative">
      {/* Background Image - Art Gallery */}
      <img
        src="https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        className="absolute inset-0 object-cover w-full h-full"
        alt="Art Gallery Background"
      />

      <div className="relative bg-gray-900 bg-opacity-75">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            {/* Left Side - Welcome Text */}
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Join Our Art Community
                <br className="hidden md:block" />
                <span className="text-teal-300">Discover & Collect Stunning Artworks</span>
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                Sign up to explore exclusive paintings from talented artists worldwide. Start your collection today!
              </p>
              <a
                href="/gallery"
                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-300 hover:text-teal-500"
              >
                Explore Gallery
                <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>

            {/* Right Side - Registration Form */}
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded-lg shadow-xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold text-gray-800 sm:text-center sm:mb-6 sm:text-2xl">Create Your Account</h3>
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="inline-block mb-1 font-medium">
                      Full Name
                    </label>
                    <input
                      placeholder="Enter Name"
                      required
                      type="text"
                      className="w-full h-12 px-4 border border-gray-300 rounded focus:border-teal-400 focus:outline-none"
                      id="name"
                      name="name"
                      value={values.name || ""}
                      onChange={handleChangeInput}
                    />
                    {errors.name ? <span className="text-sm text-red-400">{errors.name}</span> : null}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="inline-block mb-1 font-medium">
                      E-mail
                    </label>
                    <input
                      placeholder="Enter Email"
                      required
                      type="email"
                      className="w-full h-12 px-4 border border-gray-300 rounded focus:border-teal-400 focus:outline-none"
                      id="email"
                      name="email"
                      value={values.email || ""}
                      onChange={handleChangeInput}
                    />
                    {errors.email ? <span className="text-sm text-red-400">{errors.email}</span> : null}
                  </div>
                  <div className="mb-4 relative">
                    <div className="absolute right-4 top-11 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}{" "}
                    </div>
                    <label htmlFor="password" className="inline-block mb-1 font-medium">
                      Password
                    </label>
                    <input
                      placeholder="••••••••"
                      required
                      type={showPassword ? "text" : "password"}
                      className="w-full h-12 px-4 border border-gray-300 rounded focus:border-teal-400 focus:outline-none"
                      id="password"
                      name="password"
                      value={values.password || ""}
                      onChange={handleChangeInput}
                    />
                    {errors.password ? <span className="text-sm text-red-400">{errors.password}</span> : null}
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="w-full h-12 px-6 font-medium text-white transition bg-purple-500 rounded shadow-md hover:bg-purple-600 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    >
                      Create Account & Start Collecting
                    </button>
                  </div>

                  {/* Login Link */}
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Already have an account?
                    <a href="/user-login" className="text-purple-500 hover:underline">
                      {" "}
                      Log in
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
