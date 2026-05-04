import { X, Star, MapPin, CheckCircle2, Package } from 'lucide-react';
import { User, WasteListing } from '../../types';
import { Button } from '../ui/button';

interface PinDetailCardProps {
  type: 'listing' | 'vendor' | 'ngo';
  data: WasteListing | User;
  currentUserRole?: string;
  onClose: () => void;
  onAction?: () => void;
}

export function PinDetailCard({ type, data, currentUserRole, onClose, onAction }: PinDetailCardProps) {
  const renderListingCard = (listing: WasteListing) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{listing.userName}</h3>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
              Listing
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-1">
            <MapPin className="w-4 h-4" />
            <span>{listing.location}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      {listing.images && listing.images.length > 0 && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={listing.images[0]}
            alt="Waste"
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      <div className="space-y-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Materials
          </h4>
          <div className="flex flex-wrap gap-2">
            {listing.materials.map((material, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm"
              >
                {material.quantity} {material.unit} {material.type}
              </div>
            ))}
          </div>
        </div>

        {listing.description && (
          <div>
            <h4 className="text-sm font-semibold mb-1">Description</h4>
            <p className="text-sm text-muted-foreground">{listing.description}</p>
          </div>
        )}

        {listing.estimatedValue && (
          <div>
            <h4 className="text-sm font-semibold mb-1">Estimated Value</h4>
            <p className="text-lg font-bold text-primary">₹{listing.estimatedValue}</p>
          </div>
        )}
      </div>

      {currentUserRole === 'recycler' && listing.status === 'created' && (
        <Button onClick={onAction} className="w-full bg-primary hover:bg-primary/90">
          Accept Pickup
        </Button>
      )}
      {currentUserRole === 'ngo' && listing.status === 'created' && (
        <Button onClick={onAction} className="w-full bg-amber-500 hover:bg-amber-600">
          Request for Cause
        </Button>
      )}
    </div>
  );

  const renderVendorCard = (vendor: User) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{vendor.businessName || vendor.name}</h3>
            {vendor.verified && (
              <CheckCircle2 className="w-5 h-5 text-primary" />
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            {vendor.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{vendor.rating.toFixed(1)}</span>
              </div>
            )}
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
              Recycler
            </span>
          </div>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      {vendor.businessDescription && (
        <p className="text-sm text-muted-foreground mb-4">{vendor.businessDescription}</p>
      )}

      <div className="space-y-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Accepted Materials</h4>
          <div className="flex flex-wrap gap-2">
            {vendor.acceptedMaterials?.map((material) => (
              <span
                key={material}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm capitalize"
              >
                {material}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <MapPin className="w-4 h-4" />
          <span>{vendor.location || 'Location available on contact'}</span>
        </div>
      </div>

      {currentUserRole === 'citizen' && (
        <Button onClick={onAction} className="w-full bg-primary hover:bg-primary/90">
          Sell Now
        </Button>
      )}
    </div>
  );

  const renderNGOCard = (ngo: User) => (
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{ngo.name}</h3>
            {ngo.verified && (
              <CheckCircle2 className="w-5 h-5 text-primary" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full capitalize">
              {ngo.cause || ngo.ngoCause || 'Community'}
            </span>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
              NGO
            </span>
          </div>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Focus Materials</h4>
          <div className="flex flex-wrap gap-2">
            {ngo.ngoMaterials?.map((material) => (
              <span
                key={material}
                className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm capitalize"
              >
                {material}
              </span>
            ))}
          </div>
        </div>

        {ngo.impactStats && (
          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">Impact</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-amber-700">
                  {ngo.impactStats.itemsCollected}
                </p>
                <p className="text-xs text-muted-foreground">Items Collected</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-700">
                  {ngo.impactStats.beneficiariesHelped}
                </p>
                <p className="text-xs text-muted-foreground">Beneficiaries</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-700">
                  {ngo.impactStats.partnersWorkedWith}
                </p>
                <p className="text-xs text-muted-foreground">Partners</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <MapPin className="w-4 h-4" />
          <span>{ngo.location || 'Multiple locations'}</span>
        </div>
      </div>

      {currentUserRole === 'citizen' && (
        <Button onClick={onAction} className="w-full bg-amber-500 hover:bg-amber-600">
          Donate to Cause
        </Button>
      )}
    </div>
  );

  if (type === 'listing') {
    return renderListingCard(data as WasteListing);
  } else if (type === 'vendor') {
    return renderVendorCard(data as User);
  } else {
    return renderNGOCard(data as User);
  }
}
