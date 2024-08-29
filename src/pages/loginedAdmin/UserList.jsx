import React, { useEffect, useState } from 'react';
import { axiosInstants } from '../../config/axiosinstents';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false); // New state for confirmation modal

  // Fetch all users from the backend
  const getAllUsers = async () => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/user/user-list",
      });
      setUsers(response.data); // Set the fetched users to the state
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete user by ID
  const deleteUser = async (userId) => {
    try {
      await axiosInstants({
        method: "DELETE",
        url: `/user/remove/${userId}`,
      });
      setUsers(users.filter((user) => user._id !== userId)); // Update the user list after deletion
      setIsConfirming(false); // Reset confirmation modal
      setSelectedUserId(null); // Reset selected user
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle user card click
  const handleUserClick = (userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId); // Toggle selected user
    setIsConfirming(false); // Reset confirmation modal on user click
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-lg shadow-2xl">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-6 text-center">User List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 cursor-pointer border border-gray-200"
              onClick={() => handleUserClick(user._id)}
            >
              {/* Profile Picture */}
              <img
                src={user.image}
                alt={`${user.name}'s profile`}
                className="w-28 h-28 rounded-full object-cover mb-4 mx-auto border-4 border-purple-500 shadow-lg"
              />
              <h3 className="text-2xl font-semibold text-gray-900 text-center">{user.name}</h3>
              <p className="text-md text-gray-600 text-center">{user.email}</p>
              {/* Display additional user details */}
              <div className="text-sm text-gray-500 mt-2">
                {user.username && <p><span className="font-medium">Username:</span> {user.username}</p>}
                {user.role && <p><span className="font-medium">Role:</span> {user.role}</p>}
                {user.phone && <p><span className="font-medium">Phone:</span> {user.phone}</p>}
                {user.address && <p><span className="font-medium">Address:</span> {user.address}</p>}
                {user.createdAt && (
                  <p>
                    <span className="font-medium">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              {/* Show delete button if this user is selected */}
              {selectedUserId === user._id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onClick of the card
                    setIsConfirming(true); // Show confirmation modal
                  }}
                  className="bg-red-500 text-white rounded-full px-6 py-2 mt-4 w-full hover:bg-red-600 transition duration-300 shadow-md transform hover:scale-105"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">No users available...</div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isConfirming && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-between">
              <button
                onClick={() => deleteUser(selectedUserId)}
                className="bg-red-600 text-white rounded-full px-4 py-2 hover:bg-red-700 transition duration-300"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsConfirming(false)} // Hide confirmation modal
                className="bg-gray-300 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
