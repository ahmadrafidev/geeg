"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAccount } from "wagmi";
import { useAtomValue } from "jotai";
import { talentAtom } from "@/stores/talent";

import { Navbar } from "@/modules/Navbar";
import { RegistrationForm } from "@/modules/talent/registration/RegistrationForm";

export default function JoinFormPage() {
  const router = useRouter();
  const { address, isConnecting } = useAccount();
  const { data: talent, isLoading: isTalentLoading } = useAtomValue(talentAtom);

  useEffect(() => {
    if (!isConnecting && !address) return router.replace("/join");
    if (!isTalentLoading && !!talent) router.replace("/talent/dashboard");
  }, [address, isConnecting, isTalentLoading, router, talent]);

  // if (isConnecting || !address || isTalentLoading || !!talent) return null;
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex grow items-center justify-center py-8">
        <section className="flex flex-col rounded-lg border bg-card p-4 justify-center items-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Talent Registration Form
          </h1>

          <p className="text-muted-foregrounds mt-1.5 text-base">
            Fill out basic details to create your account
          </p>

          <RegistrationForm className="mt-6" />
        </section>
      </div>
    </div>
  );
}
