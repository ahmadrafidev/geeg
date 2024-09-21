"use client";

import { FC } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  skills: z
    .string()
    .min(10, { message: "Skills description must be at least 10 characters." }),
  hourlyRate: z
    .number()
    .min(0, { message: "Hourly rate must be a positive number." }),
  timezone: z.string({ required_error: "Please select a timezone" }),
});

type RegistrationFormProps = {
  className?: string;
};

const RegistrationForm: FC<RegistrationFormProps> = ({ className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      skills: "",
      hourlyRate: 0,
      timezone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const skills = form
    .watch("skills")
    .toLowerCase()
    .split(",")
    .filter((skill) => !!skill);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("max-w-sm space-y-4", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>This is your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>This is your public username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your timezone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GMT-12">GMT-12</SelectItem>
                  <SelectItem value="GMT-11">GMT-11</SelectItem>
                  <SelectItem value="GMT-10">GMT-10</SelectItem>
                  <SelectItem value="GMT-9">GMT-9</SelectItem>
                  <SelectItem value="GMT-8">GMT-8</SelectItem>
                  <SelectItem value="GMT-7">GMT-7</SelectItem>
                  <SelectItem value="GMT-6">GMT-6</SelectItem>
                  <SelectItem value="GMT-5">GMT-5</SelectItem>
                  <SelectItem value="GMT-4">GMT-4</SelectItem>
                  <SelectItem value="GMT-3">GMT-3</SelectItem>
                  <SelectItem value="GMT-2">GMT-2</SelectItem>
                  <SelectItem value="GMT-1">GMT-1</SelectItem>
                  <SelectItem value="GMT+0">GMT+0</SelectItem>
                  <SelectItem value="GMT+1">GMT+1</SelectItem>
                  <SelectItem value="GMT+2">GMT+2</SelectItem>
                  <SelectItem value="GMT+3">GMT+3</SelectItem>
                  <SelectItem value="GMT+4">GMT+4</SelectItem>
                  <SelectItem value="GMT+5">GMT+5</SelectItem>
                  <SelectItem value="GMT+6">GMT+6</SelectItem>
                  <SelectItem value="GMT+7">GMT+7</SelectItem>
                  <SelectItem value="GMT+8">GMT+8</SelectItem>
                  <SelectItem value="GMT+9">GMT+9</SelectItem>
                  <SelectItem value="GMT+10">GMT+10</SelectItem>
                  <SelectItem value="GMT+11">GMT+11</SelectItem>
                  <SelectItem value="GMT+12">GMT+12</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose your preferred timezone.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your skills..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                  {skills.map((skill, index) => (
                    <Badge key={`${skill}:${index}`}>{skill}</Badge>
                  ))}
                </div>
              )}

              <FormDescription>
                List your professional skills and expertise, separated by
                commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hourly Rate ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </FormControl>
              <FormDescription>
                Your desired hourly rate in USD.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

RegistrationForm.displayName = "RegistrationForm";
export { RegistrationForm };
