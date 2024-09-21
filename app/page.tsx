'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Code2Icon,
  PaintbrushIcon,
  MegaphoneIcon,
  PenIcon,
  VideoIcon,
  BotIcon,
  MusicIcon,
  BriefcaseIcon,
  MessageSquareIcon,
  SearchIcon
} from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isClient, setIsClient] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (query = searchQuery) => {
    if (query.trim() !== "" && isClient) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };
  

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 py-4 px-16">
        <div className="flex items-center justify-between">
          <Link className="flex items-center space-x-1 text-primary" href="/">
            <Image alt="" src="/icon.svg" width={22} height={22} />
            <p className="font-londrina text-2xl font-black tracking-wider">
              Geeg
            </p>
          </Link>

          <nav className="hidden space-x-4 md:flex">
            <w3m-button />
          </nav>
        </div>
      </header>

      <main className="flex flex-col px-16">
        <section className="bg-card py-32 rounded-2xl">
          <div className="container mx-auto flex flex-col px-6">
            <h1 className="mb-4 font-londrina text-4xl font-bold tracking-wide text-card-foreground md:text-6xl">
              Find the right <span className="text-primary">Talent</span>,
              <br /> right away
            </h1>

            <div className="flex space-x-1 rounded-lg border p-1">
              <Input
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search for any talent, service, etc"
              />
              <Button size="icon" onClick={() => handleSearch()}>
                <SearchIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <section className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto px-16">
        {[
          { icon: <Code2Icon className="text-2xl mr-3 text-blue-500" />, name: "Programming & Tech" },
          { icon: <PaintbrushIcon className="text-2xl mr-3 text-pink-500" />, name: "Graphics & Design" },
          { icon: <MegaphoneIcon className="text-2xl mr-3 text-green-500" />, name: "Digital Marketing" },
          { icon: <PenIcon className="text-2xl mr-3 text-yellow-500" />, name: "Writing & Translation" },
          { icon: <VideoIcon className="text-2xl mr-3 text-red-500" />, name: "Video & Animation" },
          { icon: <BotIcon className="text-2xl mr-3 text-purple-500" />, name: "AI Services" },
          { icon: <MusicIcon className="text-2xl mr-3 text-indigo-500" />, name: "Music & Audio" },
          { icon: <BriefcaseIcon className="text-2xl mr-3 text-gray-500" />, name: "Business" },
          { icon: <MessageSquareIcon className="text-2xl mr-3 text-teal-500" />, name: "Consulting" },
        ].map((category) => (
          <Button
            variant="ghost"
            key={category.name}
            className="relative flex items-center p-4 h-16 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 transition-all duration-300 hover:bg-gradient-to-r from-green-100 to-transparent dark:hover:bg-gradient-to-r dark:from-zinc-800 dark:to-transparent cursor-pointer"
            onClick={() => {
              setSearchQuery(category.name); 
              handleSearch(category.name);
            }}
          >
            {category.icon}
            <span className="text-gray-900 dark:text-gray-100">{category.name}</span>

            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-200 to-green-600 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </Button>
        ))}
      </section>
    </div>
  );
}
