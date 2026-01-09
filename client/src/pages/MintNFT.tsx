import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Image as ImageIcon, Loader2, Sparkles, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';

const MintNFT = () => {
  const { address, isConnected } = useAccount();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [royalty, setRoyalty] = useState([10]);
  const [isMinting, setIsMinting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (PNG, JPG, GIF, WebP)');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!imageFile || !title || !description) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsMinting(true);
    
    try {
      // TODO: Upload image to IPFS
      // TODO: Upload metadata to IPFS
      // TODO: Call smart contract mint function
      
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('NFT minted successfully!');
      
      // Reset form
      setImageFile(null);
      setImagePreview('');
      setTitle('');
      setDescription('');
      setRoyalty([10]);
    } catch (error) {
      console.error('Minting error:', error);
      toast.error('Failed to mint NFT. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-12">
        {/* Background Gradient Mesh */}
        <div className="fixed inset-0 gradient-mesh opacity-20 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <Alert className="glass-strong border-primary/50">
            <Sparkles className="h-5 w-5 text-primary" />
            <AlertDescription className="text-base">
              Please connect your wallet to mint NFTs on Lisk.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 gradient-mesh opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Create on Lisk </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3  bg-clip-text ">
            Mint Your NFT
          </h1>
          <p className="text-lg text-muted-foreground">
            Create and mint your unique digital artwork on Lisk L2 with automated royalties
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="glass-strong border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Create New NFT</CardTitle>
                <CardDescription className="text-base">
                  Upload your artwork and set the details for your NFT
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMint} className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-base font-semibold">Artwork Image *</Label>
                    <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                      {imagePreview ? (
                        <div className="space-y-4">
                          <div className="relative rounded-xl overflow-hidden shadow-lg max-w-sm mx-auto">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-auto"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview('');
                            }}
                          >
                            Change Image
                          </Button>
                        </div>
                      ) : (
                        <label htmlFor="image" className="cursor-pointer">
                          <div className="flex flex-col items-center space-y-3">
                            <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center shadow-glow">
                              <Upload className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-lg mb-1">Click to upload or drag and drop</p>
                              <p className="text-sm text-muted-foreground">
                                PNG, JPG, GIF, WebP (max. 10MB)
                              </p>
                            </div>
                          </div>
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-base font-semibold">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Abstract Dreams #001"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="h-12 text-base"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-semibold">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your NFT, its inspiration, and what makes it unique..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      required
                      className="text-base resize-none"
                    />
                  </div>

                  {/* Royalty Percentage */}
                  <div className="space-y-4 p-4 rounded-lg glass">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="royalty" className="text-base font-semibold">Royalty Percentage</Label>
                      <span className="text-2xl font-bold bg-clip-text ">{royalty[0]}%</span>
                    </div>
                    <Slider
                      id="royalty"
                      min={0}
                      max={25}
                      step={1}
                      value={royalty}
                      onValueChange={setRoyalty}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      You'll receive {royalty[0]}% of all future sales of this NFT automatically
                    </p>
                  </div>

                  {/* Mint Button */}
                  <Button
                    type="submit"
                    className="w-full h-14 text-base font-bold"
                    variant="hero"
                    disabled={isMinting || !imageFile || !title || !description}
                  >
                    {isMinting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Minting on Lisk...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="mr-2 h-5 w-5" />
                        Mint NFT
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By minting, you confirm that you own the rights to this artwork
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card className="glass-strong border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Why Mint on Creators Dome?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Automated Royalties</p>
                    <p className="text-muted-foreground">Earn on every resale with ERC-2981 standard</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Low Gas Fees</p>
                    <p className="text-muted-foreground">Lisk L2 offers minimal transaction costs</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">IPFS Storage</p>
                    <p className="text-muted-foreground">Permanent, decentralized storage</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Pro Tip:</strong> Higher quality artwork and detailed descriptions tend to perform better in the marketplace. Take your time to create something unique!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintNFT;
