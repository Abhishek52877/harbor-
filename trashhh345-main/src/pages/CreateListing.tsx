import { useState } from 'react';
import { ArrowLeft, MapPin, Package } from 'lucide-react';
import { WasteMaterial } from '../types';
import { listingService } from '../services/api';
import { MultiMaterialInput } from '../components/listings/MultiMaterialInput';
import { Button } from '../components/ui/button';
import { authService } from '../services/api';

interface CreateListingProps {
  onNavigate: (page: string) => void;
  onSuccess: () => void;
}

const MATERIAL_PRICES: Record<string, number> = {
  plastic: 30,
  'e-waste': 240,
  metal: 50,
  paper: 15,
  glass: 20,
  organic: 10,
  books: 20,
  textiles: 25,
  batteries: 100,
  medical: 150,
};

export function CreateListing({ onNavigate, onSuccess }: CreateListingProps) {
  const [materials, setMaterials] = useState<WasteMaterial[]>([
    { type: 'plastic', quantity: 1, unit: 'kg' },
  ]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateEstimatedValue = () => {
    return materials.reduce((total, material) => {
      const pricePerUnit = MATERIAL_PRICES[material.type] || 0;
      return total + pricePerUnit * material.quantity;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (materials.length === 0) {
      alert('Please add at least one material');
      return;
    }

    if (!location.trim()) {
      alert('Please enter a pickup location');
      return;
    }

    setLoading(true);

    try {
      const currentUser = authService.getCurrentUser();

      await listingService.create({
        materials,
        description,
        location,
        coordinates: currentUser?.coordinates || { lat: 28.6139, lng: 77.2090 },
        estimatedValue: calculateEstimatedValue(),
      });

      onSuccess();
      onNavigate('dashboard');
    } catch (error) {
      console.error('Failed to create listing:', error);
      alert('Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const estimatedValue = calculateEstimatedValue();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => onNavigate('dashboard')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Waste Listing</h1>
        <p className="text-muted-foreground">Add multiple materials and get picked up</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg border border-border p-6 space-y-6">
          <MultiMaterialInput materials={materials} onChange={setMaterials} />

          <div>
            <label className="font-semibold mb-2 block">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any additional details about the condition, packaging, etc."
              className="w-full px-4 py-3 border border-border rounded-lg bg-background min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="font-semibold mb-2 block flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Pickup Location
            </label>
            <textarea
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your complete address with landmark"
              className="w-full px-4 py-3 border border-border rounded-lg bg-background min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Listing Summary</h3>
            <Package className="w-5 h-5 text-primary" />
          </div>

          <div className="space-y-2 mb-4">
            {materials.map((material, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-muted-foreground capitalize">
                  {material.quantity} {material.unit} {material.type}
                </span>
                <span className="font-semibold">
                  ₹{((MATERIAL_PRICES[material.type] || 0) * material.quantity).toFixed(0)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-primary/20 pt-4 flex items-center justify-between">
            <span className="font-semibold">Estimated Value</span>
            <span className="text-3xl font-bold text-primary">₹{estimatedValue.toFixed(0)}</span>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          <Package className="w-5 h-5 mr-2" />
          {loading ? 'Creating Listing...' : 'Create Listing'}
        </Button>
      </form>
    </div>
  );
}
