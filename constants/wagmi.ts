import { cookieStorage, createStorage } from "wagmi";

import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { flowTestnet } from "viem/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

export const networks = [
  {
    ...flowTestnet,
    chainId: flowTestnet.id,
    id: `eip155:${flowTestnet.id}` as const,
    chainNamespace: "eip155" as const,
    currency: flowTestnet.nativeCurrency.symbol,
    explorerUrl: flowTestnet.blockExplorers.default.url,
    rpcUrl: flowTestnet.rpcUrls.default.http[0],
  },
];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
