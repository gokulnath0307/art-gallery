import React, { useState } from "react";
import { useCreateProductMutation } from "../../../../redux/slices/productSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import catchFunction from "../../../../common/catchFunction";
export default function CreateProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    size: "",
    medium: "",
    style: "",
    weight: "",
    dimensions: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [createProductApi] = useCreateProductMutation();
  const validateForm = () => {
    let newErrors = {};

    if (!product.title.trim()) newErrors.title = "Title is required.";
    if (!product.price.trim() || isNaN(product.price) || product.price <= 0) newErrors.price = "Valid price is required.";
    if (!product.size.trim()) newErrors.size = "Size is required.";
    if (!product.medium.trim()) newErrors.medium = "Medium is required.";
    if (!product.style.trim()) newErrors.style = "Style is required.";
    if (!product.weight.trim() || isNaN(product.weight) || product.weight <= 0) newErrors.weight = "Valid weight is required.";
    if (!product.dimensions.trim()) newErrors.dimensions = "Dimensions are required.";
    if (!product.description.trim()) newErrors.description = "Description is required.";
    if (!product.image) newErrors.image = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setPreview(null);
        setErrors({ ...errors, image: "Only JPG, JPEG, PNG, and WEBP images are allowed." });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setPreview(null);
        setErrors({ ...errors, image: "File size must be less than 5MB." });
        return;
      }

      // Convert image to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setErrors({ ...errors, image: "" });
        setProduct({ ...product, image: reader.result }); // Store Base64 string in state
        setPreview(reader.result); // Preview Base64 image
      };
    } else {
      setErrors({ ...errors, image: "" });
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      await createProductApi(product).unwrap();
      toast.success("Product created");
      navigate("/member/product");
    } catch (error) {
      catchFunction(error);
    }
    // Send formData to backend using fetch or axios
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={product.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}

          <input
            type="text"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}

          <input
            type="text"
            name="size"
            placeholder="Size (e.g., 36 × 36 inches)"
            value={product.size}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.size && <p className="text-red-500">{errors.size}</p>}

          <input
            type="text"
            name="medium"
            placeholder="Medium (e.g., Acrylic on Canvas)"
            value={product.medium}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.medium && <p className="text-red-500">{errors.medium}</p>}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <input
            type="text"
            name="style"
            placeholder="Style (e.g., Figurative)"
            value={product.style}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.style && <p className="text-red-500">{errors.style}</p>}

          <input
            type="text"
            name="weight"
            placeholder="Weight (e.g., 5 kg)"
            value={product.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.weight && <p className="text-red-500">{errors.weight}</p>}

          <input
            type="text"
            name="dimensions"
            placeholder="Dimensions (e.g., 92 × 92 × 16 cm)"
            value={product.dimensions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.dimensions && <p className="text-red-500">{errors.dimensions}</p>}

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
          ></textarea>
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>

        {/* Full Width Image Upload */}
        <div className="col-span-1 space-y-4">
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
          {errors.image && <p className="text-red-500">{errors.image}</p>}
        </div>
        <div className="">{preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover mt-2 rounded" />}</div>
        {/* Centered Submit Button */}
        <div className="col-span-2 flex justify-center mt-4 cursor-pointer">
          <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded cursor-pointer">
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}
