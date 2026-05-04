import { User, WasteListing, Pickup, Transaction, Stats } from '../types';
import { mockUsers, mockListings, mockPickups, mockTransactions } from './mockData';
import { supabase } from '../lib/supabase';

let currentUser: User | null = null;
let listings = [...mockListings];
let pickups = [...mockPickups];
let transactions = [...mockTransactions];

const isAuthRateLimitError = (error: unknown): boolean => {
  const message = String((error as { message?: string })?.message || '').toLowerCase();
  return message.includes('rate limit') || message.includes('email rate limit exceeded');
};

const makePrototypeUser = (email: string, role: User['role'] = 'citizen'): User => ({
  id: `prototype-${Date.now()}`,
  name: email.split('@')[0] || 'Prototype User',
  email,
  role,
  phone: '',
  verified: true,
  earnings: 0,
  points: 0
});

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (isAuthRateLimitError(error)) {
          const prototypeUser = makePrototypeUser(email);
          currentUser = prototypeUser;
          return prototypeUser;
        }
        throw error;
      }

      const user: User = {
        id: data.user.id,
        email: data.user.email || email,
        name: (data.user.user_metadata?.name as string) || 'User',
        role: (data.user.user_metadata?.role as User['role']) || 'citizen',
        phone: (data.user.user_metadata?.phone as string) || '',
        verified: Boolean(data.user.email_confirmed_at),
        earnings: 0,
        points: 0
      };

      currentUser = user;
      return user;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    const user = Object.values(mockUsers).find(u => u.email === email);
    if (!user) throw new Error('Invalid credentials');
    currentUser = user;
    return user;
  },

  signup: async (userData: Partial<User> & { password: string }): Promise<User> => {
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email!,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
            phone: userData.phone
          }
        }
      });

      if (error) {
        if (isAuthRateLimitError(error)) {
          const prototypeUser = makePrototypeUser(userData.email!, userData.role as User['role']);
          currentUser = prototypeUser;
          return prototypeUser;
        }
        throw error;
      }

      const signedUpUser = data.user;
      const newUser: User = {
        id: signedUpUser?.id || `${userData.role}-${Date.now()}`,
        name: userData.name!,
        email: userData.email!,
        role: userData.role!,
        phone: userData.phone!,
        verified: Boolean(signedUpUser?.email_confirmed_at),
        earnings: 0,
        points: 0
      };
      currentUser = newUser;
      return newUser;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = {
      id: `${userData.role}-${Date.now()}`,
      name: userData.name!,
      email: userData.email!,
      role: userData.role!,
      phone: userData.phone!,
      verified: false,
      earnings: 0,
      points: 0
    };
    currentUser = newUser;
    return newUser;
  },

  logout: () => {
    if (supabase) {
      void supabase.auth.signOut();
    }
    currentUser = null;
  },

  getCurrentUser: () => currentUser,

  setCurrentUser: (user: User) => {
    currentUser = user;
  }
};

export const listingService = {
  getAll: async (userId?: string): Promise<WasteListing[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return userId ? listings.filter(l => l.userId === userId) : listings;
  },

  getAvailable: async (): Promise<WasteListing[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return listings.filter(l => l.status === 'created');
  },

  create: async (listingData: Partial<WasteListing>): Promise<WasteListing> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newListing: WasteListing = {
      id: `listing-${Date.now()}`,
      userId: currentUser?.id || 'unknown',
      userName: currentUser?.name || 'Unknown',
      materials: listingData.materials || [],
      description: listingData.description || '',
      images: listingData.images,
      location: listingData.location!,
      coordinates: listingData.coordinates || { lat: 28.6139, lng: 77.2090 },
      estimatedValue: listingData.estimatedValue || 0,
      status: 'created',
      createdAt: new Date().toISOString()
    };
    listings = [newListing, ...listings];
    return newListing;
  },

  updateStatus: async (id: string, status: WasteListing['status']): Promise<WasteListing> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = listings.findIndex(l => l.id === id);
    if (index !== -1) {
      listings[index] = { ...listings[index], status };
    }
    return listings[index];
  }
};

export const pickupService = {
  getAll: async (userId?: string, role?: string): Promise<Pickup[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (!userId) return pickups;

    if (role === 'citizen') return pickups.filter(p => p.citizenId === userId);
    if (role === 'recycler') return pickups.filter(p => p.recyclerId === userId);
    if (role === 'ngo') return pickups.filter(p => p.ngoId === userId);

    return pickups;
  },

  schedule: async (pickupData: Partial<Pickup>): Promise<Pickup> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newPickup: Pickup = {
      id: `pickup-${Date.now()}`,
      listingId: pickupData.listingId!,
      citizenId: pickupData.citizenId!,
      recyclerId: pickupData.recyclerId || 'recycler-1',
      ngoId: pickupData.ngoId || 'ngo-1',
      scheduledTime: pickupData.scheduledTime!,
      status: 'scheduled',
      address: pickupData.address!,
      otp: Math.floor(1000 + Math.random() * 9000).toString()
    };
    pickups = [newPickup, ...pickups];
    return newPickup;
  },

  updateStatus: async (id: string, status: Pickup['status']): Promise<Pickup> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = pickups.findIndex(p => p.id === id);
    if (index !== -1) {
      pickups[index] = { ...pickups[index], status };
      if (status === 'completed') {
        pickups[index].completedAt = new Date().toISOString();
      }
    }
    return pickups[index];
  }
};

export const transactionService = {
  getAll: async (userId?: string): Promise<Transaction[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return userId ? transactions.filter(t => t.userId === userId) : transactions;
  },

  getBalance: async (userId: string): Promise<number> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const userTransactions = transactions.filter(
      t => t.userId === userId && t.status === 'completed'
    );
    return userTransactions.reduce((sum, t) => sum + (t.type === 'earning' ? t.amount : -t.amount), 0);
  }
};

export const statsService = {
  getUserStats: async (userId: string): Promise<Stats> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const userListings = listings.filter(l => l.userId === userId);
    const completedListings = userListings.filter(l => l.status === 'completed');
    const earnings = transactions
      .filter(t => t.userId === userId && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const wasteRecycled = completedListings.reduce((sum, l) => {
      const totalQuantity = l.materials.reduce((matSum, mat) => matSum + mat.quantity, 0);
      return sum + totalQuantity;
    }, 0);

    return {
      totalListings: userListings.length,
      completedPickups: completedListings.length,
      totalEarnings: earnings,
      wasteRecycled,
      co2Saved: Math.round(wasteRecycled * 2.5),
      activeListings: userListings.filter(l => l.status === 'created' || l.status === 'matched').length,
      pendingPickups: pickups.filter(p => p.citizenId === userId && p.status === 'scheduled').length
    };
  }
};
