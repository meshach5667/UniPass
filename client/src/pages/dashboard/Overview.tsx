import { Card } from "@/components/ui/card";
import { TrendingUp, Image, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const earningsData = [
  { date: "Jan", earnings: 0.5 },
  { date: "Feb", earnings: 1.2 },
  { date: "Mar", earnings: 0.8 },
  { date: "Apr", earnings: 2.1 },
  { date: "May", earnings: 1.5 },
  { date: "Jun", earnings: 1.3 },
];

const recentPayments = [
  { artwork: "Sunset #42", amount: "0.5 LSK", from: "0x7a3f...bd2c", date: "2 hrs ago" },
  { artwork: "Abstract 7", amount: "0.8 LSK", from: "0x3f21...8e1a", date: "1 day ago" },
  { artwork: "Digital Dreams", amount: "0.3 LSK", from: "0x9c4d...2f7b", date: "3 days ago" },
];

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(263.4, 70%, 62%)",
  },
};

const Overview = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Overview</h1>
        <p className="text-muted-foreground">Track your royalty earnings and artwork performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass p-6 hover:shadow-glow transition-smooth">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Earned</p>
              <p className="text-2xl font-bold">5.2 LSK</p>
            </div>
          </div>
        </Card>

        <Card className="glass p-6 hover:shadow-glow transition-smooth">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">1.3 LSK</p>
            </div>
          </div>
        </Card>

        <Card className="glass p-6 hover:shadow-glow transition-smooth">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <Image className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Artworks</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card className="glass p-6">
        <h2 className="text-xl font-bold mb-6">Earnings Over Time</h2>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217.2, 32.6%, 15%)" />
              <XAxis dataKey="date" stroke="hsl(215, 20.2%, 65.1%)" />
              <YAxis stroke="hsl(215, 20.2%, 65.1%)" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="hsl(263.4, 70%, 62%)" 
                strokeWidth={2}
                dot={{ fill: "hsl(263.4, 70%, 62%)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Recent Payments */}
      <Card className="glass p-6">
        <h2 className="text-xl font-bold mb-6">Recent Royalty Payments</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Artwork</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">From</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-smooth">
                  <td className="py-4 px-4 font-medium">{payment.artwork}</td>
                  <td className="py-4 px-4 text-primary font-bold">{payment.amount}</td>
                  <td className="py-4 px-4 text-muted-foreground font-mono text-sm">{payment.from}</td>
                  <td className="py-4 px-4 text-muted-foreground">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Overview;
