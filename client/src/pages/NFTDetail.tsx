import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Share2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

// Mock data - will be replaced with actual contract data
const mockNFT = {
  id: '1',
  title: 'Abstract Art #001',
  description: 'Beautiful abstract artwork with vibrant colors and dynamic composition. This piece represents the intersection of digital and traditional art.',
  image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=1200&h=1200&fit=crop',
  price: '0.5',
  owner: '0x1234567890123456789012345678901234567890',
  creator: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
  royalty: 10,
  listed: true,
  tokenId: '1',
  contract: '0x...',
};

const transactionHistory = [
  { type: 'Minted', from: '0x0000...0000', to: '0xabcd...efgh', price: '-', date: '2024-01-15' },
  { type: 'Sale', from: '0xabcd...efgh', to: '0x1234...5678', price: '0.5 ETH', date: '2024-02-20' },
  { type: 'Sale', from: '0x1234...5678', to: '0x8765...4321', price: '0.8 ETH', date: '2024-03-10' },
];

const NFTDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [nft] = useState(mockNFT);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const isOwner = address?.toLowerCase() === nft.owner.toLowerCase();

  const handleBuy = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsPurchasing(true);
    try {
      // TODO: Implement actual purchase logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('NFT purchased successfully!');
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Failed to purchase NFT');
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/marketplace')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square">
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{nft.title}</h1>
              <p className="text-muted-foreground">{nft.description}</p>
            </div>

            {/* Price and Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="text-3xl font-bold">{nft.price} ETH</p>
                  </div>

                  {nft.listed && (
                    <div className="flex gap-3">
                      {!isOwner ? (
                        <Button
                          className="flex-1"
                          variant="hero"
                          size="lg"
                          onClick={handleBuy}
                          disabled={isPurchasing}
                        >
                          {isPurchasing ? 'Processing...' : 'Buy Now'}
                        </Button>
                      ) : (
                        <Button className="flex-1" variant="outline" size="lg">
                          You own this NFT
                        </Button>
                      )}
                      <Button variant="outline" size="lg" onClick={handleShare}>
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* NFT Details */}
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Owner</span>
                  <span className="font-mono">{formatAddress(nft.owner)}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Creator</span>
                  <span className="font-mono">{formatAddress(nft.creator)}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Royalty Fee</span>
                  <Badge variant="secondary">{nft.royalty}%</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Token ID</span>
                  <span className="font-mono">{nft.tokenId}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Blockchain</span>
                  <span>Lisk Sepolia</span>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactionHistory.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">{tx.type}</p>
                        <p className="text-sm text-muted-foreground">
                          From {formatAddress(tx.from)} to {formatAddress(tx.to)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{tx.price}</p>
                        <p className="text-sm text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetail;
