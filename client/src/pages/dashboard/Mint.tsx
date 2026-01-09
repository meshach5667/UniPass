import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Upload, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Mint = () => {
  const [step, setStep] = useState(1);
  const [royalty, setRoyalty] = useState([10]);
  const { toast } = useToast();

  const handleMint = () => {
    toast({
      title: "NFT Minted Successfully!",
      description: "Your artwork has been registered with royalty tracking.",
    });
    setStep(4);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mint New Artwork</h1>
        <p className="text-muted-foreground">Create an NFT with automatic royalty payments</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-smooth ${
                step >= s ? "gradient-hero shadow-glow" : "bg-muted text-muted-foreground"
              }`}
            >
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
            {s < 3 && <div className={`h-0.5 w-16 ${step > s ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="glass p-8">
          <h2 className="text-2xl font-bold mb-6">Upload Artwork</h2>
          
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-smooth cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Drop your artwork here</p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Support: JPG, PNG, GIF, MP4 (max 100MB)
            </p>
          </div>

          <Button 
            variant="hero" 
            className="w-full mt-6"
            onClick={() => setStep(2)}
          >
            Continue
          </Button>
        </Card>
      )}

      {step === 2 && (
        <Card className="glass p-8">
          <h2 className="text-2xl font-bold mb-6">Artwork Details</h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" placeholder="Enter artwork title" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your artwork"
                className="mt-2 min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="url">External URL</Label>
              <Input 
                id="url" 
                type="url" 
                placeholder="https://your-website.com"
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
            <Button variant="hero" onClick={() => setStep(3)} className="flex-1">
              Continue
            </Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="glass p-8">
          <h2 className="text-2xl font-bold mb-6">Royalty Settings</h2>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-4">
                <Label>Royalty Percentage</Label>
                <span className="text-2xl font-bold text-primary">{royalty[0]}%</span>
              </div>
              <Slider
                value={royalty}
                onValueChange={setRoyalty}
                max={20}
                min={0}
                step={1}
                className="mb-4"
              />
              <p className="text-sm text-muted-foreground">
                You'll earn {royalty[0]}% of every resale. Standard is 10%.
              </p>
            </div>

            <Card className="bg-muted/20 p-6 border-border/50">
              <h3 className="font-bold mb-3">Royalty Preview</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">If sold for 1 LSK</span>
                  <span className="font-bold">{(royalty[0] / 100).toFixed(2)} LSK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">If sold for 10 LSK</span>
                  <span className="font-bold">{(royalty[0] / 10).toFixed(2)} LSK</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
              Back
            </Button>
            <Button variant="hero" onClick={handleMint} className="flex-1">
              Mint NFT
            </Button>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card className="glass p-12 text-center">
          <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center mx-auto mb-6 shadow-glow animate-scale-in">
            <Check className="w-10 h-10 text-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4">NFT Minted Successfully!</h2>
          <p className="text-muted-foreground mb-8">
            Your artwork is now registered with automatic royalty tracking.
          </p>
          <Button variant="hero" onClick={() => window.location.href = '/dashboard/artworks'}>
            View My Artworks
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Mint;
