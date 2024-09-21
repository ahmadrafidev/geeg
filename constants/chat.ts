export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type Brief = {
  skills: string[];
  summary: string;
  time_estimate: number;
  deadline: number;
  gigs: number;
  rating: number;
  budget: number;
  hourly_rate: number;
};
