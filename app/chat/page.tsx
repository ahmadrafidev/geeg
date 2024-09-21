'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/chat"); 
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage = { role: "user", content: inputMessage };
      
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage)
        });

        const data = await response.json();

        setMessages((prevMessages) => [...prevMessages, ...data.messages]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <main className="flex-grow flex flex-col p-4 overflow-y-auto space-y-4">
        <div className="mb-8 flex justify-center">
          <Image alt="Chat icon" src="/icon.svg" width={60} height={60} />
        </div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-md p-4 my-2 rounded-lg shadow ${
              msg.role === "user" ? "bg-primary text-white self-end text-base" : "bg-gray-200 text-black self-start"
            }`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </main>

      <footer className="bg-white dark:bg-gray-800 p-4">
        <div className="flex items-center max-w-3xl mx-auto">
          <Input
            className="flex-grow mr-2 md:w-3/4 min-h-[3rem] max-h-[5rem]"
            placeholder="Type a message"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-12 min-h-[3rem] max-h-[5rem]"
            onClick={handleSendMessage}
          >
            <Send />
          </Button>
        </div>
      </footer>
    </div>
  );
}
