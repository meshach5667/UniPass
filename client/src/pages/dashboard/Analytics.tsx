import { Card } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const topArtworks = [
  { name: "Sunset #42", earnings: 2.1 },
  { name: "Abstract 7", earnings: 1.8 },
  { name: "Digital Dreams", earnings: 1.3 },
  { name: "Neon City", earnings: 0.9 },
  { name: "Ocean Waves", earnings: 0.6 },
];

const royaltyRates = [
  { name: "10%", value: 8 },
  { name: "15%", value: 3 },
  { name: "20%", value: 1 },
];

const COLORS = ["hsl(263.4, 70%, 62%)", "hsl(217.2, 91.2%, 59.8%)", "hsl(142.1, 76.2%, 36.3%)"];

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(263.4, 70%, 62%)",
  },
};

const Analytics = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Deep insights into your artwork performance</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="glass p-6">
          <p className="text-sm text-muted-foreground mb-2">Avg Royalty/Sale</p>
          <p className="text-2xl font-bold">0.43 LSK</p>
          <p className="text-xs text-success mt-1">+12% from last month</p>
        </Card>

        <Card className="glass p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Sales</p>
          <p className="text-2xl font-bold">29</p>
          <p className="text-xs text-success mt-1">+5 this month</p>
        </Card>

        <Card className="glass p-6">
          <p className="text-sm text-muted-foreground mb-2">Most Popular</p>
          <p className="text-2xl font-bold">Sunset #42</p>
          <p className="text-xs text-muted-foreground mt-1">7 resales</p>
        </Card>

        <Card className="glass p-6">
          <p className="text-sm text-muted-foreground mb-2">Growth Rate</p>
          <p className="text-2xl font-bold">+24%</p>
          <p className="text-xs text-success mt-1">Month over month</p>
        </Card>
      </div>

      {/* Top Earning Artworks */}
      <Card className="glass p-6">
        <h2 className="text-xl font-bold mb-6">Top Earning Artworks</h2>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topArtworks} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217.2, 32.6%, 15%)" />
              <XAxis type="number" stroke="hsl(215, 20.2%, 65.1%)" />
              <YAxis dataKey="name" type="category" stroke="hsl(215, 20.2%, 65.1%)" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="earnings" fill="hsl(263.4, 70%, 62%)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Royalty Rate Distribution */}
        <Card className="glass p-6">
          <h2 className="text-xl font-bold mb-6">Royalty Rate Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={royaltyRates}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {royaltyRates.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Collectors */}
        <Card className="glass p-6">
          <h2 className="text-xl font-bold mb-6">Top Collectors</h2>
          <div className="space-y-4">
            {[
              { address: "0x7a3f...bd2c", purchases: 5, total: "8.5 LSK" },
              { address: "0x3f21...8e1a", purchases: 3, total: "4.2 LSK" },
              { address: "0x9c4d...2f7b", purchases: 2, total: "3.1 LSK" },
            ].map((collector, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                <div>
                  <p className="font-mono text-sm font-medium">{collector.address}</p>
                  <p className="text-xs text-muted-foreground">{collector.purchases} purchases</p>
                </div>
                <p className="font-bold text-primary">{collector.total}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
