import Link from "next/link";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { SearchIcon } from "lucide-react";

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
            <w3m-button />
            {/* <Button>Join</Button> */}
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

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { icon: "💻", name: "Programming & Tech" },
            { icon: "🎨", name: "Graphics & Design" },
            { icon: "📱", name: "Digital Marketing" },
            { icon: "✍️", name: "Writing & Translation" },
            { icon: "🎥", name: "Video & Animation" },
            { icon: "🤖", name: "AI Services" },
            { icon: "🎵", name: "Music & Audio" },
            { icon: "💼", name: "Business" },
          ].map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-2 text-3xl">{category.icon}</div>
              <div className="font-sans text-sm font-normal text-primary dark:text-white md:text-base">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
