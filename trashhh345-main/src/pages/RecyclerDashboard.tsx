import { useState, useEffect } from 'react';
import { Filter, Package, ShoppingCart } from 'lucide-react';
import { User, WasteListing, WasteCategory } from '../types';
import { MapView } from '../components/map/MapView';
import { PinDetailCard } from '../components/map/PinDetailCard';
import { Button } from '../components/ui/button';
import { listingService } from '../services/api';

interface RecyclerDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export function RecyclerDashboard({ user, onNavigate }: RecyclerDashboardProps) {
  const [availableListings, setAvailableListings] = useState<WasteListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<WasteListing[]>([]);
  const [selectedListing, setSelectedListing] = useState<WasteListing | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<WasteCategory | 'all'>('all');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedFilter === 'all') {
      setFilteredListings(availableListings);
    } else {
      setFilteredListings(
        availableListings.filter((listing) =>
          listing.materials.some((m) => m.type === selectedFilter)
        )
      );
    }
  }, [selectedFilter, availableListings]);

  const loadData = async () => {
    try {
      const listings = await listingService.getAvailable();
      setAvailableListings(listings);
      setFilteredListings(listings);
    } catch (error) {
      console.error('Failed to load listings:', error);
    }
  };

  const handlePinClick = (type: 'listing' | 'vendor' | 'ngo', id: string) => {
    if (type === 'listing') {
      const listing = filteredListings.find((l) => l.id === id);
      if (listing) setSelectedListing(listing);
    }
  };

  const handleAcceptPickup = async () => {
    if (selectedListing) {
      try {
        await listingService.updateStatus(selectedListing.id, 'matched');
        setSelectedListing(null);
        loadData();
      } catch (error) {
        console.error('Failed to accept pickup:', error);
      }
    }
  };

  const acceptedMaterials = user.acceptedMaterials || [];

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">{user.businessName || 'Recycler Dashboard'}</h1>
            <p className="text-sm text-muted-foreground">Browse waste listings on the map and accept pickups</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''} available
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 relative">
          <MapView
            center={user.coordinates || { lat: 28.6139, lng: 77.2090 }}
            zoom={12}
            listings={filteredListings}
            onPinClick={handlePinClick}
            currentUserRole="recycler"
          />

          {selectedListing && (
            <div className="absolute top-6 right-6 z-[1000] max-w-md">
              <PinDetailCard
                type="listing"
                data={selectedListing}
                currentUserRole="recycler"
                onClose={() => setSelectedListing(null)}
                onAction={handleAcceptPickup}
              />
            </div>
          )}
        </div>

        <div className="w-80 bg-white border-l border-border p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter by Material
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedFilter === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  All Materials ({availableListings.length})
                </button>
                {acceptedMaterials.map((material) => {
                  const count = availableListings.filter((l) =>
                    l.materials.some((m) => m.type === material)
                  ).length;
                  return (
                    <button
                      key={material}
                      onClick={() => setSelectedFilter(material)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors capitalize ${
                        selectedFilter === material
                          ? 'bg-primary text-white'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {material} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-muted-foreground">Available</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">{filteredListings.length}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-muted-foreground">This Month</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">24</p>
                  <p className="text-xs text-muted-foreground mt-1">Pickups completed</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Accepted Materials</h3>
              <div className="flex flex-wrap gap-2">
                {acceptedMaterials.map((material) => (
                  <span
                    key={material}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm capitalize"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
