"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { categories } from "@/constants/category";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Navbar } from "@/modules/Navbar";

import { CornerRightDownIcon, SearchIcon } from "lucide-react";

const formSchema = z.object({ query: z.string() });

export default function Home() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: "" },
  });

  const [isLoading, setLoading] = useState(false);
  const onSubmit = async ({ query }: z.infer<typeof formSchema>) => {
    setLoading(true);
    router.push(`/chat?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container flex grow flex-col justify-center pb-8">
        <section className="mt-4 flex flex-col rounded-2xl bg-card px-8 py-8 md:py-12">
          <h1 className="font-londrina text-3xl font-bold tracking-wide text-card-foreground md:text-6xl">
            Find the right <span className="text-primary">Talent</span>, the
            right way
          </h1>

          <p className="mt-4 text-lg font-medium md:text-2xl">
            Imagine Tinder, but for freelance gigs
          </p>

          <Form {...form}>
            <form
              className="mt-5 flex items-stretch space-x-2 rounded-lg md:mt-8 md:border md:p-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="query"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <div>
                        <Input
                          className="h-12 grow border-2 p-4 md:hidden"
                          placeholder="Tell us what you need"
                          {...field}
                        />

                        <Input
                          className="hidden h-12 grow border-2 p-4 text-lg md:block"
                          placeholder="What service are you looking for today?"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="aspect-square h-12"
                type="submit"
                disabled={isLoading}
              >
                <SearchIcon />
              </Button>
            </form>
          </Form>
        </section>

        <p className="mx-auto mt-8">
          or pick one category to get started{" "}
          <CornerRightDownIcon className="inline h-5 w-5 translate-y-1" />
        </p>

        <section className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <Button
              key={category.name}
              className="relative flex h-16 cursor-pointer items-center rounded-lg border border-zinc-200 bg-white from-green-100 to-transparent p-4 transition-all duration-300 hover:bg-gradient-to-r dark:border-zinc-700 dark:bg-zinc-900 dark:from-zinc-800 dark:to-transparent dark:hover:bg-gradient-to-r"
              variant="ghost"
              type="submit"
              onClick={() => {
                form.setValue("query", category.name);
                form.handleSubmit(onSubmit)();
              }}
            >
              <category.icon className={cn("mr-3 text-2xl", category.color)} />
              <span className="text-gray-900 dark:text-gray-100">
                {category.name}
              </span>
            </Button>
          ))}
        </section>
      </main>
    </div>
  );
}
