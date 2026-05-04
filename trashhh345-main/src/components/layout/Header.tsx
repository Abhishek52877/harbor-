import { Recycle, User, Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../common/Button';
import { User as UserType } from '../../types';

interface HeaderProps {
  user?: UserType | null;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export function Header({ user, onNavigate, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate?.('landing')}>
            <div className="w-10 h-10 bg-[#0066FF] rounded-lg flex items-center justify-center">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">WasteX</span>
          </div>

          {!user ? (
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => onNavigate?.('landing')} className="text-foreground hover:text-[#0066FF] transition-colors">
                Home
              </button>
              <button onClick={() => onNavigate?.('features')} className="text-foreground hover:text-[#0066FF] transition-colors">
                Features
              </button>
              <button onClick={() => onNavigate?.('how-it-works')} className="text-foreground hover:text-[#0066FF] transition-colors">
                How It Works
              </button>
              <Button onClick={() => onNavigate?.('auth')}>Get Started</Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => onNavigate?.('dashboard')} className="text-foreground hover:text-[#0066FF] transition-colors">
                Dashboard
              </button>
              <button onClick={() => onNavigate?.('activity-history')} className="text-foreground hover:text-[#0066FF] transition-colors">
                History
              </button>
              {user.role === 'citizen' && (
                <button onClick={() => onNavigate?.('create-listing')} className="text-foreground hover:text-[#0066FF] transition-colors">
                  List Waste
                </button>
              )}
              <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#0066FF] rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                <div className="text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </div>
          )}

          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {!user ? (
              <div className="flex flex-col gap-3">
                <button onClick={() => { onNavigate?.('landing'); setMobileMenuOpen(false); }} className="text-left py-2">
                  Home
                </button>
                <button onClick={() => { onNavigate?.('features'); setMobileMenuOpen(false); }} className="text-left py-2">
                  Features
                </button>
                <Button onClick={() => { onNavigate?.('auth'); setMobileMenuOpen(false); }}>
                  Get Started
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button onClick={() => { onNavigate?.('dashboard'); setMobileMenuOpen(false); }} className="text-left py-2">
                  Dashboard
                </button>
                <button onClick={() => { onNavigate?.('activity-history'); setMobileMenuOpen(false); }} className="text-left py-2">
                  History
                </button>
                <Button variant="outline" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
