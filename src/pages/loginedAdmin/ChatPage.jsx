import React, { useState, useEffect } from "react";
import { axiosInstants } from "../../config/axiosinstents";
import { Send } from "lucide-react"; // Importing the Send icon from Lucide Icons

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch users list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstants.get("/user/user-list");
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
          const response = await axiosInstants.get(`/chat/${selectedUser._id}`);
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
        const response = await axiosInstants.post("/chat/send", {
          userId: selectedUser._id,
          message: newMessage,
          sender: "admin",
        });

        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center py-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl mx-auto flex flex-col sm:flex-row">
        {/* User List */}
        <div className="w-full sm:w-1/3 p-6 bg-gray-100 rounded-l-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Users</h2>
          <ul className="overflow-y-auto h-72">
            {users.map((user) => (
              <li
                key={user._id}
                className={`p-3 mb-2 cursor-pointer rounded-lg transition duration-300 ease-in-out text-center ${
                  selectedUser && selectedUser._id === user._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <img src={user.image} alt={user.name} className="rounded-full h-10 w-10 inline-block mr-2" />
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Box */}
        <div className="w-full sm:w-2/3 p-6 bg-white rounded-r-lg shadow-md sm:ml-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
            {selectedUser ? `Chat with ${selectedUser.name}` : "Select a user"}
          </h2>
          {selectedUser && (
            <>
              <div className="bg-gray-100 p-4 h-80 sm:h-96 overflow-y-auto mb-4 rounded-lg shadow-inner">
                {/* Messages List */}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${msg.sender === "admin" ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg transition duration-300 ${
                        msg.sender === "admin"
                          ? "bg-blue-600 text-white"
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
                  className="flex-1 border border-gray-300 p-3 rounded-lg mb-2 sm:mb-0 sm:mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full sm:w-auto transition duration-300 hover:bg-blue-700 flex items-center justify-center"
                  onClick={sendMessage}
                >
                  <Send className="mr-2" /> Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
