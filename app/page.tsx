"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/modules/Navbar";

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
  SearchIcon,
} from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (query = searchQuery) => {
    if (query.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-col px-16">
        <section className="rounded-2xl bg-card py-32">
          <div className="container mx-auto flex flex-col px-6">
            <h1 className="mb-4 font-londrina text-4xl font-bold tracking-wide text-card-foreground md:text-6xl">
              Find the right <span className="text-primary">Talent</span>,
              <br /> right away
            </h1>

            <div className="flex space-x-1 rounded-lg border p-1 items-stretch">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for any talent, service, etc"
                className="flex-grow md:w-3/4 min-h-[3rem] max-h-[5rem]"
              />
              <Button size="icon" onClick={() => handleSearch()} className="w-12 min-h-[3rem] max-h-[5rem]">
                <SearchIcon className="h-6 w-" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <section className="mx-auto mt-8 grid w-full grid-cols-1 gap-4 px-16 md:grid-cols-3">
        {[
          {
            icon: <Code2Icon className="mr-3 text-2xl text-blue-500" />,
            name: "Programming & Tech",
          },
          {
            icon: <PaintbrushIcon className="mr-3 text-2xl text-pink-500" />,
            name: "Graphics & Design",
          },
          {
            icon: <MegaphoneIcon className="mr-3 text-2xl text-green-500" />,
            name: "Digital Marketing",
          },
          {
            icon: <PenIcon className="mr-3 text-2xl text-yellow-500" />,
            name: "Writing & Translation",
          },
          {
            icon: <VideoIcon className="mr-3 text-2xl text-red-500" />,
            name: "Video & Animation",
          },
          {
            icon: <BotIcon className="mr-3 text-2xl text-purple-500" />,
            name: "AI Services",
          },
          {
            icon: <MusicIcon className="mr-3 text-2xl text-indigo-500" />,
            name: "Music & Audio",
          },
          {
            icon: <BriefcaseIcon className="mr-3 text-2xl text-gray-500" />,
            name: "Business",
          },
          {
            icon: <MessageSquareIcon className="mr-3 text-2xl text-teal-500" />,
            name: "Consulting",
          },
        ].map((category) => (
          <Button
            variant="ghost"
            key={category.name}
            className="relative flex h-16 cursor-pointer items-center rounded-lg border border-zinc-200 bg-white from-green-100 to-transparent p-4 transition-all duration-300 hover:bg-gradient-to-r dark:border-zinc-700 dark:bg-zinc-900 dark:from-zinc-800 dark:to-transparent dark:hover:bg-gradient-to-r"
            onClick={() => {
              setSearchQuery(category.name);
              handleSearch(category.name);
            }}
          >
            {category.icon}
            <span className="text-gray-900 dark:text-gray-100">
              {category.name}
            </span>

            <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-green-200 to-green-600 opacity-0 transition-opacity duration-300 ease-in hover:opacity-100"></div>
          </Button>
        ))}
      </section>
    </div>
  );
}
