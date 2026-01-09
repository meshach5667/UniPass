import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const artworks = [
  {
    id: 1,
    title: "Sunset #42",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    royalty: 10,
    earned: "2.1 LSK",
    lastSale: "2 days ago",
  },
  {
    id: 2,
    title: "Abstract 7",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
    royalty: 15,
    earned: "1.8 LSK",
    lastSale: "5 days ago",
  },
  {
    id: 3,
    title: "Digital Dreams",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop",
    royalty: 10,
    earned: "1.3 LSK",
    lastSale: "1 week ago",
  },
];

const Artworks = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Artworks</h1>
          <p className="text-muted-foreground">Manage your registered NFTs and track their performance</p>
        </div>
        <Link to="/dashboard/mint">
          <Button variant="hero">
            <PlusCircle className="w-4 h-4" />
            Mint New
          </Button>
        </Link>
      </div>

      {artworks.length === 0 ? (
        <Card className="glass p-12 text-center">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-bold mb-2">No artworks yet</h3>
          <p className="text-muted-foreground mb-6">
            Mint your first NFT to start earning royalties
          </p>
          <Link to="/dashboard/mint">
            <Button variant="hero">
              <PlusCircle className="w-4 h-4" />
              Mint Your First NFT
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <Card key={artwork.id} className="glass overflow-hidden hover:shadow-glow transition-smooth group">
              <div className="aspect-square overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold">{artwork.title}</h3>
                  <Badge variant="secondary">{artwork.royalty}%</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Earned</span>
                    <span className="font-bold text-primary">{artwork.earned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Sale</span>
                    <span>{artwork.lastSale}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Artworks;
