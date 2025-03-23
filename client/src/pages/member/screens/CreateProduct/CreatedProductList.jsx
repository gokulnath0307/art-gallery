import { useNavigate } from "react-router-dom";
import { getProductSliceData, useLazyGetAllUserProductQuery } from "../../../../redux/slices/productSlice";
import { useEffect } from "react";
import catchFunction from "../../../../common/catchFunction";
import { useSelector } from "react-redux";

export default function CreatedProductList() {
  const navigate = useNavigate();
  const [getAllUserProductDataApi] = useLazyGetAllUserProductQuery();
  const { userProductTableData } = useSelector(getProductSliceData);
  useEffect(() => {
    getAllUserProductData();
  }, []);
  const getAllUserProductData = async () => {
    try {
      await getAllUserProductDataApi().unwrap();
    } catch (error) {
      catchFunction(error);
    }
  };
  return (
    <div className="">
      <div className="sm:flex sm:items-center flex">
        <button
          onClick={() => {
            navigate("/member/product/create");
          }}
          type="button"
          className="block rounded-md cursor-pointer bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Product
        </button>
      </div>
      <div className="mt-8 overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                {["Title", "Price", "Size", "Dimensions",'Image'].map((heading) => (
                  <th key={heading} className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    {heading}
                  </th>
                ))}
                <th className="py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userProductTableData.map(({ title, price, size, dimensions, image }, index) => (
                <tr key={index}>
                  <td className="px-3 py-4 text-sm font-medium text-gray-900">{title}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{price}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{size}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{dimensions}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    <div className="size-28 shrink-0 flex items-center">
                      <img alt="" src={image} className="object-contain" />
                    </div>
                  </td>
                  <td className="px-3 py-4 text-right text-sm font-medium">
                    <div className="inline-flex gap-2">
                      <button className="text-blue-600 hover:underline cursor-pointer">Edit</button>
                      <button className="text-red-600 hover:underline cursor-pointer">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
