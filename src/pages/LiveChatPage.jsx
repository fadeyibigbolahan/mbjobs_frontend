import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  X,
  Minimize2,
  Maximize2,
  User,
  Clock,
  CheckCheck,
  AlertCircle,
  Briefcase,
  Bot,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { useNavigate } from "react-router-dom";

export default function LiveChatPage() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "system",
      text: "Welcome to VirtualKonektion Support! How can we help you today?",
      timestamp: new Date(Date.now() - 300000),
      sender: "system",
    },
    {
      id: 2,
      type: "agent",
      text: "Hi there! I'm Sarah from the VirtualKonektion support team. I'm here to help you with any questions about our platform.",
      timestamp: new Date(Date.now() - 240000),
      sender: "Sarah Martinez",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b332db5c?w=100&h=100&fit=crop&crop=face",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatStatus, setChatStatus] = useState("online"); // online, away, offline
  const [isMinimized, setIsMinimized] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [chatRating, setChatRating] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickReplies = [
    "How do I create a profile?",
    "I need help with job applications",
    "Billing question",
    "Technical issue",
    "Account settings",
  ];

  const emojis = ["😊", "👍", "❤️", "😊", "🙏", "👋", "🎉", "💼"];

  const agentInfo = {
    name: "Sarah Martinez",
    title: "Senior Support Specialist",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b332db5c?w=100&h=100&fit=crop&crop=face",
    status: "online",
    responseTime: "Usually responds in a few minutes",
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        type: "user",
        text: newMessage,
        timestamp: new Date(),
        sender: "You",
      };

      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");
      setShowQuickReplies(false);

      // Simulate agent typing
      setIsTyping(true);
      setTimeout(() => {
        simulateAgentResponse(newMessage);
        setIsTyping(false);
      }, 1500 + Math.random() * 2000);
    }
  };

  const simulateAgentResponse = (userMessage) => {
    const responses = {
      profile:
        'To create a profile, click "Sign Up" and choose your account type. Fill in your basic information and we\'ll guide you through the profile setup process.',
      application:
        'For job applications, make sure your profile is complete and tailored to the position. You can track all your applications in the "My Applications" section.',
      billing:
        "I can help with billing questions! Are you looking to upgrade your plan, need help with payment, or have questions about charges?",
      technical:
        "I'm here to help with technical issues. Can you describe what problem you're experiencing? Screenshots are always helpful too.",
      account:
        'You can manage your account settings by clicking your profile picture and selecting "Settings". What specifically would you like to change?',
      default:
        "Thanks for reaching out! I understand you need assistance. Could you provide a bit more detail about your specific question so I can help you better?",
    };

    let responseKey = "default";
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("profile") || lowerMessage.includes("create"))
      responseKey = "profile";
    else if (
      lowerMessage.includes("job") ||
      lowerMessage.includes("application")
    )
      responseKey = "application";
    else if (
      lowerMessage.includes("billing") ||
      lowerMessage.includes("payment")
    )
      responseKey = "billing";
    else if (
      lowerMessage.includes("technical") ||
      lowerMessage.includes("issue") ||
      lowerMessage.includes("problem")
    )
      responseKey = "technical";
    else if (
      lowerMessage.includes("account") ||
      lowerMessage.includes("settings")
    )
      responseKey = "account";

    const agentMessage = {
      id: Date.now(),
      type: "agent",
      text: responses[responseKey],
      timestamp: new Date(),
      sender: agentInfo.name,
      avatar: agentInfo.avatar,
    };

    setMessages((prev) => [...prev, agentMessage]);
  };

  const handleQuickReply = (reply) => {
    setNewMessage(reply);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleEndChat = () => {
    setShowRatingModal(true);
  };

  const submitRating = (rating) => {
    setChatRating(rating);
    setShowRatingModal(false);
    // In a real app, this would send the rating to your backend
    navigate(-1); // Go back to the previous page
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-[#014682] to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <User className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-50 bg-[#FFFFFF]">
        <Navbar />
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#014682] to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={agentInfo.avatar}
                  alt={agentInfo.name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold">{agentInfo.name}</h3>
                <p className="text-xs text-blue-100">{agentInfo.title}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleEndChat}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Agent Info Banner */}
          <div className="bg-blue-50 border-b border-blue-100 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {agentInfo.responseTime}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Response time: ~2 min</span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                    message.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  {message.type !== "user" && message.type !== "system" && (
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-8 h-8 rounded-full"
                    />
                  )}

                  <div
                    className={`group relative ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-[#014682] to-purple-600 text-white"
                        : message.type === "system"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-white border"
                    } rounded-lg px-4 py-2 shadow-sm`}
                  >
                    {message.type === "system" && (
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">System</span>
                      </div>
                    )}

                    <p className="text-sm leading-relaxed">{message.text}</p>

                    <div
                      className={`flex items-center justify-between mt-1 text-xs ${
                        message.type === "user"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      <span>{formatTime(message.timestamp)}</span>
                      {message.type === "user" && (
                        <CheckCheck className="w-3 h-3 ml-2" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
                  <img
                    src={agentInfo.avatar}
                    alt={agentInfo.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="bg-white border rounded-lg px-4 py-2 shadow-sm">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        Sarah is typing...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {showQuickReplies && (
            <div className="border-t border-gray-200 p-3 bg-white">
              <p className="text-xs text-gray-600 mb-2">Quick replies:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>

              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
              >
                <Smile className="w-5 h-5" />
                {showEmojiPicker && (
                  <div className="absolute bottom-12 right-0 bg-white border rounded-lg shadow-lg p-2 grid grid-cols-4 gap-1">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setNewMessage((prev) => prev + emoji);
                          setShowEmojiPicker(false);
                        }}
                        className="p-1 hover:bg-gray-100 rounded text-lg"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </button>

              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-[#014682] to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Sarah is online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#014682] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Rate Your Experience
                </h3>
                <p className="text-gray-600 mb-6">
                  How was your chat with Sarah?
                </p>

                <div className="flex justify-center space-x-4 mb-6">
                  <button
                    onClick={() => submitRating("positive")}
                    className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
                  >
                    <ThumbsUp className="w-8 h-8 text-green-500 mb-2" />
                    <span className="text-sm font-medium">Good</span>
                  </button>
                  <button
                    onClick={() => submitRating("negative")}
                    className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all"
                  >
                    <ThumbsDown className="w-8 h-8 text-red-500 mb-2" />
                    <span className="text-sm font-medium">Poor</span>
                  </button>
                </div>

                <button
                  onClick={() => [setShowRatingModal(false), navigate(-1)]}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Skip for now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
