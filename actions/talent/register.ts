"use server";

import { prisma } from "@/utils/prisma";

export async function registerTalent(params: {
  address: string;
  name: string;
  username: string;
  skills: string;
  hourlyRate: number;
  timezone: string;
}) {
  await prisma.talent.create({
    data: {
      ...params,
      skills: params.skills.toLowerCase().split(","),
    },
  });
}
