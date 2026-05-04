import { User, WasteListing, Pickup, Transaction, Notification } from '../types';

export const mockUsers: Record<string, User> = {
  'citizen-1': {
    id: 'citizen-1',
    name: 'Raj Kumar',
    email: 'raj@example.com',
    role: 'citizen',
    phone: '+91 98765 43210',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raj',
    rating: 4.8,
    verified: true,
    earnings: 12450,
    points: 3400,
    badge: 'Gold Recycler',
    location: 'Connaught Place, Delhi',
    coordinates: { lat: 28.6315, lng: 77.2167 }
  },
  'citizen-2': {
    id: 'citizen-2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'citizen',
    phone: '+91 98765 43215',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    rating: 4.5,
    verified: true,
    earnings: 8200,
    points: 2100,
    location: 'Karol Bagh, Delhi',
    coordinates: { lat: 28.6519, lng: 77.1903 }
  },
  'recycler-1': {
    id: 'recycler-1',
    name: 'EcoRecycle Solutions',
    email: 'contact@ecorecycle.com',
    role: 'recycler',
    phone: '+91 98765 43211',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ER',
    rating: 4.9,
    verified: true,
    location: 'Nehru Place, Delhi',
    coordinates: { lat: 28.5494, lng: 77.2501 },
    businessName: 'EcoRecycle Solutions',
    acceptedMaterials: ['plastic', 'e-waste', 'metal', 'glass'],
    businessDescription: 'Leading e-waste and plastic recycler in Delhi NCR. We offer competitive rates and same-day pickup.'
  },
  'recycler-2': {
    id: 'recycler-2',
    name: 'Green Earth Recyclers',
    email: 'info@greenearth.com',
    role: 'recycler',
    phone: '+91 98765 43216',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GE',
    rating: 4.7,
    verified: true,
    location: 'Lajpat Nagar, Delhi',
    coordinates: { lat: 28.5677, lng: 77.2431 },
    businessName: 'Green Earth Recyclers',
    acceptedMaterials: ['paper', 'books', 'textiles', 'plastic'],
    businessDescription: 'Specializing in paper and textile recycling. Trusted by schools and offices across Delhi.'
  },
  'recycler-3': {
    id: 'recycler-3',
    name: 'Metal & Scrap Co.',
    email: 'contact@metalscrap.com',
    role: 'recycler',
    phone: '+91 98765 43217',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MS',
    rating: 4.8,
    verified: true,
    location: 'Dwarka, Delhi',
    coordinates: { lat: 28.5921, lng: 77.0460 },
    businessName: 'Metal & Scrap Co.',
    acceptedMaterials: ['metal', 'e-waste', 'batteries'],
    businessDescription: 'Premier metal and battery recycler. Best prices for bulk quantities.'
  },
  'ngo-1': {
    id: 'ngo-1',
    name: 'Green Future Foundation',
    email: 'info@greenfuture.org',
    role: 'ngo',
    phone: '+91 98765 43212',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GF',
    verified: true,
    location: 'Saket, Delhi',
    coordinates: { lat: 28.5244, lng: 77.2066 },
    cause: 'environment',
    ngoMaterials: ['plastic', 'e-waste', 'metal', 'glass', 'batteries'],
    impactStats: {
      itemsCollected: 15420,
      beneficiariesHelped: 3200,
      partnersWorkedWith: 45
    }
  },
  'ngo-2': {
    id: 'ngo-2',
    name: 'Knowledge for All',
    email: 'contact@knowledgeforall.org',
    role: 'ngo',
    phone: '+91 98765 43218',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=KA',
    verified: true,
    location: 'Rajouri Garden, Delhi',
    coordinates: { lat: 28.6414, lng: 77.1209 },
    cause: 'education',
    ngoMaterials: ['books', 'paper', 'e-waste'],
    impactStats: {
      itemsCollected: 8900,
      beneficiariesHelped: 5600,
      partnersWorkedWith: 28
    }
  },
  'ngo-3': {
    id: 'ngo-3',
    name: 'Community Care Initiative',
    email: 'hello@communitycare.org',
    role: 'ngo',
    phone: '+91 98765 43219',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CC',
    verified: true,
    location: 'Vasant Kunj, Delhi',
    coordinates: { lat: 28.5226, lng: 77.1580 },
    cause: 'community',
    ngoMaterials: ['textiles', 'books', 'paper', 'plastic'],
    impactStats: {
      itemsCollected: 12300,
      beneficiariesHelped: 7800,
      partnersWorkedWith: 62
    }
  }
};

export const mockListings: WasteListing[] = [
  {
    id: 'listing-1',
    userId: 'citizen-1',
    userName: 'Raj Kumar',
    materials: [
      { type: 'plastic', quantity: 15, unit: 'kg' },
      { type: 'glass', quantity: 8, unit: 'kg' }
    ],
    description: 'Mixed plastic bottles and glass containers from household',
    images: ['https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400'],
    location: 'Connaught Place, Delhi',
    coordinates: { lat: 28.6315, lng: 77.2167 },
    estimatedValue: 580,
    status: 'created',
    createdAt: '2026-05-02T10:30:00Z'
  },
  {
    id: 'listing-2',
    userId: 'citizen-1',
    userName: 'Raj Kumar',
    materials: [
      { type: 'e-waste', quantity: 5, unit: 'pieces' }
    ],
    description: 'Old mobile phones, chargers, and small electronics',
    images: ['https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400'],
    location: 'Connaught Place, Delhi',
    coordinates: { lat: 28.6320, lng: 77.2160 },
    estimatedValue: 1200,
    status: 'matched',
    createdAt: '2026-04-28T14:15:00Z',
    matchedWith: 'recycler-1',
    pickupScheduled: '2026-05-05T11:00:00Z'
  },
  {
    id: 'listing-3',
    userId: 'citizen-2',
    userName: 'Priya Sharma',
    materials: [
      { type: 'paper', quantity: 20, unit: 'kg' },
      { type: 'books', quantity: 15, unit: 'pieces' }
    ],
    description: 'Newspapers, magazines, and old textbooks',
    images: ['https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=400'],
    location: 'Karol Bagh, Delhi',
    coordinates: { lat: 28.6519, lng: 77.1903 },
    estimatedValue: 450,
    status: 'created',
    createdAt: '2026-05-03T09:00:00Z'
  },
  {
    id: 'listing-4',
    userId: 'citizen-2',
    userName: 'Priya Sharma',
    materials: [
      { type: 'textiles', quantity: 10, unit: 'kg' }
    ],
    description: 'Old clothes and fabric scraps in good condition',
    location: 'Karol Bagh, Delhi',
    coordinates: { lat: 28.6525, lng: 77.1910 },
    estimatedValue: 200,
    status: 'created',
    createdAt: '2026-05-04T08:15:00Z'
  },
  {
    id: 'listing-5',
    userId: 'citizen-1',
    userName: 'Raj Kumar',
    materials: [
      { type: 'metal', quantity: 12, unit: 'kg' },
      { type: 'batteries', quantity: 3, unit: 'kg' }
    ],
    description: 'Scrap metal and used batteries',
    location: 'Connaught Place, Delhi',
    coordinates: { lat: 28.6310, lng: 77.2175 },
    estimatedValue: 720,
    status: 'created',
    createdAt: '2026-05-04T11:00:00Z'
  }
];

export const mockPickups: Pickup[] = [
  {
    id: 'pickup-1',
    listingId: 'listing-2',
    citizenId: 'citizen-1',
    recyclerId: 'recycler-1',
    ngoId: 'ngo-1',
    scheduledTime: '2026-05-05T11:00:00Z',
    status: 'scheduled',
    address: '123, Andheri West, Mumbai - 400058',
    otp: '1234'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    type: 'earning',
    amount: 300,
    userId: 'citizen-1',
    listingId: 'listing-3',
    status: 'completed',
    timestamp: '2026-04-20T15:30:00Z',
    description: 'Payment for paper waste'
  },
  {
    id: 'txn-2',
    type: 'earning',
    amount: 1200,
    userId: 'citizen-1',
    listingId: 'listing-2',
    status: 'pending',
    timestamp: '2026-05-02T10:30:00Z',
    description: 'Payment for e-waste (pending pickup)'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'citizen-1',
    title: 'Pickup Scheduled',
    message: 'Your e-waste pickup has been scheduled for May 5, 2026 at 11:00 AM',
    type: 'info',
    read: false,
    timestamp: '2026-05-02T11:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'citizen-1',
    title: 'Payment Received',
    message: 'You received ₹300 for your paper waste listing',
    type: 'success',
    read: true,
    timestamp: '2026-04-20T15:30:00Z'
  }
];
