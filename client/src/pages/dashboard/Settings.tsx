import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const copyAddress = () => {
    navigator.clipboard.writeText("0x7a3f...bd2c");
    toast({
      title: "Copied!",
      description: "Wallet address copied to clipboard",
    });
  };

  return (
    <div className="max-w-3xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="glass p-8">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Artist Name</Label>
            <Input id="name" placeholder="Your artist name" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              placeholder="Tell us about yourself"
              className="mt-2 min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" type="url" placeholder="https://your-website.com" className="mt-2" />
          </div>

          <Button variant="hero">Save Profile</Button>
        </div>
      </Card>

      {/* Wallet */}
      <Card className="glass p-8">
        <h2 className="text-2xl font-bold mb-6">Wallet</h2>
        <div className="space-y-4">
          <div>
            <Label>Connected Wallet</Label>
            <div className="flex items-center gap-2 mt-2">
              <Input value="0x7a3f...bd2c" readOnly className="font-mono" />
              <Button variant="outline" size="icon" onClick={copyAddress}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label>Network</Label>
            <div className="flex items-center gap-2 mt-2 p-3 rounded-lg bg-muted/20">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="font-medium">Lisk Mainnet</span>
            </div>
          </div>

          <Button variant="destructive">Disconnect Wallet</Button>
        </div>
      </Card>

      {/* Default Royalty Settings */}
      <Card className="glass p-8">
        <h2 className="text-2xl font-bold mb-6">Default Royalty Settings</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="defaultRoyalty">Default Royalty Percentage</Label>
            <Input 
              id="defaultRoyalty" 
              type="number" 
              defaultValue="10" 
              min="0" 
              max="20"
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-2">
              This will be pre-filled when minting new artworks
            </p>
          </div>

          <Button variant="hero">Save Settings</Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
