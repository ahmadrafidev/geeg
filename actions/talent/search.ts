"use server";

import { prisma } from "@/utils/prisma";
import { Brief } from "@/constants/chat";

export async function searchTalent(brief: Brief) {
  return await prisma.talent.findMany({
    where: {
      skills: { hasSome: brief.skills },
      hourlyRate: { gte: brief.hourly_rate },
    },
  });
}
