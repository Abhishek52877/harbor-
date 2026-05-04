import { User, Recycle, Heart, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { UserRole } from '../types';

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
  onBack?: () => void;
}

export function RoleSelection({ onRoleSelect, onBack }: RoleSelectionProps) {
  const roles = [
    {
      id: 'citizen' as UserRole,
      icon: User,
      title: 'Citizen',
      subtitle: 'Sell your waste & earn money',
      benefits: [
        'List waste in seconds',
        'Get instant price quotes',
        'Schedule convenient pickups',
        'Earn money for recyclables',
        'Track environmental impact'
      ],
      color: 'bg-green-500',
      gradient: 'from-green-500/10 to-green-500/5'
    },
    {
      id: 'recycler' as UserRole,
      icon: Recycle,
      title: 'Vendor / Recycler',
      subtitle: 'Source quality recyclables',
      benefits: [
        'Access verified waste listings',
        'Filter by material type',
        'Manage pickup schedules',
        'Build vendor reputation',
        'Grow recycling business'
      ],
      color: 'bg-blue-500',
      gradient: 'from-blue-500/10 to-blue-500/5'
    },
    {
      id: 'ngo' as UserRole,
      icon: Heart,
      title: 'NGO',
      subtitle: 'Drive social impact through recycling',
      benefits: [
        'Collect materials for your cause',
        'Track impact metrics',
        'Connect with donors',
        'Build community partnerships',
        'Showcase verified impact'
      ],
      color: 'bg-amber-500',
      gradient: 'from-amber-500/10 to-amber-500/5'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Role</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select how you'd like to participate in our waste management ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className={`bg-gradient-to-br ${role.gradient} border border-border rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className={`w-16 h-16 ${role.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold mb-2">{role.title}</h2>
                <p className="text-muted-foreground mb-6">{role.subtitle}</p>

                <div className="space-y-3 mb-8">
                  {role.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => onRoleSelect(role.id)}
                  className="w-full"
                  size="lg"
                >
                  Continue as {role.title}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            );
          })}
        </div>

        {onBack && (
          <div className="text-center">
            <Button onClick={onBack} variant="outline" size="lg">
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
