"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageContainer } from '@/components/layout/PageContainer';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState('30d');

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 4000, subscriptions: 120, churn: 5 },
    { month: 'Feb', revenue: 5200, subscriptions: 150, churn: 3 },
    { month: 'Mar', revenue: 6800, subscriptions: 180, churn: 4 },
    { month: 'Apr', revenue: 8100, subscriptions: 220, churn: 2 },
    { month: 'May', revenue: 9500, subscriptions: 280, churn: 6 },
    { month: 'Jun', revenue: 11200, subscriptions: 320, churn: 4 },
    { month: 'Jul', revenue: 13800, subscriptions: 380, churn: 3 },
    { month: 'Aug', revenue: 15600, subscriptions: 420, churn: 5 },
    { month: 'Sep', revenue: 17200, subscriptions: 460, churn: 4 },
    { month: 'Oct', revenue: 19800, subscriptions: 520, churn: 7 },
    { month: 'Nov', revenue: 22400, subscriptions: 580, churn: 3 },
    { month: 'Dec', revenue: 25200, subscriptions: 640, churn: 2 }
  ];

  const planDistribution = [
    { name: 'Basic', value: 45, color: '#3B82F6' },
    { name: 'Pro', value: 35, color: '#8B5CF6' },
    { name: 'Enterprise', value: 20, color: '#10B981' }
  ];

  const customerGrowth = [
    { date: '2024-01', new: 45, churned: 5, net: 40 },
    { date: '2024-02', new: 52, churned: 8, net: 44 },
    { date: '2024-03', new: 48, churned: 6, net: 42 },
    { date: '2024-04', new: 65, churned: 4, net: 61 },
    { date: '2024-05', new: 58, churned: 9, net: 49 },
    { date: '2024-06', new: 72, churned: 7, net: 65 }
  ];

  const topCustomers = [
    { id: 1, name: 'Acme Corp', plan: 'Enterprise', mrr: 499, growth: '+12%' },
    { id: 2, name: 'TechStart Inc', plan: 'Pro', mrr: 199, growth: '+8%' },
    { id: 3, name: 'Digital Solutions', plan: 'Enterprise', mrr: 499, growth: '+15%' },
    { id: 4, name: 'Innovation Labs', plan: 'Pro', mrr: 199, growth: '+5%' },
    { id: 5, name: 'Future Systems', plan: 'Basic', mrr: 99, growth: '+3%' }
  ];

  const recentActivity = [
    { id: 1, type: 'payment', message: 'Payment received from Acme Corp', amount: '$499', time: '2 hours ago' },
    { id: 2, type: 'signup', message: 'New customer signed up', amount: '+1', time: '4 hours ago' },
    { id: 3, type: 'upgrade', message: 'TechStart Inc upgraded to Pro plan', amount: '+$100', time: '6 hours ago' },
    { id: 4, type: 'churn', message: 'Customer cancelled subscription', amount: '-$99', time: '8 hours ago' },
    { id: 5, type: 'payment', message: 'Payment received from Digital Solutions', amount: '$499', time: '1 day ago' }
  ];

  const kpiData = {
    totalRevenue: 285600,
    totalCustomers: 1420,
    monthlyGrowth: 12.5,
    churnRate: 3.2,
    averageRevenuePerUser: 201.13,
    lifetimeValue: 2412
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'payment': return '💰';
      case 'signup': return '👤';
      case 'upgrade': return '⬆️';
      case 'churn': return '📉';
      default: return '📊';
    }
  };

  return (
    <PageContainer
      title="Analytics Dashboard"
      description="Overview of your subscription business metrics"
      action={
        <div className="flex items-center space-x-4">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      }
    >
      <div className="space-y-8">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${kpiData.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="success" className="text-xs">+{kpiData.monthlyGrowth}%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.totalCustomers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="primary" className="text-xs">+8.2%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.monthlyGrowth}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-2xl">📈</span>
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="success" className="text-xs">+2.1%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData.churnRate}%</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <span className="text-2xl">📉</span>
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="success" className="text-xs">-0.5%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Revenue/User</p>
                <p className="text-2xl font-bold text-gray-900">${kpiData.averageRevenuePerUser.toFixed(0)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <span className="text-2xl">💵</span>
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="primary" className="text-xs">+3.2%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lifetime Value</p>
                <p className="text-2xl font-bold text-gray-900">${kpiData.lifetimeValue.toFixed(0)}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="primary" className="text-xs">+5.7%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="subscriptions" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Active Subscriptions"
                />
                <Line 
                  type="monotone" 
                  dataKey="churn" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Churned"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="new" fill="#10B981" name="New Customers" />
                <Bar dataKey="churned" fill="#EF4444" name="Churned" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.plan}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${customer.mrr}/mo</div>
                    <div className="text-sm text-green-600">{customer.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <p className="font-medium">{activity.message}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <div className={`font-semibold ${activity.amount.includes('+') ? 'text-green-600' : activity.amount.includes('-') ? 'text-red-600' : 'text-gray-900'}`}>
                  {activity.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </PageContainer>
  );
}