import { WasteListing } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { MapPin, Calendar, Package } from 'lucide-react';

interface ListingCardProps {
  listing: WasteListing;
  onSelect?: (listing: WasteListing) => void;
  showActions?: boolean;
}

const categoryColors: Record<string, string> = {
  plastic: '#FF6B35',
  'e-waste': '#7B68EE',
  metal: '#FFD700',
  paper: '#90EE90',
  glass: '#87CEEB',
  organic: '#8B4513'
};

const statusVariants: Record<string, 'default' | 'success' | 'warning' | 'info'> = {
  created: 'info',
  matched: 'warning',
  picked: 'success',
  completed: 'success'
};

export function ListingCard({ listing, onSelect, showActions = false }: ListingCardProps) {
  const primaryMaterial = listing.materials[0];
  const materialSummary = listing.materials.map(m => `${m.quantity}${m.unit} ${m.type}`).join(', ');

  return (
    <Card hover onClick={() => onSelect?.(listing)}>
      <div className="flex gap-4">
        {listing.images && listing.images.length > 0 && (
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img src={listing.images[0]} alt={primaryMaterial.type} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium mb-1 capitalize">
                {listing.materials.map(m => m.type).join(', ')}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-1">{listing.description}</p>
            </div>
            <Badge variant={statusVariants[listing.status]} className="capitalize">
              {listing.status}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Package className="w-4 h-4" />
              <span className="truncate">{materialSummary}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{listing.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold" style={{ color: categoryColors[primaryMaterial.type] || '#0066FF' }}>
              ₹{listing.estimatedValue || 0}
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(listing.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
