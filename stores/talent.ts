import { atomWithQuery } from "jotai-tanstack-query";
import { getTalent } from "@/actions/talent/get";
import { accountAtom } from "./account";

export const talentAtom = atomWithQuery((get) => ({
  queryKey: ["talent", get(accountAtom)?.address],
  queryFn: async () => {
    const address = get(accountAtom)?.address;
    if (address) {
      const talent = await getTalent({ address });
      return talent;
    }
    return null;
  },
  enabled: !!get(accountAtom)?.address,
}));
