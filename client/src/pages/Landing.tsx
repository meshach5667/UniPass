import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { 
  Sparkles, 
  Shield, 
  TrendingUp, 
  Upload, 
  Settings, 
  Wallet,
  ArrowRight,
  Globe,
  Zap,
  Users,
  CheckCircle,
  ExternalLink
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 gradient-mesh opacity-30 pointer-events-none"></div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-8 shadow-glow">
              <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
              <span className="text-sm font-semibold">Powered by Lisk</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
             Creators Dome<br />
              <span className=" bg-clip-text text-black animate-float", Your Rules.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Create, sell, and collect NFTs on <span className="font-bold text-primary">Lisk</span>. 
              Earn automatic royalties on every secondary sale with ERC-2981 compliant smart contracts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/marketplace">
                <Button size="lg" variant="hero" className="w-full sm:w-auto text-base h-14 px-8 shadow-glow">
                  Explore Marketplace
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/mint">
                <Button size="lg" variant="glass" className="w-full sm:w-auto text-base h-14 px-8 border-2">
                  Mint Your NFT
                  <Upload className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16">
              <div className="glass-strong rounded-xl p-4">
                <div className="text-3xl font-bold bg-clip-text  mb-1">$2.5M+</div>
                <div className="text-sm text-muted-foreground">Trading Volume</div>
              </div>
              <div className="glass-strong rounded-xl p-4">
                <div className="text-3xl font-bold bg-clip-text  mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">NFTs Minted</div>
              </div>
              <div className="glass-strong rounded-xl p-4">
                <div className="text-3xl font-bold bg-clip-text  mb-1">5K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Built on Lisk</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose Creators Dome?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the power of Web3 with Lisk's scalable and secure blockchain infrastructure
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="glass-strong p-8 hover:shadow-glow transition-all duration-300 text-center border-border/50 group">
              <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-bounce">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Automated Royalties</h3>
              <p className="text-muted-foreground mb-6">
                ERC-2981 compliant smart contracts ensure you automatically receive royalties on every secondary sale. No manual tracking needed.
              </p>
              <Link to="/marketplace">
                <Button variant="glass" size="sm" className="group-hover:shadow-glow transition-all">
                  Learn More
                </Button>
              </Link>
            </Card>
            
            <Card className="glass-strong p-8 hover:shadow-glow transition-all duration-300 text-center border-border/50 group">
              <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-bounce">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Low Gas Fees on Lisk</h3>
              <p className="text-muted-foreground mb-6">
                Built on Lisk L2 for lightning-fast transactions and minimal gas fees, making NFTs accessible and affordable for everyone.
              </p>
              <Link to="/mint">
                <Button variant="glass" size="sm" className="group-hover:shadow-glow transition-all">
                  Start Minting
                </Button>
              </Link>
            </Card>
            
            <Card className="glass-strong p-8 hover:shadow-glow transition-all duration-300 text-center border-border/50 group">
              <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-bounce">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Decentralized Storage</h3>
              <p className="text-muted-foreground mb-6">
                Your artwork and metadata are stored on IPFS, ensuring permanent, censorship-resistant access to your digital assets.
              </p>
              <Link to="/dashboard">
                <Button variant="glass" size="sm" className="group-hover:shadow-glow transition-all">
                  View Dashboard
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Discover Platform Section */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover 
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real presence. Real partnership.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
              Our platform puts support where it counts: directly in your wallet with every resale. We help you mint your art, grow your collector base, and unlock royalty income when your work appreciates in value.
            </p>
          </div>
          
          <div className="text-center mb-12">
            <Button variant="hero" size="lg">
              I'm Interested
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-foreground">1</span>
              </div>
              <h3 className="font-semibold mb-2">Digital Art</h3>
              <p className="text-sm text-muted-foreground">NFT marketplace integration</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-foreground">2</span>
              </div>
              <h3 className="font-semibold mb-2">Photography</h3>
              <p className="text-sm text-muted-foreground">Professional photo licensing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-foreground">3</span>
              </div>
              <h3 className="font-semibold mb-2">Music & Audio</h3>
              <p className="text-sm text-muted-foreground">Royalty tracking for creators</p>
            
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-foreground">4</span>
              </div>
              <h3 className="font-semibold mb-2">Global</h3>
              <p className="text-sm text-muted-foreground">Sell to collectors worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From our creators
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="glass p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">SA</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    "Working with ArtRoyalty has been more than a platform — it's been a shared mission to empower creators. The automatic royalty system gives us confidence that artists now have a true home and support system."
                  </p>
                  <div>
                    <p className="font-semibold text-sm">Sarah Anderson</p>
                    <p className="text-xs text-muted-foreground">Digital Artist</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">MJ</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    "The platform's approach to royalty enforcement has helped us gain recognition and secure considerable funding. It's been more than a marketplace - the support has been really impressive!"
                  </p>
                  <div>
                    <p className="font-semibold text-sm">Marcus Johnson</p>
                    <p className="text-xs text-muted-foreground">NFT Creator</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">LC</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    "Our experience with ArtRoyalty has been truly amazing. Their commitment to helping us reach new heights has enabled us to expand our reach globally."
                  </p>
                  <div>
                    <p className="font-semibold text-sm">Luna Chen</p>
                    <p className="text-xs text-muted-foreground">3D Artist</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ArtRoyalty Fund Section */}
      {/* <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Backing Creators Where it Counts
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our fund focuses on digital art, NFTs, and creative projects where innovation is strong and adoption is growing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="glass p-6 text-center">
              <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-3">Seed Capital</h3>
              <p className="text-muted-foreground text-sm">
                Access up to $250K to reach product–market fit, sharpen your vision, and build momentum.
              </p>
            </Card>

            <Card className="glass p-6 text-center">
              <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-3">Selective Portfolio</h3>
              <p className="text-muted-foreground text-sm">
                We back a focused group of creators, so every project gets the attention it deserves.
              </p>
            </Card>

            <Card className="glass p-6 text-center">
              <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-3">Hands-On Advisory</h3>
              <p className="text-muted-foreground text-sm">
                Tailored guidance to help you prepare for collectors, price smart, and scale sustainably.
              </p>
            </Card>

            <Card className="glass p-6 text-center">
              <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-3">Global Networks</h3>
              <p className="text-muted-foreground text-sm">
                Tap into connections across galleries, collectors, and partners worldwide.
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="hero" size="lg">
              Learn more
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section> */}

      {/* Blockchain Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build Where Adoption Is Real
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="glass p-8">
              <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4">Built for Real-World Use</h3>
              <p className="text-muted-foreground">
                ArtRoyalty Chain is designed for fast, low-cost transactions and integrated marketplace access. That means your art is accessible, affordable, and ready to scale in fast-moving digital economies.
              </p>
            </Card>

            <Card className="glass p-8">
              <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4">Secured by Ethereum</h3>
              <p className="text-muted-foreground">
                As part of the Lisk ecosystem, ArtRoyalty settles directly on Ethereum for unmatched security. It's fully EVM-compatible, so you can deploy instantly and tap into the entire Ethereum ecosystem.
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="hero" size="lg">
              Learn More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Media Section */}
      {/* <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              In the Media
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-4xl mx-auto items-center opacity-60">
            <div className="text-center">
              <div className="text-lg font-bold">TechCrunch</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">Forbes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">Wired</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">The Verge</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">Decrypt</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Final CTA Section */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Launch?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Deploy your art on Creators Dome today and become part of the ecosystem.
          </p>
          <Button variant="hero" size="lg">
            Let's Go
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="font-bold text-xl  bg-clip-text">
                Creators Dome
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Code Ignites. People Transform.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </Button>
              </div>
            </div>
            

            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-smooth">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Portal</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-smooth">Terms and Conditions</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Ecosystem Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 Creators Dome
            </div>
            <div className="text-sm text-muted-foreground">
              Made with ❤️ for creators
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;


