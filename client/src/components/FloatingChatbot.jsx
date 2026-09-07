import React, { useState, useRef } from "react";
import axios from "axios";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { BOT_API_URL } from "../config/api";
import "./FloatingChatbot.css";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me for phone recommendations or specs." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      if (!BOT_API_URL) throw new Error("Chatbot API is not configured");
      const res = await axios.post(BOT_API_URL, { query: input });
      const data = res.data;

      let botReply = "";

      if (data.error) {
        botReply = `❌ Error: ${data.error}`;
      } else if (!data.recommendations || data.recommendations.length === 0) {
        botReply = `⚠️ No matching phones found.`;
      } else {
        botReply = `🔍 Category: ${data.category}\n\n📱 Recommended Phones:\n\n`;

        data.recommendations.forEach((phone, idx) => {
          botReply += `${idx + 1}. ${phone.name}\n📸 Camera: ${phone.camera_quality} | 🔋 Battery: ${phone.battery_life} | ⚡ Performance: ${phone.performance} | 💰 Rs. ${phone.price}\n\n`;
        });
      }

      setMessages((msgs) => [...msgs, { from: "bot", text: botReply }]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Error contacting the model API." }
      ]);
    }

    setLoading(false);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="floating-chatbot-root">
      {open ? (
        <div className="floating-chatbot-window">
          <div className="floating-chatbot-header">
            <div className="floating-chatbot-title">
              <span className="floating-chatbot-title-icon" aria-hidden="true">
                <Bot size={18} />
              </span>
              <span>Phone Finder AI</span>
            </div>
            <button
              type="button"
              className="floating-chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="floating-chatbot-messages" aria-live="polite" aria-label="Chat messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`floating-chatbot-message ${msg.from}`}
              >
                <span className="floating-chatbot-bubble">
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="floating-chatbot-input-row">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask about phones..."
              className="floating-chatbot-input"
              disabled={loading}
              aria-label="Ask Phone Finder AI"
            />
            <button
              type="button"
              className="floating-chatbot-send-btn"
              onClick={sendMessage}
              disabled={loading}
              aria-label={loading ? "Sending message" : "Send message"}
            >
              {loading ? <Loader2 size={18} className="floating-chatbot-spinner" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="floating-chatbot-btn"
          onClick={() => setOpen(true)}
          aria-label="Open chatbot"
        >
          <MessageCircle size={25} strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default FloatingChatbot;
