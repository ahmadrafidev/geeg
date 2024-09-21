"use client";

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
      const newMessage: Message = { role: "user", content: inputMessage };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage),
        });

        const data = await response.json();

        setMessages((prevMessages) => [...prevMessages, ...data.messages]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-black">
      <main className="flex flex-grow flex-col space-y-4 overflow-y-auto p-4">
        <div className="mb-8 flex justify-center">
          <Image alt="Chat icon" src="/icon.svg" width={60} height={60} />
        </div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 max-w-md rounded-lg p-4 shadow ${
              msg.role === "user"
                ? "self-end bg-primary text-base text-white"
                : "self-start bg-gray-200 text-black"
            }`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </main>

      <footer className="bg-white p-4 dark:bg-gray-800">
        <div className="mx-auto flex max-w-3xl items-center">
          <Input
            className="mr-2 max-h-[5rem] min-h-[3rem] flex-grow rounded-lg md:w-3/4"
            placeholder="Type a message..."
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            variant="ghost"
            size="icon"
            className="max-h-[5rem] min-h-[3rem] w-12 rounded-lg"
            onClick={handleSendMessage}
          >
            <Send />
          </Button>
        </div>
      </footer>
    </div>
  );
}
