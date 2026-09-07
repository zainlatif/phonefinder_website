import React, { useState, useRef } from "react";
import axios from "axios";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { BOT_API_URL } from "../config/api";

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
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      {open ? (
        <div className="flex h-[min(34rem,calc(100vh-7rem))] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-orange-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white/15" aria-hidden="true">
                <Bot size={18} />
              </span>
              <span>Phone Finder AI</span>
            </div>
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite" aria-label="Chat messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <span className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-5 ${msg.from === "user" ? "rounded-br-md bg-orange-600 text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-700"}`}>
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask about phones..."
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              disabled={loading}
              aria-label="Ask Phone Finder AI"
            />
            <button
              type="button"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={sendMessage}
              disabled={loading}
              aria-label={loading ? "Sending message" : "Send message"}
            >
              {loading ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="inline-flex size-14 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
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
