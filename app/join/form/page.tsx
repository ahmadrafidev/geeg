"use client";

import { Navbar } from "@/modules/Navbar";
import { RegistrationForm } from "@/modules/talent/registration/RegistrationForm";

export default function JoinFormPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex grow items-center justify-center py-8">
        <section className="flex flex-col rounded-lg border bg-card p-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Talent Registration Form
          </h1>

          <p className="text-muted-foregrounds mt-1.5 text-sm">
            Fill out basic details to create your account
          </p>

          <RegistrationForm className="mt-4" />
        </section>
      </div>
    </div>
  );
}
