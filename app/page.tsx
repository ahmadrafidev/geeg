"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  SearchIcon,
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
      <header className="sticky top-0 px-16 py-4">
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
