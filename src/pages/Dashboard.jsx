import React from "react";
import Header from "../components/Header";
import ChatPage from "./loginedAdmin/ChatPage";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { isProductCount } = useSelector((state) => state.product);
  const { userCount } = useSelector((state) => state.product);
  // Sample reviews data
  const reviews = [
    {
      id: 1,
      user: "Alice Johnson",
      rating: 5,
      comment: "Great product quality and excellent customer service!",
    },
    {
      id: 2,
      user: "Michael Smith",
      rating: 4,
      comment: "The sofa is comfortable, but delivery was a bit slow.",
    },
    {
      id: 3,
      user: "Sophia Williams",
      rating: 5,
      comment: "Absolutely love my new dining table! Highly recommend.",
    },
    {
      id: 4,
      user: "John Doe",
      rating: 3,
      comment: "Good value for the price, but color options are limited.",
    },
  ];

  // Sample messages data
  const messages = [
    {
      id: 1,
      user: "Alice Johnson",
      email: "alice@example.com",
      content: "I would like to inquire about a custom sofa design.",
      status: "New",
    },
    {
      id: 2,
      user: "Robert Martin",
      email: "robert@example.com",
      content: "Do you offer free delivery for bulk orders?",
      status: "Urgent",
    },
    {
      id: 3,
      user: "Sophia Williams",
      email: "sophia@example.com",
      content: "Can you provide more details about the wooden table?",
      status: "Read",
    },
  ];

  return (
    <div>
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <Header />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Products */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl rounded-lg p-6 text-white">
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-4xl font-bold mt-2">{isProductCount}</p>
          </div>

          {/* Total Orders */}
          <div className="bg-gradient-to-r from-green-500 to-teal-600 shadow-xl rounded-lg p-6 text-white">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-4xl font-bold mt-2">320</p>
          </div>

          {/* Total Users */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 shadow-xl rounded-lg p-6 text-white">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-4xl font-bold mt-2">{userCount}</p>
          </div>

          {/* Total Sales */}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 shadow-xl rounded-lg p-6 text-white">
            <h2 className="text-lg font-semibold">Total Sales</h2>
            <p className="text-4xl font-bold mt-2">$45,000</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow-xl rounded-lg p-6 mt-8">
          <h2 className="text-gray-800 text-xl font-bold mb-6">
            Recent Orders
          </h2>
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  Order ID
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  Customer
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b">
                <td className="px-4 py-3">#001</td>
                <td className="px-4 py-3">John Doe</td>
                <td className="px-4 py-3">$120</td>
                <td className="px-4 py-3">
                  <span className="text-sm text-green-700 bg-green-200 px-3 py-1 rounded-full">
                    Delivered
                  </span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3">#002</td>
                <td className="px-4 py-3">Jane Smith</td>
                <td className="px-4 py-3">$250</td>
                <td className="px-4 py-3">
                  <span className="text-sm text-yellow-700 bg-yellow-200 px-3 py-1 rounded-full">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">#003</td>
                <td className="px-4 py-3">Michael Brown</td>
                <td className="px-4 py-3">$90</td>
                <td className="px-4 py-3">
                  <span className="text-sm text-red-700 bg-red-200 px-3 py-1 rounded-full">
                    Cancelled
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Message Management Section */}
        <ChatPage />
        {/* <div className="bg-white shadow-xl rounded-lg p-6 mt-8">
          <h2 className="text-gray-800 text-xl font-bold mb-6">Messages</h2>

          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">User</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Email</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Message</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Status</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {messages.map((message) => (
                <tr key={message.id} className="border-b">
                  <td className="px-4 py-3">{message.user}</td>
                  <td className="px-4 py-3">{message.email}</td>
                  <td className="px-4 py-3">{message.content}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${message.status === 'New' ? 'text-blue-700 bg-blue-200' : message.status === 'Urgent' ? 'text-red-700 bg-red-200' : 'text-gray-700 bg-gray-200'} px-3 py-1 rounded-full`}>
                      {message.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        {/* Review Management Section */}
        <div className="bg-white shadow-xl rounded-lg p-6 mt-8">
          <h2 className="text-gray-800 text-xl font-bold mb-6">User Reviews</h2>

          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  User
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  Rating
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  Comment
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reviews.map((review) => (
                <tr key={review.id} className="border-b">
                  <td className="px-4 py-3">{review.user}</td>
                  <td className="px-4 py-3">{review.rating} ★</td>
                  <td className="px-4 py-3">{review.comment}</td>
                  <td className="px-4 py-3">
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
