import { useEffect, useState } from 'react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { Recycle, User, Building, Users } from 'lucide-react';
import { authService } from '../services/api';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (user: any) => void;
  onNavigate: (page: string) => void;
  initialRole?: UserRole;
}

export function Auth({ onLogin, onNavigate, initialRole }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialRole) {
      setIsLogin(false);
      setSelectedRole(initialRole);
    }
  }, [initialRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let user;
      if (isLogin) {
        user = await authService.login(formData.email, formData.password);
      } else {
        user = await authService.signup({ ...formData, role: selectedRole });
      }
      onLogin(user);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: 'citizen' as UserRole, label: 'Citizen', icon: User, description: 'I want to recycle waste and earn' },
    { value: 'recycler' as UserRole, label: 'Recycler', icon: Building, description: 'I buy recyclable materials' },
    { value: 'ngo' as UserRole, label: 'NGO/Collector', icon: Users, description: 'I handle waste collection' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#0066FF]/5 via-background to-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-[#0066FF] rounded-lg flex items-center justify-center">
              <Recycle className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold">WasteX</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Sign in to continue' : 'Join the waste exchange platform'}
          </p>
        </div>

        <Card>
          {!isLogin && (
            <div className="mb-6">
              <label className="block mb-3 text-sm font-medium">I am a...</label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                      selectedRole === role.value
                        ? 'border-[#0066FF] bg-[#0066FF]/5'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <role.icon className={`w-5 h-5 mt-0.5 ${selectedRole === role.value ? 'text-[#0066FF]' : 'text-muted-foreground'}`} />
                    <div className="flex-1">
                      <div className="font-medium mb-1">{role.label}</div>
                      <div className="text-xs text-muted-foreground">{role.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            )}

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {!isLogin && (
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            )}

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-[#0066FF] hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          {isLogin && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-center text-muted-foreground">
              Demo: Use any existing email from the mock data (e.g., john@example.com)
            </div>
          )}
        </Card>

        <div className="mt-6 text-center">
          <button onClick={() => onNavigate('landing')} className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
