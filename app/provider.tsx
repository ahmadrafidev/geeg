"use client";

import { type ReactNode } from "react";

import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createAppKit } from "@reown/appkit/react";
import { wagmiAdapter, projectId, networks } from "@/constants/wagmi";

const queryClient = new QueryClient();

const metadata = {
  name: "Geeg",
  description: "A Talend Finder Platform",
  url:
    process.env.NODE_ENV === "production"
      ? "https://geeg.work"
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
});

function Provider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies,
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default Provider;
