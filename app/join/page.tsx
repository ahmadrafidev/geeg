"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/modules/Navbar";

import { LogInIcon, WalletIcon } from "lucide-react";

export default function JoinPage() {
  const router = useRouter();
  const { address, isConnecting } = useAccount();
  const { open } = useAppKit();

  useEffect(() => {
    if (address) router.replace("/join/questionnaire");
  }, [address, router]);

  if (isConnecting || address) return null;
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container my-auto grid grid-cols-1 items-stretch gap-4 py-8 md:grid-cols-2">
        <div className="relative m-auto aspect-square w-3/4 md:w-1/2">
          <Image alt="" src="/illustrations/join.svg" fill />
        </div>

        <section className="flex flex-col items-start justify-center text-foreground">
          <h1 className="font-londrina text-5xl font-black tracking-wide">
            Join the Freelancing{" "}
            <span className="text-primary">Revolution</span>
          </h1>

          <p className="mt-6">
            Connect your wallet to access a world of opportunities:
          </p>

          <ul className="mt-1.5 list-inside list-disc space-y-2 text-sm text-muted-foreground">
            <li>Find high-paying gigs tailored to your skills</li>
            <li>Secure, blockchain contracts and payments</li>
            <li>Build reputation with verifiable work history</li>
          </ul>

          <p className="mt-2 text-sm">
            Join thousands of freelancers who are already benefiting from our
            decentralized platform.
          </p>

          <div className="mt-8 flex flex-col rounded-lg border-2 bg-card p-4">
            <h1 className="text-2xl font-semibold tracking-tight">
              Register Now
            </h1>

            <p className="text-muted-foregrounds mt-1.5 text-sm">
              Connect your wallet or login with socials to get started
            </p>

            <Button
              className="mt-2 w-full space-x-2 font-medium"
              variant="outline"
              size="lg"
              onClick={() => open({ view: "Connect" })}
            >
              <LogInIcon className="h-4 w-4" />
              <span>Login with socials</span>
            </Button>

            <Button
              className="mt-2 w-full space-x-2 font-medium"
              size="lg"
              onClick={() => open({ view: "Connect" })}
            >
              <WalletIcon className="h-4 w-4" />
              <span>Connect wallet</span>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
