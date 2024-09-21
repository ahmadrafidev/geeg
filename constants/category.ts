import {
  Code2Icon,
  PaintbrushIcon,
  MegaphoneIcon,
  PenIcon,
  VideoIcon,
  BotIcon,
  MusicIcon,
  BriefcaseIcon,
  MessageSquareIcon,
} from "lucide-react";

export type Category = {
  name: string;
  icon: SVGSVGElement;
  color: string;
};

export const categories = [
  {
    icon: Code2Icon,
    name: "Programming & Tech",
    color: "text-blue-500",
  },
  {
    icon: PaintbrushIcon,
    name: "Graphics & Design",
    color: "text-pink-500",
  },
  {
    icon: MegaphoneIcon,
    name: "Digital Marketing",
    color: "text-green-500",
  },
  {
    icon: PenIcon,
    name: "Writing & Translation",
    color: "text-yellow-500",
  },
  {
    icon: VideoIcon,
    name: "Video & Animation",
    color: "text-red-500",
  },
  {
    icon: BotIcon,
    name: "AI Services",
    color: "text-purple-500",
  },
  {
    icon: MusicIcon,
    name: "Music & Audio",
    color: "text-indigo-500",
  },
  {
    icon: BriefcaseIcon,
    name: "Business",
    color: "text-gray-500",
  },
  {
    icon: MessageSquareIcon,
    name: "Consulting",
    color: "text-teal-500",
  },
];
