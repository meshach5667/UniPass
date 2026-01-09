import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp } from "lucide-react";

const payments = [
  { date: "2025-09-28", artwork: "Sunset #42", salePrice: "5.0 LSK", royalty: "0.5 LSK", buyer: "0x7a3f...bd2c", txHash: "0xab12...34cd" },
  { date: "2025-09-27", artwork: "Abstract 7", salePrice: "8.0 LSK", royalty: "0.8 LSK", buyer: "0x3f21...8e1a", txHash: "0xef56...78gh" },
  { date: "2025-09-25", artwork: "Digital Dreams", salePrice: "3.0 LSK", royalty: "0.3 LSK", buyer: "0x9c4d...2f7b", txHash: "0xij90...12kl" },
  { date: "2025-09-23", artwork: "Sunset #42", salePrice: "6.0 LSK", royalty: "0.6 LSK", buyer: "0x5e8a...9d3f", txHash: "0xmn34...56op" },
];

const Earnings = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Earnings</h1>
          <p className="text-muted-foreground">Track all your royalty payments</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">All Time</p>
              <p className="text-2xl font-bold">12.5 LSK</p>
            </div>
          </div>
        </Card>

        <Card className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Year</p>
              <p className="text-2xl font-bold">8.2 LSK</p>
            </div>
          </div>
        </Card>

        <Card className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last 30 Days</p>
              <p className="text-2xl font-bold">1.3 LSK</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Payments Table */}
      <Card className="glass p-6">
        <h2 className="text-xl font-bold mb-6">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Artwork</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sale Price</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Royalty</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Buyer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tx Hash</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-smooth">
                  <td className="py-4 px-4 text-muted-foreground">{payment.date}</td>
                  <td className="py-4 px-4 font-medium">{payment.artwork}</td>
                  <td className="py-4 px-4 text-muted-foreground">{payment.salePrice}</td>
                  <td className="py-4 px-4 text-primary font-bold">{payment.royalty}</td>
                  <td className="py-4 px-4 text-muted-foreground font-mono text-sm">{payment.buyer}</td>
                  <td className="py-4 px-4">
                    <a 
                      href={`#${payment.txHash}`}
                      className="text-secondary hover:underline font-mono text-sm"
                    >
                      {payment.txHash}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Earnings;
