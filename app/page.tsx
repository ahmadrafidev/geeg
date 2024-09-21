import Link from "next/link";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FaCode, FaPaintBrush, FaBullhorn, FaPen, FaVideo, FaRobot, FaMusic, FaBriefcase, FaComments } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link className="flex items-center space-x-1 text-primary" href="/">
            <Image alt="" src="/icon.svg" width={20} height={20} />
            <p className="font-londrina text-2xl font-black tracking-wider">
              Geeg
            </p>
          </Link>

          <nav className="hidden space-x-4 md:flex">
            <Button>Join</Button>
          </nav>
        </div>
      </header>

      <main className="flex flex-col">
        <section className="bg-card py-32">
          <div className="container mx-auto flex flex-col">
            <h1 className="mb-4 font-londrina text-4xl font-bold tracking-wide text-card-foreground md:text-6xl">
              Find the right <span className="text-primary">Talent</span>,
              <br /> right away
            </h1>

            <div className="flex space-x-1 rounded-lg border p-1">
              <Input placeholder="Search for any talent, service, etc" />
              <Button size="icon">
                <SearchIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <section className="w-full max-w-6xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
        {[
          { icon: <FaCode className="text-2xl mr-3 text-blue-500" />, name: "Programming & Tech" },
          { icon: <FaPaintBrush className="text-2xl mr-3 text-pink-500" />, name: "Graphics & Design" },
          { icon: <FaBullhorn className="text-2xl mr-3 text-green-500" />, name: "Digital Marketing" },
          { icon: <FaPen className="text-2xl mr-3 text-yellow-500" />, name: "Writing & Translation" },
          { icon: <FaVideo className="text-2xl mr-3 text-red-500" />, name: "Video & Animation" },
          { icon: <FaRobot className="text-2xl mr-3 text-purple-500" />, name: "AI Services" },
          { icon: <FaMusic className="text-2xl mr-3 text-indigo-500" />, name: "Music & Audio" },
          { icon: <FaBriefcase className="text-2xl mr-3 text-gray-500" />, name: "Business" },
          { icon: <FaComments className="text-2xl mr-3 text-teal-500" />, name: "Consulting" },
        ].map((category) => (
          <div
            key={category.name}
            className="relative flex items-center p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 transition-all duration-300 hover:bg-gradient-to-r from-green-100 to-transparent dark:hover:bg-gradient-to-r dark:from-zinc-800 dark:to-transparent cursor-pointer"
          >
            {category.icon}
            <span className="text-gray-900 dark:text-gray-100">{category.name}</span>

            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-200 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </section>

    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
