import { useEffect, useState } from 'react';
import { StatCard } from '../components/features/StatCard';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Users, Package, DollarSign, TrendingUp, CheckCircle, X } from 'lucide-react';
import { WasteListing, Transaction } from '../types';
import { listingService, transactionService } from '../services/api';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [listings, setListings] = useState<WasteListing[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [allListings, allTransactions] = await Promise.all([
        listingService.getAll(),
        transactionService.getAll()
      ]);
      setListings(allListings);
      setTransactions(allTransactions);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Loading admin panel...</div>
      </div>
    );
  }

  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  const completedListings = listings.filter(l => l.status === 'completed').length;
  const totalWaste = listings.reduce((sum, l) => {
    const listingTotal = l.materials.reduce((matSum, mat) => matSum + mat.quantity, 0);
    return sum + listingTotal;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Users"
          value="10,234"
          icon={<Users className="w-6 h-6" />}
          trend="+12% this month"
          trendUp={true}
          color="#0066FF"
        />
        <StatCard
          title="Total Listings"
          value={listings.length}
          icon={<Package className="w-6 h-6" />}
          trend="+8% this week"
          trendUp={true}
          color="#10B981"
        />
        <StatCard
          title="Platform Revenue"
          value={`₹${(totalRevenue * 0.05).toFixed(0)}`}
          icon={<DollarSign className="w-6 h-6" />}
          trend="+15% this month"
          trendUp={true}
          color="#8B5CF6"
        />
        <StatCard
          title="Waste Processed"
          value={`${totalWaste} kg`}
          icon={<TrendingUp className="w-6 h-6" />}
          color="#F59E0B"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Listings</h2>
            <Badge variant="info">{listings.length} total</Badge>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {listings.slice(0, 10).map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="font-medium capitalize truncate">
                    {listing.materials.map(m => m.type).join(', ')}
                  </p>
                  <p className="text-sm text-muted-foreground">{listing.userName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">₹{listing.estimatedValue || 0}</p>
                    <p className="text-xs text-muted-foreground">
                      {listing.materials.map(m => `${m.quantity}${m.unit}`).join(', ')}
                    </p>
                  </div>
                  <Badge
                    variant={
                      listing.status === 'completed'
                        ? 'success'
                        : listing.status === 'matched'
                        ? 'warning'
                        : 'info'
                    }
                    className="capitalize"
                  >
                    {listing.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <Badge variant="success">{transactions.filter(t => t.status === 'completed').length} completed</Badge>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {transactions.slice(0, 10).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium">₹{transaction.amount}</p>
                  <Badge
                    variant={
                      transaction.status === 'completed'
                        ? 'success'
                        : transaction.status === 'pending'
                        ? 'warning'
                        : 'default'
                    }
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-semibold mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {['plastic', 'e-waste', 'metal', 'paper', 'glass'].map((category) => {
              const count = listings.filter(l =>
                l.materials.some(m => m.type === category)
              ).length;
              const percentage = listings.length > 0 ? (count / listings.length) * 100 : 0;
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="capitalize">{category}</span>
                    <span className="text-muted-foreground">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-[#0066FF] rounded-full h-2"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Platform Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm">System Status</span>
              </div>
              <Badge variant="success">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Success Rate</span>
              </div>
              <span className="font-medium">94%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm">Active Users</span>
              </div>
              <span className="font-medium">8.2K</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Package className="w-4 h-4 mr-2" />
              Review Listings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              Approve Payments
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
