"use client";

import { talentAtom } from "@/stores/talent";
import { useAtomValue } from "jotai";

export default function TalentDashboardPage() {
  const { data } = useAtomValue(talentAtom);
  console.log(data);

  return <></>;
}
