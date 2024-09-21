"use server";

import { prisma } from "@/utils/prisma";

export async function getTalent(params: { address: string }) {
  return await prisma.talent.findFirst({ where: { address: params.address } });
}
