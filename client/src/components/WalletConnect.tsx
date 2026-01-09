import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { Button } from './ui/button';
import { Wallet, LogOut } from 'lucide-react';
import { liskSepolia } from '@/config/chains';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
    chainId: liskSepolia.id,
  });

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (value: string | undefined) => {
    if (!value) return '0.00';
    const num = parseFloat(value);
    return num.toFixed(4);
  };

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Wallet className="h-4 w-4" />
            {formatAddress(address)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="px-2 py-2 text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Address:</span>
              <span className="font-mono">{formatAddress(address)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Balance:</span>
              <span className="font-mono">
                {formatBalance(balance?.formatted)} {balance?.symbol || 'ETH'}
              </span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => disconnect()} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Connect a wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {connectors.map((connector) => (
          <DropdownMenuItem
            key={connector.id}
            onClick={() => connect({ connector })}
            className="cursor-pointer"
          >
            {connector.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
