import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstants } from "../../config/axiosinstents";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, category, image } = formData;

    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("price", price);
    form.append("category", category);
    if (image) {
      form.append("image", image);
    }

    try {
      const response = await axiosInstants({
        method: "POST",
        url: "/product/create",
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
      });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-xl border border-gray-100 transition-transform hover:shadow-2xl">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-lg bg-gray-100 border border-transparent focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-lg bg-gray-100 border border-transparent focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
              rows="4"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 rounded-lg bg-gray-100 border border-transparent focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                placeholder="Set price"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600" htmlFor="category">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 rounded-lg bg-gray-100 border border-transparent focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                placeholder="Product category"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600" htmlFor="image">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
              className="w-full mt-2 p-3 bg-gray-100 rounded-lg border border-transparent focus:border-gray-400 focus:outline-none transition duration-300 cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-orange-400 text-white font-bold rounded-lg shadow-md"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
