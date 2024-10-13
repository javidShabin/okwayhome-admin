import React, { useEffect, useState } from "react";
import { axiosInstants } from "../../config/axiosinstents";
import { useDispatch } from "react-redux";
import { productCount } from "../../redux/features/countSlice";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const dispatch = useDispatch()

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axiosInstants({
          method: "GET",
          url: "/product/list",
        });
        // Assuming your API response structure has a products array
        setProducts(response.data || []); // Ensure it's always an array
        dispatch(productCount({ length: response.data.length, products: response.data }));
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later."); // Set error message
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Display error message
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-600">
        Product List
      </h1>
      <p className="text-lg text-center mb-6">
        Total Products: <span className="font-bold">{products.length}</span>
      </p>{" "}
      {/* Total product count */}
      {/* Add Product Button */}
      <div className="text-center mb-6">
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                <p className="text-lg font-bold mt-4 text-gray-800">
                  ${product.price.toFixed(2)}
                </p>
                <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-xl">No products available.</div> // Message if no products found
        )}
      </div>
    </div>
  );
};

export default ProductList;
