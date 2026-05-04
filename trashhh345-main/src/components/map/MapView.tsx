import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { User, WasteListing, Coordinates } from '../../types';

interface MapViewProps {
  center?: Coordinates;
  zoom?: number;
  listings?: WasteListing[];
  vendors?: User[];
  ngos?: User[];
  onPinClick?: (type: 'listing' | 'vendor' | 'ngo', id: string) => void;
  currentUserRole?: string;
}

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createCustomIcon = (color: string) => {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
      <path fill="${color}" stroke="#fff" stroke-width="2" d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 6.56 8.5 17.5 8.5 17.5s8.5-10.94 8.5-17.5C20.5 3.81 16.69 0 12 0z"/>
      <circle fill="#fff" cx="12" cy="8.5" r="3.5"/>
    </svg>
  `;

  return L.icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
  });
};

const citizenIcon = createCustomIcon('#10b981');
const vendorIcon = createCustomIcon('#3b82f6');
const ngoIcon = createCustomIcon('#f59e0b');

export function MapView({
  center = { lat: 28.6139, lng: 77.2090 },
  zoom = 12,
  listings = [],
  vendors = [],
  ngos = [],
  onPinClick,
  currentUserRole,
}: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(
        [center.lat, center.lng],
        zoom
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add listing markers
    listings.forEach((listing) => {
      const marker = L.marker([listing.coordinates.lat, listing.coordinates.lng], {
        icon: citizenIcon,
      })
        .addTo(mapRef.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold">${listing.userName}</h3>
            <p class="text-sm text-gray-600">
              ${listing.materials.map(m => `${m.quantity} ${m.unit} ${m.type}`).join(', ')}
            </p>
            <p class="text-sm mt-1">${listing.location}</p>
          </div>
        `);

      marker.on('click', () => {
        onPinClick?.('listing', listing.id);
      });

      markersRef.current.push(marker);
    });

    // Add vendor markers
    vendors.filter(v => v.coordinates).forEach((vendor) => {
      const marker = L.marker([vendor.coordinates!.lat, vendor.coordinates!.lng], {
        icon: vendorIcon,
      })
        .addTo(mapRef.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold">${vendor.businessName || vendor.name}</h3>
            ${vendor.verified ? '<span class="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">Verified</span>' : ''}
            <p class="text-sm text-gray-600 mt-1">
              ${vendor.acceptedMaterials?.join(', ') || 'Recycler'}
            </p>
            ${vendor.rating ? `<p class="text-sm mt-1">⭐ ${vendor.rating.toFixed(1)}</p>` : ''}
          </div>
        `);

      marker.on('click', () => {
        onPinClick?.('vendor', vendor.id);
      });

      markersRef.current.push(marker);
    });

    // Add NGO markers
    ngos.filter(n => n.coordinates).forEach((ngo) => {
      const marker = L.marker([ngo.coordinates!.lat, ngo.coordinates!.lng], {
        icon: ngoIcon,
      })
        .addTo(mapRef.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold">${ngo.name}</h3>
            ${ngo.verified ? '<span class="text-xs bg-amber-600 text-white px-2 py-0.5 rounded">Verified</span>' : ''}
            <p class="text-sm text-gray-600">
              Cause: ${ngo.cause || ngo.ngoCause || 'Community'}
            </p>
            <p class="text-xs mt-1">
              ${ngo.ngoMaterials?.join(', ') || 'Various materials'}
            </p>
          </div>
        `);

      marker.on('click', () => {
        onPinClick?.('ngo', ngo.id);
      });

      markersRef.current.push(marker);
    });
  }, [listings, vendors, ngos, onPinClick]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([center.lat, center.lng]);
    }
  }, [center.lat, center.lng]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full rounded-lg" />

      <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 space-y-2 z-[1000]">
        <h4 className="font-semibold text-sm mb-2">Map Legend</h4>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
          <span className="text-xs">Waste Listings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
          <span className="text-xs">Recyclers/Vendors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
          <span className="text-xs">NGOs</span>
        </div>
      </div>
    </div>
  );
}
