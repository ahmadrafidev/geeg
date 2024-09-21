import { FC } from "react";

import { cn } from "@/utils/cn";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

type NavbarProps = {
  className?: string;
};

const Navbar: FC<NavbarProps> = ({ className }) => (
  <header
    className={cn("container sticky top-0 z-50 bg-background py-4", className)}
  >
    <div className="flex items-center justify-between">
      <Link className="flex items-center space-x-1 text-primary" href="/">
        <Image alt="" src="/icon.svg" width={22} height={22} />
        <p className="font-londrina text-2xl font-black tracking-wider">Geeg</p>
      </Link>

      <nav className="flex items-center space-x-4 max-md:hidden">
        <Link href="/join">
          <Button variant="outline">Join as Talent</Button>
        </Link>

        <w3m-button balance="hide" />
      </nav>
    </div>
  </header>
);

Navbar.displayName = "Navbar";
export { Navbar };
