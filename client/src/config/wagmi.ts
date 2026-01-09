import { createConfig, http } from 'wagmi';
import { liskSepolia } from './chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Get project ID from environment variable (optional for now)
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo';

export const config = createConfig({
  chains: [liskSepolia],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
    walletConnect({
      projectId,
      showQrModal: true,
    }),
  ],
  transports: {
    [liskSepolia.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
