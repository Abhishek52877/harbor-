export type UserRole = 'citizen' | 'recycler' | 'ngo' | 'admin';

export type WasteCategory = 'plastic' | 'e-waste' | 'metal' | 'paper' | 'glass' | 'organic' | 'books' | 'textiles' | 'batteries' | 'medical';

export type NGOCause = 'environment' | 'education' | 'health' | 'community';

export type ListingStatus = 'created' | 'matched' | 'picked' | 'completed';

export type PickupStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface WasteMaterial {
  type: WasteCategory;
  quantity: number;
  unit: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  avatar?: string;
  rating?: number;
  verified?: boolean;
  earnings?: number;
  points?: number;
  badge?: string;
  location?: string;
  coordinates?: Coordinates;
  // Vendor/Recycler specific
  businessName?: string;
  acceptedMaterials?: WasteCategory[];
  businessDescription?: string;
  // NGO specific
  cause?: NGOCause;
  ngoCause?: NGOCause;
  ngoMaterials?: WasteCategory[];
  impactStats?: {
    itemsCollected: number;
    beneficiariesHelped: number;
    partnersWorkedWith: number;
  };
}

export interface WasteListing {
  id: string;
  userId: string;
  userName: string;
  materials: WasteMaterial[];  // Multi-material support
  description: string;
  images?: string[];
  location: string;
  coordinates: Coordinates;
  estimatedValue?: number;
  status: ListingStatus;
  createdAt: string;
  matchedWith?: string;
  pickupScheduled?: string;
}

export interface Pickup {
  id: string;
  listingId: string;
  citizenId: string;
  recyclerId: string;
  ngoId: string;
  scheduledTime: string;
  status: PickupStatus;
  address: string;
  otp?: string;
  completedAt?: string;
}

export interface Transaction {
  id: string;
  type: 'earning' | 'payment';
  amount: number;
  userId: string;
  listingId: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  description: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  timestamp: string;
}

export interface Stats {
  totalListings?: number;
  completedPickups?: number;
  totalEarnings?: number;
  wasteRecycled?: number;
  co2Saved?: number;
  activeListings?: number;
  pendingPickups?: number;
}
