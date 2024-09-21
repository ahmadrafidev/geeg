import { FC } from "react";
import { Brief, Message } from "@/constants/chat";

import { cn } from "@/utils/cn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ChatBubbleProps = {
  className?: string;
  message: Message;
};

const ChatBubble: FC<ChatBubbleProps> = ({ className, message }) => {
  if (message.content.startsWith("{") && message.content.endsWith("}")) {
    const brief = JSON.parse(message.content) as Brief;
    return (
      <Card className={cn("rounded-lg border bg-card", className)}>
        <CardHeader>
          <CardTitle>Project Brief</CardTitle>
          <CardDescription>Summary for project brief</CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex items-start space-x-2">
            <p className="text-sm font-semibold">Summary:</p>
            <p className="text-sm text-muted-foreground">{brief.summary}</p>
          </div>
          <div className="flex items-start space-x-2">
            <p className="text-sm font-semibold">Skills:</p>
            <p className="text-sm text-muted-foreground">
              {brief.skills.join(", ")}
            </p>
          </div>

          <hr />
          <div className="flex items-start space-x-2">
            <p className="text-sm font-semibold">Time Estimate:</p>
            <p className="text-sm text-muted-foreground">
              {brief.time_estimate} hours
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <p className="text-sm font-semibold">Deadline:</p>
            <p className="text-sm text-muted-foreground">
              {brief.deadline} days
            </p>
          </div>

          <hr />
          <div className="flex items-start space-x-2">
            <p className="text-sm font-semibold">Budget:</p>
            <p className="text-sm text-muted-foreground">${brief.budget}</p>
          </div>
          <div className="flex items-start space-x-2">
            <p className="text-sm font-semibold">Hourly Rate:</p>
            <p className="text-sm text-muted-foreground">
              ${brief.hourly_rate}/hr
            </p>
          </div>

          <hr />
          <div className="flex items-start space-x-2">
            <p className="text-sm font-semibold">Minimum Gigs:</p>
            <p className="text-sm text-muted-foreground">{brief.gigs}</p>
          </div>
          <div className="flex items-start space-x-2">
            <p className="text-sm font-semibold">Minimum Rating:</p>
            <p className="text-sm text-muted-foreground">{brief.rating}/5.0</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <p
      className={cn(
        "text-medium max-w-md whitespace-pre-wrap rounded-lg border bg-card px-4 py-2 text-sm",
        message.role === "user"
          ? "self-end rounded-br-none bg-card text-card-foreground"
          : "self-start rounded-bl-none bg-muted text-muted-foreground",
        className,
      )}
    >
      {message.content.split(/(\*\*.*?\*\*)/).map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span key={index} className="font-semibold">
            {part.slice(2, -2)}
          </span>
        ) : (
          part
        ),
      )}
    </p>
  );
};

ChatBubble.displayName = "ChatBubble";
export { ChatBubble };
