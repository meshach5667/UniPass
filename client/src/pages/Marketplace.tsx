import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Store } from 'lucide-react';

// Mock data for demonstration
const mockNFTs = [
  {
    id: '1',
    title: 'Abstract Art #001',
    description: 'Beautiful abstract artwork',
    image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&h=800&fit=crop',
    price: '0.5',
    owner: '0x1234...5678',
    royalty: 10,
    listed: true,
  },
  {
    id: '2',
    title: 'Digital Landscape',
    description: 'Stunning digital landscape',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop',
    price: '1.2',
    owner: '0x8765...4321',
    royalty: 5,
    listed: true,
  },
  {
    id: '3',
    title: 'Crypto Punk Style',
    description: 'Pixel art collectible',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&h=800&fit=crop',
    price: '2.5',
    owner: '0xabcd...efgh',
    royalty: 15,
    listed: true,
  },
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [nfts] = useState(mockNFTs);

  const filteredNFTs = nfts.filter((nft) =>
    nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nft.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 gradient-mesh opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Store className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Discover Digital Art on Lisk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3  bg-clip-text ">
            NFT Marketplace
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover, collect, and sell extraordinary NFTs with automated royalties
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search NFTs by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px] h-12">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Listed</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.map((nft) => (
            <Link key={nft.id} to={`/nft/${nft.id}`}>
              <Card className="overflow-hidden hover:shadow-glow transition-all duration-300 cursor-pointer group glass border-border/50">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={nft.image}
                      alt={nft.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </CardHeader>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-lg mb-1 truncate group-hover:text-primary transition-smooth">{nft.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {nft.description}
                </p>
                <div className="flex items-center justify-between py-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">Owner</span>
                  <span className="text-xs font-mono font-medium">{nft.owner}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs font-semibold shadow-sm">
                    {nft.royalty}% Royalty
                  </Badge>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-bold text-lg  bg-clip-text ">{nft.price} ETH</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full group-hover:shadow-glow transition-all" variant="hero">
                  View Details
                </Button>
              </CardFooter>
            </Card>
            </Link>
          ))}
        </div>

        {filteredNFTs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4 opacity-50">
              <Store className="w-8 h-8 text-white" />
            </div>
            <p className="text-xl font-semibold text-muted-foreground">No NFTs found matching your search.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
