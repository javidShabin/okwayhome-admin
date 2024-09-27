import React, { useState, useEffect } from "react";
import { axiosInstants } from "../../config/axiosinstents";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch users list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstants({
          method: "GET",
          url: `/user/user-list`, // Adjust the API URL to get all users
        });
        console.log(response);
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch chat history when a user is selected
  useEffect(() => {
    if (selectedUser) {
      const fetchChatHistory = async () => {
        try {
          const response = await axiosInstants({
            method: "GET",
            url: `/chat/${selectedUser._id}`, // API to get chat history by user
          });
          setMessages(response.data);
        } catch (error) {
          console.error("Failed to load chat history", error);
        }
      };

      fetchChatHistory();
      const intervalId = setInterval(fetchChatHistory, 1000);
      return () => clearInterval(intervalId);
    }
  }, [selectedUser]);

  // Handle sending a new message
  const sendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      try {
        const response = await axiosInstants({
          method: "POST",
          url: "/chat/send",
          data: {
            userId: selectedUser._id, // The ID of the selected user
            message: newMessage,
            sender: "admin", // Adjust based on role (admin in this case)
          },
        });

        setMessages([...messages, response.data]);
        setNewMessage(""); // Clear the input field
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-6xl mx-auto mt-4 flex flex-col sm:flex-row">
      {/* User List */}
      <div className="w-full sm:w-1/3 p-4 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Users</h2>
        <ul className="overflow-y-scroll h-64">
          {users.map((user) => (
            <li
              key={user._id}
              className={`p-2 mb-2 cursor-pointer rounded-lg ${
                selectedUser && selectedUser._id === user._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name} {/* Assuming users have a `name` field */}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Box */}
      <div className="w-full sm:w-2/3 p-4 bg-white rounded-lg shadow-md sm:ml-4">
        <h2 className="text-lg font-bold mb-4">
          {selectedUser ? `Chat with ${selectedUser.name}` : "Select a user"}
        </h2>
        {selectedUser && (
          <>
            <div className="bg-gray-100 p-4 h-64 sm:h-80 overflow-y-scroll mb-4 rounded-lg">
              {/* Messages List */}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.sender === "admin" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      msg.sender === "admin"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <span className="font-semibold">{msg.sender}: </span>
                    <span>{msg.message}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input and Send Message */}
            <div className="flex flex-col sm:flex-row">
              <input
                type="text"
                className="flex-1 border border-gray-300 p-2 rounded-lg mb-2 sm:mb-0 sm:mr-2"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
