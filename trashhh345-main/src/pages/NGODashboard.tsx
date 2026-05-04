import { useState, useEffect } from 'react';
import { Heart, Users, TrendingUp, Package } from 'lucide-react';
import { User, WasteListing } from '../types';
import { MapView } from '../components/map/MapView';
import { PinDetailCard } from '../components/map/PinDetailCard';
import { listingService } from '../services/api';
import { doesListingMatchNGO } from '../utils/ngo-causes';

interface NGODashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export function NGODashboard({ user, onNavigate }: NGODashboardProps) {
  const [availableListings, setAvailableListings] = useState<WasteListing[]>([]);
  const [relevantListings, setRelevantListings] = useState<WasteListing[]>([]);
  const [selectedListing, setSelectedListing] = useState<WasteListing | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (user.cause || user.ngoCause) {
      const filtered = availableListings.filter((listing) => {
        const cause = user.cause || user.ngoCause;
        const materials = listing.materials.map((m) => m.type);
        return doesListingMatchNGO(materials, cause!, user.ngoMaterials);
      });
      setRelevantListings(filtered);
    } else {
      setRelevantListings(availableListings);
    }
  }, [availableListings, user.cause, user.ngoCause, user.ngoMaterials]);

  const loadData = async () => {
    try {
      const listings = await listingService.getAvailable();
      setAvailableListings(listings);
    } catch (error) {
      console.error('Failed to load listings:', error);
    }
  };

  const handlePinClick = (type: 'listing' | 'vendor' | 'ngo', id: string) => {
    if (type === 'listing') {
      const listing = relevantListings.find((l) => l.id === id);
      if (listing) setSelectedListing(listing);
    }
  };

  const handleRequestPickup = async () => {
    if (selectedListing) {
      try {
        await listingService.updateStatus(selectedListing.id, 'matched');
        setSelectedListing(null);
        loadData();
      } catch (error) {
        console.error('Failed to request pickup:', error);
      }
    }
  };

  const impactStats = user.impactStats || {
    itemsCollected: 0,
    beneficiariesHelped: 0,
    partnersWorkedWith: 0,
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-sm text-muted-foreground capitalize">
              {user.cause || user.ngoCause} Cause • {relevantListings.length} relevant listings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-sm font-semibold capitalize">
              {user.cause || user.ngoCause}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 relative">
          <MapView
            center={user.coordinates || { lat: 28.6139, lng: 77.2090 }}
            zoom={12}
            listings={relevantListings}
            onPinClick={handlePinClick}
            currentUserRole="ngo"
          />

          {selectedListing && (
            <div className="absolute top-6 right-6 z-[1000] max-w-md">
              <PinDetailCard
                type="listing"
                data={selectedListing}
                currentUserRole="ngo"
                onClose={() => setSelectedListing(null)}
                onAction={handleRequestPickup}
              />
            </div>
          )}
        </div>

        <div className="w-80 bg-white border-l border-border p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5" />
                <h3 className="font-semibold">Our Cause</h3>
              </div>
              <p className="text-sm mb-4 opacity-90 capitalize">{user.cause || user.ngoCause}</p>
              <div className="flex flex-wrap gap-2">
                {user.ngoMaterials?.map((material) => (
                  <span
                    key={material}
                    className="px-2 py-1 bg-white/20 rounded text-xs capitalize"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Impact Metrics</h3>
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-muted-foreground">Items Collected</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">
                    {impactStats.itemsCollected.toLocaleString()}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-muted-foreground">Beneficiaries</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">
                    {impactStats.beneficiariesHelped.toLocaleString()}
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-muted-foreground">Partners</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-700">
                    {impactStats.partnersWorkedWith}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Available Listings</h3>
              <div className="space-y-3">
                {relevantListings.slice(0, 3).map((listing) => (
                  <button
                    key={listing.id}
                    onClick={() => setSelectedListing(listing)}
                    className="w-full p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors text-left"
                  >
                    <div className="flex flex-wrap gap-1 mb-2">
                      {listing.materials.slice(0, 2).map((material, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded capitalize"
                        >
                          {material.type}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{listing.location}</p>
                  </button>
                ))}

                {relevantListings.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No relevant listings</p>
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
