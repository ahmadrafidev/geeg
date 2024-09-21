"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Brief, Message } from "@/constants/chat";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ChatBubble } from "@/modules/chat/ChatBubble";

import { Send } from "lucide-react";
import { Talent } from "@prisma/client";
import { searchTalent } from "@/actions/talent/search";

const formSchema = z.object({ message: z.string() });
const initialMessage: Message = {
  role: "assistant",
  content: "What service are you looking for today?",
};

export default function ChatPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const query = searchParams["q"];

  const [messages, setMessages] = useState<Message[]>([]);
  const brief = useMemo(() => {
    const lastMessage = messages.at(-1);
    if (
      lastMessage?.role === "assistant" &&
      lastMessage.content.startsWith("{") &&
      lastMessage.content.endsWith("}")
    ) {
      return JSON.parse(lastMessage.content) as Brief;
    }
  }, [messages]);

  const [talents, setTalents] = useState<Talent[]>([]);
  useEffect(() => {
    if (!brief) return;

    (async () => {
      const talents = await searchTalent(brief);
      setTalents(talents);
    })();
  }, [brief]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const converse = useCallback(async (messages: Message[]) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PHALA_REQUIREMENT_AGENT!}&messages=${encodeURIComponent(JSON.stringify(messages))}`,
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const completion = (await response.json()) as Message;
    return completion;
  }, []);

  const [isLoading, setLoading] = useState(true);
  const onSubmit = async ({ message }: z.infer<typeof formSchema>) => {
    setLoading(true);

    const conversation = [
      ...messages,
      { role: "user" as const, content: message },
    ];
    setMessages(conversation);

    try {
      const response = await converse([
        ...messages,
        { role: "user", content: message },
      ]);

      setMessages((messages) => [...messages, response]);
      form.reset();
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return router.replace("/");

    (async () => {
      const messages = [
        initialMessage,
        { role: "user" as const, content: decodeURIComponent(query) },
      ];

      // Testing for completed conversations
      // const messages = [
      //   initialMessage,
      //   {
      //     role: "user" as const,
      //     content: "I want to create a logo for my cafe",
      //   },
      //   {
      //     role: "assistant" as const,
      //     content:
      //       "That sounds exciting! Can you describe the type of logo you're envisioning? Any specific elements, style, or colors you'd like incorporated?",
      //   },
      //   {
      //     role: "user" as const,
      //     content:
      //       "I want the logo to be green and also have leaf elements. The logo should be minimalistic and modern",
      //   },
      //   {
      //     role: "assistant" as const,
      //     content:
      //       "Great choice! A minimalistic and modern green logo with leaf elements will make your cafe stand out. \n\nAre there any particular fonts or typography styles you'd prefer? Also, would you like the logo to include the name of your cafe or any specific text?",
      //   },
      //   {
      //     role: "user" as const,
      //     content:
      //       'No preference. The brand is "Kopi Sore", I\'m open to either adding it to the logo or not',
      //   },
      //   {
      //     role: "assistant" as const,
      //     content:
      //       'Understood. We have a minimalistic and modern green logo with leaf elements, possibly incorporating the name "Kopi Sore".\n\nAre there any specific deadlines or timeframes you\'re aiming for this project?',
      //   },
      //   {
      //     role: "user" as const,
      //     content: "I need it by next month",
      //   },
      //   {
      //     role: "assistant" as const,
      //     content:
      //       "Got it, so we have a month to develop the logo.\n\nWhat kind of experience are you looking for in a freelancer? For instance, would you prefer someone who has extensive experience in graphic design and logo creation?",
      //   },
      //   {
      //     role: "user" as const,
      //     content: "Not really, just someone who have a good track record",
      //   },
      //   {
      //     role: "assistant" as const,
      //     content:
      //       "Understood. You're looking for someone with a solid track record in graphic design and logo creation.\n\nNow, what is your overall budget for this project?",
      //   },
      //   {
      //     role: "user" as const,
      //     content: "I have $200 max",
      //   },
      //   {
      //     role: "assistant" as const,
      //     content:
      //       'Thank you for providing your budget. Let me summarize the project details we\'ve gathered so far:\n\n**Skills needed:** graphic design, logo creation.\n**Style:** Minimalistic and modern.\n**Color scheme:** Green with leaf elements.\n**Text preference:** Possibly including the name "Kopi Sore", open to both options.\n**Time estimate:** Approximately 20 hours (inferred based on the project\'s nature and minimalistic design).\n**Deadline:** 30 days.\n**Budget:** $200.\n**Hourly rate:** $10/hour (inferred from budget and time estimate).\n**Experience level:** Good track record in graphic design and logo creation.\n\nHere\'s a summary of your project:\n- **Skills needed:** graphic design, logo creation.\n- **Time estimate:** 20 hours.\n- **Deadline:** 30 days.\n- **Budget:** $200.\n- **Hourly rate:** $10/hour.\n- **Experience level:** A freelancer with a good track record in graphic design and logo creation.\n- **Summary:** Create a minimalistic and modern green logo with leaf elements for "Kopi Sore", possibly including the name.\n\nDoes this summary look correct, or would you like to make any changes before I finalize it?',
      //   },
      //   {
      //     role: "user" as const,
      //     content: "Looks good",
      //   },
      // ];

      setMessages(messages);

      try {
        const response = await converse(messages);
        setMessages([...messages, response]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [converse, query, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container flex grow flex-col items-center pt-16">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <Image alt="" src="/icon.svg" width={60} height={60} />
            <h1 className="font-londrina text-6xl font-bold text-primary">
              Geegs AI
            </h1>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <p>Powered by</p>
            <Image
              alt="Red Pill"
              src="/partners/redpill.svg"
              width={81}
              height={24}
            />
          </div>
        </div>

        <div className="mt-12 flex w-full flex-col space-y-3">
          {messages.map((message, index) => (
            <ChatBubble
              key={`chat-${message.role}-${index}`}
              message={message}
            />
          ))}

          {!!brief && (
            <ChatBubble
              message={{
                role: "assistant",
                content:
                  "We're currently searching the best talents that match your requirements...",
              }}
            />
          )}

          {talents.length > 0 && (
            <ChatBubble
              message={{
                role: "assistant",
                content: `We found ${talents.length} talents that are a match!`,
              }}
            />
          )}
        </div>

        {talents.length > 0 && (
          <div className="mt-3 grid w-full grid-cols-1 gap-3 overflow-x-auto md:grid-cols-2">
            {talents.map((talent) => (
              <div
                key={`talent-${talent.address}`}
                className="flex h-full w-full items-center justify-start space-x-4 rounded-lg border bg-card p-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-16 w-16 shrink-0 rounded-full"
                  alt={talent.username}
                  src={`https://noun-api.com/beta/pfp?name=${talent.address}`}
                />

                <div className="flex grow flex-col items-start truncate">
                  <p className="truncate">{talent.username}</p>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {talent.skills.slice(0, 3).join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <Form {...form}>
          <form
            className="sticky bottom-0 mt-auto flex w-full items-center space-x-2 pt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input
                      className="h-full bg-background"
                      placeholder="Type a message..."
                      disabled={isLoading || !!brief}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="max-h-[5rem] min-h-[3rem] w-12 rounded-lg"
              variant="ghost"
              size="icon"
              disabled={isLoading || !!brief}
            >
              <Send />
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
