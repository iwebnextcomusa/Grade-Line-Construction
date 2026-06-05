/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Phone, User, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { ChatMessage } from "../types";

const SUGGESTED_PROMPTS = [
  "Request a Free Estimate",
  "Are you licensed and insured?",
  "What is finish grading?",
  "Tell me about utility trenching"
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hello! I'm Grade Line's AI Assistant. Ask me anything about our excavation, grading, clearing, and trenching services here in Utah. How can I help with your project today?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Map state history to server format: { role: 'user' | 'model', text: string }
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      // Call secure Express backend endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      if (!response.ok) {
        throw new Error("Server returned non-ok status");
      }

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: `msg-${Date.now()}-model`,
        role: "model",
        text: data.text,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to query secure chatbot API:", error);
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        role: "model",
        text: "I'm having a brief connection delay. Please feel free to call Claude directly in Grantsville at 801-903-8689 for immediate assistance!",
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputText);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* 1. Expandable Floating Chat Window */}
      {isOpen && (
        <div 
          id="chat-window"
          className="w-[92vw] sm:w-[380px] h-[450px] sm:h-[480px] max-h-[calc(100vh-180px)] bg-neutral-900 border border-neutral-850 rounded-[2px] shadow-2xl flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-5 duration-300 z-50 mr-0 sm:mr-2"
        >
          {/* Header */}
          <div className="bg-[#222222] border-b border-neutral-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#E67E22] rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-semibold text-sm text-white tracking-wide">Grade Line Assistant</h5>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                  <p className="text-[10px] text-green-400 font-mono tracking-wider">Online • Secure</p>
                </div>
              </div>
            </div>

            <button
              id="close-chat-btn"
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-neutral-800 rounded-full text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Click Lead Callout Banner */}
          <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#E67E22]" />
              Need quick support?
            </span>
            <a 
              href="tel:801-903-8689" 
              className="text-[#E67E22] hover:underline font-semibold font-mono"
            >
              801-903-8689
            </a>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-900/60 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role !== "user" && (
                  <div className="w-7 h-7 bg-neutral-800 rounded-full flex items-center justify-center text-[#E67E22] border border-neutral-700 flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#E67E22] text-white rounded-tr-none"
                      : msg.isError
                      ? "bg-red-950/40 text-red-200 border border-red-900/40 rounded-tl-none"
                      : "bg-neutral-800 text-neutral-100 rounded-tl-none border border-neutral-700/50"
                  }`}
                >
                  <p className="whitespace-pre-line font-sans">{msg.text}</p>
                </div>

                {msg.role === "user" && (
                  <div className="w-7 h-7 bg-[#E67E22]/20 rounded-full flex items-center justify-center text-[#E67E22] flex-shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 bg-neutral-800 rounded-full flex items-center justify-center text-[#E67E22] border border-neutral-700">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-neutral-800 px-4 py-3 rounded-2xl rounded-tl-none border border-neutral-700 flex items-center gap-1">
                  <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          {messages.length === 1 && !isLoading && (
            <div className="p-3 border-t border-neutral-800 bg-neutral-950/30 flex flex-wrap gap-1.5 justify-center">
              {SUGGESTED_PROMPTS.map((p, idx) => (
                <button
                  id={`chip-${idx}`}
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-800 rounded-[2px] text-[11px] text-neutral-300 font-mono tracking-wide uppercase cursor-pointer transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input Panel */}
          <div className="p-3 bg-[#222222] border-t border-neutral-800 flex items-center gap-2">
            <input
              id="chat-input-text"
              type="text"
              placeholder="Ask about pricing, site setup..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded-[2px] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E67E22]"
            />
            <button
              id="chat-send-btn"
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isLoading}
              className="w-8 h-8 rounded-[2px] bg-[#E67E22] disabled:bg-neutral-800 text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 disabled:scale-100"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Circular Launch Button */}
      <button
        id="toggle-chat-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-14 h-14 bg-[#E67E22] hover:bg-[#D35400] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-orange-500/20 cursor-pointer transition-all hover:scale-110 active:scale-95 border border-orange-400/40"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform rotate-90" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 group-hover:scale-105 transition-transform" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 w-3 h-3 rounded-full border-2 border-[#E67E22] animate-bounce"></span>
          </div>
        )}
        
        {/* Tooltip on hover */}
        {!isOpen && (
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-neutral-900 border border-neutral-800 text-white font-sans font-medium text-xs rounded-full px-3.5 py-1.5 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none tracking-wide">
            Chat with Claude Local AI
          </span>
        )}
      </button>
    </div>
  );
}
