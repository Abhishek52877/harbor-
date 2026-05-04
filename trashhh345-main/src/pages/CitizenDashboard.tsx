import { useState, useEffect } from 'react';
import { Plus, DollarSign, Package, Leaf } from 'lucide-react';
import { User, WasteListing } from '../types';
import { MapView } from '../components/map/MapView';
import { PinDetailCard } from '../components/map/PinDetailCard';
import { Button } from '../components/ui/button';
import { mockUsers } from '../services/mockData';
import { listingService, statsService } from '../services/api';

interface CitizenDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export function CitizenDashboard({ user, onNavigate }: CitizenDashboardProps) {
  const [selectedPin, setSelectedPin] = useState<{ type: 'vendor' | 'ngo'; id: string } | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [myListings, setMyListings] = useState<WasteListing[]>([]);

  useEffect(() => {
    statsService.getUserStats(user.id).then(setStats);
    listingService.getAll(user.id).then(setMyListings);
  }, [user.id]);

  const vendors = Object.values(mockUsers).filter((u) => u.role === 'recycler');
  const ngos = Object.values(mockUsers).filter((u) => u.role === 'ngo');

  const handlePinClick = (type: 'listing' | 'vendor' | 'ngo', id: string) => {
    if (type === 'vendor' || type === 'ngo') {
      setSelectedPin({ type, id });
    }
  };

  const handleAction = () => {
    onNavigate('create-listing');
    setSelectedPin(null);
  };

  const selectedData = selectedPin
    ? selectedPin.type === 'vendor'
      ? vendors.find((v) => v.id === selectedPin.id)
      : ngos.find((n) => n.id === selectedPin.id)
    : null;

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
            <p className="text-sm text-muted-foreground">Find vendors and NGOs to sell or donate your waste</p>
          </div>
          <Button onClick={() => onNavigate('create-listing')} className="gap-2">
            <Plus className="w-5 h-5" />
            Create Listing
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 relative">
          <MapView
            center={user.coordinates || { lat: 28.6139, lng: 77.2090 }}
            zoom={13}
            vendors={vendors}
            ngos={ngos}
            onPinClick={handlePinClick}
            currentUserRole="citizen"
          />

          {selectedPin && selectedData && (
            <div className="absolute top-6 right-6 z-[1000] max-w-md">
              <PinDetailCard
                type={selectedPin.type}
                data={selectedData}
                currentUserRole="citizen"
                onClose={() => setSelectedPin(null)}
                onAction={handleAction}
              />
            </div>
          )}
        </div>

        <div className="w-80 bg-white border-l border-border p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-muted-foreground">Total Earnings</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">₹{stats?.totalEarnings || 0}</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-muted-foreground">Active Listings</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">{stats?.activeListings || 0}</p>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Leaf className="w-5 h-5 text-amber-600" />
                    <span className="text-sm text-muted-foreground">CO₂ Saved</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-700">{stats?.co2Saved || 0} kg</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Recent Listings</h3>
              <div className="space-y-3">
                {myListings.slice(0, 3).map((listing) => (
                  <div key={listing.id} className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex flex-wrap gap-1">
                        {listing.materials.slice(0, 2).map((material, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                          >
                            {material.type}
                          </span>
                        ))}
                        {listing.materials.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                            +{listing.materials.length - 2}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          listing.status === 'created'
                            ? 'bg-green-100 text-green-700'
                            : listing.status === 'matched'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {listing.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
                    {listing.estimatedValue && (
                      <p className="text-sm font-semibold text-primary mt-2">₹{listing.estimatedValue}</p>
                    )}
                  </div>
                ))}

                {myListings.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No listings yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
