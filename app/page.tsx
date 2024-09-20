import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <header className="flex justify-between items-center p-4 md:px-16 border-b">
        <div className="text-2xl font-bold text-gray-700">Geeg</div>
        <nav className="hidden md:flex space-x-4">
          <Button className="bg-green-500 hover:bg-green-600 text-white">Join</Button>
        </nav>
      </header>
      
      <main className="bg-green-800 p-8 md:p-16">
        <div className="max-w-4xl mx-auto relative">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Find the right <span className="text-green-300">Talent</span>,<br/> right away
            </h1>
            <div className="flex">
              <Input 
                className="flex-grow rounded-r-none border border-green-600" 
                placeholder="Search for any talent, service, etc" 
              />
              <Button className="bg-green-900 hover:bg-green-950 rounded-l-none">
                <SearchIcon className="h-5 w-5" />
              </Button>
            </div>
          </div> 
        </div>
      </main>
      
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
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
            <div key={category.name} className="flex flex-col items-center text-center">
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-sm md:text-base text-primary dark:text-white font-sans font-normal">{category.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SearchIcon(props) {
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
  )
}
