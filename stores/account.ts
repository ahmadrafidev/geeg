import { atom } from "jotai";
import { Connector } from "@wagmi/core";
import { Address, Chain } from "viem";

export const accountAtom = atom<{
  chainId: number;
  address: Address;
  chain: Chain | undefined;
  addresses: readonly [Address, ...Address[]];
  connector: Connector;
  isReconnected: boolean;
}>();
