import Image from "next/image";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Send } from "lucide-react";

export default function Chat() {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="mb-8">
          <Image alt="" src="/icon.svg" width={60} height={60} />
        </div>
      </main>
      
      <footer className="bg-white p-4">
        <div className="flex items-center max-w-3xl mx-auto">
          <Input
            className="flex-grow mr-2"
            placeholder="Type a message"
            type="text"
          />
          <Button variant="ghost" size="icon">
            <Send />
          </Button>
        </div>
      </footer>
    </div>
  )
}