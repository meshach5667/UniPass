import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

/**
 * ENTERPRISE DASHBOARD
 * 
 * This is the B2B interface for event organizers, gym owners, and enterprise customers.
 * Features:
 * - Real-time sales analytics
 * - Fraud detection & suspicious activity alerts
 * - Member management & tier controls
 * - Revenue tracking & payouts
 * - API integration management
 * - White-label customization
 */

const EnterpriseDashboard = () => {
  const [organizationId] = useState('org_sample_123');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data - replace with API calls
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 125400,
    totalSales: 2540,
    totalMembers: 1850,
    fraudCases: 12,
    monthlyRevenue: [
      { month: 'Jan', revenue: 45000, sales: 900 },
      { month: 'Feb', revenue: 52000, sales: 1040 },
      { month: 'Mar', revenue: 58000, sales: 1160 },
      { month: 'Apr', revenue: 62000, sales: 1240 },
      { month: 'May', revenue: 70000, sales: 1400 },
      { month: 'Jun', revenue: 125400, sales: 2540 },
    ],
    membersByTier: [
      { tier: 'Basic', members: 900, fill: '#3b82f6' },
      { tier: 'Premium', members: 600, fill: '#10b981' },
      { tier: 'VIP', members: 350, fill: '#f59e0b' },
    ],
    topProducts: [
      { name: 'Concert Tickets', sales: 840, revenue: 42000 },
      { name: 'VIP Experience Pass', sales: 320, revenue: 32000 },
      { name: 'Annual Membership', sales: 450, revenue: 31500 },
      { name: 'Merchandise Bundle', sales: 930, revenue: 19900 },
    ]
  });

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Enterprise Dashboard</h1>
          <p className="text-slate-400">Manage memberships, track revenue, and monitor fraud</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${dashboardData.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-400 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboardData.totalSales.toLocaleString()}</div>
              <p className="text-xs text-green-400 mt-1">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Active Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{dashboardData.totalMembers.toLocaleString()}</div>
              <p className="text-xs text-green-400 mt-1">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Fraud Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">{dashboardData.fraudCases}</div>
              <p className="text-xs text-red-400 mt-1">-40% blocked this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-slate-900 border border-slate-700 rounded-lg">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-b border-slate-700">
            <TabsTrigger value="overview" className="text-slate-300">Overview</TabsTrigger>
            <TabsTrigger value="members" className="text-slate-300">Members</TabsTrigger>
            <TabsTrigger value="fraud" className="text-slate-300">Fraud Detection</TabsTrigger>
            <TabsTrigger value="api" className="text-slate-300">API & Integration</TabsTrigger>
            <TabsTrigger value="settings" className="text-slate-300">Settings</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Trend</CardTitle>
                  <CardDescription className="text-slate-400">Last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData.monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Members by Tier */}
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Members by Tier</CardTitle>
                  <CardDescription className="text-slate-400">Current distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={dashboardData.membersByTier} dataKey="members" cx="50%" cy="50%" outerRadius={100}>
                        {dashboardData.membersByTier.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Products */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Top Products</CardTitle>
                <CardDescription className="text-slate-400">Best performing offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dashboardData.topProducts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MEMBERS TAB */}
          <TabsContent value="members" className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Member Management</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">+ Invite Members</Button>
              </div>
              
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-600">
                      <tr className="text-slate-400">
                        <th className="text-left py-2">Member ID</th>
                        <th className="text-left py-2">Tier</th>
                        <th className="text-left py-2">Expires</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      <tr className="border-b border-slate-700">
                        <td className="py-3">0x8B3F...</td>
                        <td><span className="bg-blue-900 text-blue-200 px-2 py-1 rounded">Premium</span></td>
                        <td>2025-03-15</td>
                        <td><span className="text-green-400">Active</span></td>
                        <td><Button variant="ghost" size="sm">Edit</Button></td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FRAUD DETECTION TAB */}
          <TabsContent value="fraud" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Fraud Detection & Alerts</h3>
              
              <Card className="bg-red-950 border-red-900">
                <CardHeader>
                  <CardTitle className="text-red-200">Suspicious Activity</CardTitle>
                </CardHeader>
                <CardContent className="text-red-100">
                  <p>🚨 <strong>12 cases detected</strong> this month (40% decrease)</p>
                  <p className="text-sm mt-2">AI is monitoring:</p>
                  <ul className="list-disc ml-6 mt-2 text-sm">
                    <li>Duplicate token verification attempts</li>
                    <li>Rapid ticket transfers (wash trading)</li>
                    <li>Geographic impossibilities (teleportation)</li>
                    <li>Unusual transaction patterns</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Blocks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex justify-between p-2 bg-slate-700 rounded">
                      <span>0x2F9B... (duplicate verification)</span>
                      <span className="text-red-400">Blocked</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-700 rounded">
                      <span>0xA41F... (geographic flag)</span>
                      <span className="text-red-400">Manual review</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* API TAB */}
          <TabsContent value="api" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">API Integration</h3>
              
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Your API Key</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 p-3 rounded font-mono text-sm text-slate-300 break-all">
                    unipass_live_abc123def456xyz789
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">Copy Key</Button>
                  <Button variant="outline" size="sm" className="mt-2 ml-2">Regenerate</Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-sm">API Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-slate-400">Endpoints:</p>
                  <code className="block bg-slate-900 p-2 rounded text-xs text-yellow-300">
                    GET /api/v1/memberships/:tokenId
                  </code>
                  <code className="block bg-slate-900 p-2 rounded text-xs text-yellow-300">
                    POST /api/v1/verify-access
                  </code>
                  <code className="block bg-slate-900 p-2 rounded text-xs text-yellow-300">
                    GET /api/v1/analytics/dashboard
                  </code>
                  <Button className="mt-4 bg-blue-600">View Full Docs</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Organization Settings</h3>
              
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Platform Fee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">Current: <strong>2.5%</strong></p>
                  <p className="text-sm text-slate-400">Enterprise customers: Custom rates available</p>
                  <Button className="mt-4 bg-blue-600">Request Custom Rate</Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-sm">White-Label Customization</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="bg-blue-600">Configure Branding</Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Payout Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">Wallet: <strong>0x7B2F...</strong></p>
                  <p className="text-sm text-slate-400">Monthly automatic payouts enabled</p>
                  <Button className="mt-4">Update Wallet</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;
