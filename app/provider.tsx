"use client";

import { type ReactNode } from "react";

import { useAccountEffect, WagmiProvider, type Config } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createAppKit } from "@reown/appkit/react";
import { wagmiAdapter, projectId, networks } from "@/constants/wagmi";

import { useSetAtom } from "jotai";
import { accountAtom } from "@/stores/account";

const queryClient = new QueryClient();

const metadata = {
  name: "Geeg",
  description: "A Talend Finder Platform",
  url:
    process.env.NODE_ENV === "production"
      ? "https://geeg.xyz"
      : "http://localhost:3000",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

export const modal = createAppKit({
  projectId,
  networks,
  adapters: [wagmiAdapter],
  defaultNetwork: networks[0],
  metadata: metadata,
  allWallets: "HIDE",
  themeVariables: {
    "--w3m-accent": "#34D399",
    "--w3m-color-mix-strength": 0,
  },
});

function AccountProvider({ children }: { children: ReactNode }) {
  const setAccount = useSetAtom(accountAtom);
  useAccountEffect({
    onConnect: (data) => {
      console.log(data);
      setAccount(data);
    },
    onDisconnect: () => setAccount(undefined),
  });

  return children;
}

function Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        <AccountProvider>{children}</AccountProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Provider;
