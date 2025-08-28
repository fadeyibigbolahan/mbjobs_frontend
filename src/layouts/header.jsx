import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronsLeft,
  SquareChevronLeft,
  IterationCw,
  Bell,
  MessageCircle,
  Send,
  X,
  ArrowLeft,
} from "lucide-react";
import PropTypes from "prop-types";
import axios from "axios";
import { url } from "../../api";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

import profileImg from "../assets/user.png";

export const Header = ({ collapsed, setCollapsed }) => {
  const [modal, setModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Chat states
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  // Load logged-in user from localStorage
  const storedUser = localStorage.getItem("authUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found.");
          return;
        }

        const response = await axios.get(`${url}notification`, {
          headers: { Authorization: token },
        });

        setNotifications(response.data);
      } catch (err) {
        setError("Failed to load notifications.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Fetch conversations when chat modal opens
  const fetchConversations = async () => {
    setChatLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await axios.get(`${url}messages/conversations`, {
        headers: { Authorization: token },
      });

      console.log("Conversations fetched:", response.data);

      setConversations(response.data);
    } catch (err) {
      console.error("Error fetching conversations:", err);
    } finally {
      setChatLoading(false);
    }
  };

  // Fetch messages for selected conversation
  const fetchMessages = async (otherUserId) => {
    setMessagesLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await axios.get(
        `${url}messages/conversation/${otherUserId}`,
        {
          headers: { Authorization: token },
        }
      );

      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setMessagesLoading(false);
    }
  };

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const otherUser = selectedConversation.participants.find(
        (p) => p._id !== user._id
      );

      const response = await axios.post(
        `${url}messages/send`,
        {
          receiverId: otherUser._id,
          content: newMessage.trim(),
        },
        {
          headers: { Authorization: token },
        }
      );

      if (response.data.success) {
        // Add message to current messages
        setMessages((prev) => [...prev, response.data.message]);
        setNewMessage("");

        // Update conversations list
        fetchConversations();
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleChatOpen = () => {
    setChatModal(true);
    setModal(false);
    setProfileModal(false);
    fetchConversations();
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    const otherUser = conversation.participants.find((p) => p._id !== user._id);
    fetchMessages(otherUser._id);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOtherUser = (conversation) => {
    return conversation.participants.find((p) => p._id !== user._id);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-10 flex h-[60px] items-center justify-between bg-[#FAFAF8] px-4 border-b dark:bg-slate-900">
        <div className="flex items-center gap-x-3">
          <button
            className="btn-ghost size-10"
            onClick={() => setCollapsed(!collapsed)}
          >
            <SquareChevronLeft className={collapsed ? "rotate-180" : ""} />
          </button>
        </div>
        <div className="flex items-center gap-x-3">
          {/* Chat Button */}
          <button
            onClick={handleChatOpen}
            className="btn-ghost relative size-10"
          >
            <MessageCircle size={20} />
          </button>

          <button
            onClick={() => {
              setModal(!modal);
              setProfileModal(false);
              setChatModal(false);
              setClicked(true);
            }}
            className="btn-ghost relative size-10"
          >
            <Bell size={20} />
            {!clicked && (
              <div className="absolute right-1 top-2 h-[8px] w-[8px] rounded-full bg-red-700"></div>
            )}
          </button>

          <div
            onClick={() => {
              setProfileModal(!profileModal);
              setModal(false);
              setChatModal(false);
            }}
            className="flex flex-row gap-2 justify-center items-center cursor-pointer"
          >
            <div className="size-10 overflow-hidden rounded-md">
              <img
                src={profileImg}
                alt="profile image"
                className="size-full object-cover"
              />
            </div>
            <div className="md:flex hidden justify-start items-start flex-col">
              <p className="text-center text-sm font-semibold">
                {user?.fullName}
              </p>
              <p className="text-center text-xs capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Modal */}
      {chatModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-20 md:items-start md:justify-end md:pr-4">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={() => setChatModal(false)}
          ></div>
          <div className="relative flex flex-col rounded-md bg-white shadow-lg h-[80vh] w-full max-w-md mx-4 md:mx-0">
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-[#014581] text-white p-4 rounded-t-md">
              <div className="flex items-center gap-2">
                {selectedConversation && (
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="hover:bg-blue-700 p-1 rounded"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}
                <h2 className="text-lg font-semibold">
                  {selectedConversation
                    ? getOtherUser(selectedConversation)?.fullName
                    : "Messages"}
                </h2>
              </div>
              <button
                onClick={() => setChatModal(false)}
                className="hover:bg-blue-700 p-1 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-hidden">
              {!selectedConversation ? (
                /* Conversations List */
                <div className="h-full overflow-y-auto">
                  {chatLoading ? (
                    <div className="flex justify-center items-center h-full">
                      <p>Loading conversations...</p>
                    </div>
                  ) : conversations.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-500">
                      <p>No conversations yet</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {conversations.map((conversation) => {
                        const otherUser = getOtherUser(conversation);
                        return (
                          <div
                            key={conversation._id}
                            onClick={() =>
                              handleConversationSelect(conversation)
                            }
                            className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                          >
                            <div className="size-10 overflow-hidden rounded-full">
                              <img
                                src={otherUser?.profileImage || profileImg}
                                alt="profile"
                                className="size-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">
                                {otherUser?.fullName}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {conversation.lastMessage?.content ||
                                  "Start a conversation"}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                /* Messages View */
                <div className="flex flex-col h-full">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messagesLoading ? (
                      <div className="flex justify-center items-center h-full">
                        <p>Loading messages...</p>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="flex justify-center items-center h-full text-gray-500">
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message._id}
                          className={`flex ${
                            message.sender._id === user._id
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender._id === user._id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.sender._id === user._id
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {formatTime(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-20 md:items-start md:justify-end md:pr-4">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={() => setModal(false)}
          ></div>
          <div className="relative flex flex-col rounded-md bg-white p-4 shadow-md h-[300px] w-full max-w-md mx-4 md:mx-0">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-gray-200 pb-2">
              <h2 className="text-md font-semibold">NOTIFICATIONS</h2>
              <button
                onClick={() => setModal(false)}
                className="btn-ghost size-8"
              >
                ✕
              </button>
            </div>

            {/* Content Wrapper with Scroll */}
            <div className="flex-1 overflow-y-auto mt-2">
              {loading ? (
                <p className="py-4 text-center">Loading notifications...</p>
              ) : error ? (
                <p className="py-4 text-center text-red-500">{error}</p>
              ) : notifications.length === 0 ? (
                <p className="py-4 text-center text-gray-500">
                  No notifications found.
                </p>
              ) : (
                <ul className="space-y-2">
                  {notifications.map((notification, index) => (
                    <li key={index} className="rounded-md border p-2 text-sm">
                      {notification.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {profileModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-20 md:items-start md:justify-end md:pr-4">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={() => setProfileModal(false)}
          ></div>
          <div className="relative flex flex-col items-center rounded-md bg-white p-4 shadow-md w-full max-w-xs mx-4 md:mx-0">
            <div className="size-10 overflow-hidden rounded-full">
              <img
                src={profileImg}
                alt="profile image"
                className="size-full object-cover"
              />
            </div>
            <h2 className="font-kanit text-center text-sm font-semibold text-[#003366 ]">
              {user?.fullName.toUpperCase()}
            </h2>
            <p className="text-xs mb-2">{user?.email}</p>
            <button
              onClick={() => {
                navigate("/dashboard/user-profile");
                setProfileModal(false);
              }}
              className="flex text-xs text-center hover:bg-white bg-slate-100 p-2 w-full border-2 border-gray-300 rounded-lg justify-center items-center gap-x-2 mb-2"
            >
              View Profile
            </button>
            <button
              onClick={() => {
                navigate("/dashboard/profile-settings");
                setProfileModal(false);
              }}
              className="flex text-xs text-center hover:bg-white bg-slate-100 p-2 w-full border-2 border-gray-300 rounded-lg justify-center items-center gap-x-2 mb-2"
            >
              Manage your account
            </button>

            <button
              onClick={() => {
                handleLogout();
                setProfileModal(false);
              }}
              className="w-full text-start text-sm my-2 font-semibold text-[#003366 ] hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};
