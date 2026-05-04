import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Recycle, ArrowRight, Leaf, TrendingUp, Users, Shield, Smartphone, Zap } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: string) => void;
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0066FF]/5 via-background to-background py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative mx-auto mb-12 h-56 w-full max-w-4xl overflow-hidden rounded-2xl border border-[#0066FF]/10 bg-gradient-to-b from-sky-100 to-emerald-100">
            <div className="absolute bottom-0 left-0 h-20 w-full bg-emerald-300/70" />
            <div className="absolute left-6 top-6 h-16 w-16 rounded-full bg-yellow-300 shadow-[0_0_40px_10px_rgba(253,224,71,0.45)]" />
            <div className="absolute bottom-16 left-10 h-20 w-20 rounded-sm bg-[#0066FF]" />
            <div className="absolute bottom-16 left-16 h-12 w-8 bg-white/80" />
            <div className="absolute bottom-12 right-20 h-28 w-16 rounded-md bg-green-700" />
            <div className="absolute bottom-10 right-14 h-20 w-20 rounded-full border-4 border-dashed border-green-900 bg-green-600/80" />
            <div className="absolute bottom-10 left-[45%] h-10 w-10 rounded-full bg-orange-500" />
            <div className="absolute bottom-9 left-[52%] h-11 w-11 rounded-full bg-blue-500" />
            <div className="absolute bottom-9 left-[59%] h-11 w-11 rounded-full bg-emerald-600" />
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0066FF]/10 text-[#0066FF] px-4 py-2 rounded-full mb-6">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">Transform Waste into Value</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#0066FF] to-[#00CCFF] bg-clip-text text-transparent">
              One-Stop Digital Waste Exchange
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect citizens, recyclers, and NGOs in a seamless ecosystem. Make waste collection efficient, transparent, and profitable.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" onClick={() => onNavigate('role-selection')}>
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('features')}>
                Learn More
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="text-center">
              <div className="w-16 h-16 bg-[#0066FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#0066FF]" />
              </div>
              <h3 className="font-semibold mb-2">₹12.5M+</h3>
              <p className="text-sm text-muted-foreground">Earnings Generated</p>
            </Card>
            <Card className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">500+ Tons</h3>
              <p className="text-sm text-muted-foreground">Waste Recycled</p>
            </Card>
            <Card className="text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">10K+</h3>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, seamless, and efficient waste management in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0066FF] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">List Your Waste</h3>
              <p className="text-sm text-muted-foreground">
                Upload photos, select category, and get instant price quotes for your recyclable waste
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0066FF] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Get Matched & Pickup</h3>
              <p className="text-sm text-muted-foreground">
                Our smart system matches you with nearby recyclers and schedules convenient pickup
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0066FF] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Receive instant payments, earn points, and contribute to a greener planet
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for efficient waste management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, title: 'Easy Listing', description: 'Simple interface to list waste with photos and details' },
              { icon: Zap, title: 'Smart Matching', description: 'AI-powered system connects you with best recyclers' },
              { icon: Shield, title: 'Secure Payments', description: 'Safe and instant payment transfers' },
              { icon: TrendingUp, title: 'Real-time Tracking', description: 'Track your pickups and earnings in real-time' },
              { icon: Users, title: 'Community Impact', description: 'Join thousands making environmental difference' },
              { icon: Leaf, title: 'Carbon Credits', description: 'Track your environmental impact and CO₂ saved' }
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <div className="w-12 h-12 bg-[#0066FF]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-[#0066FF]" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Users Are Saying</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Feedback from citizens, vendors, and NGOs using WasteX.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Aarav, Citizen',
                review: 'I listed old newspapers and plastic in 2 minutes and got pickup the same day. The flow is very simple.',
              },
              {
                name: 'Mira, Recycler',
                review: 'Filtering listings by material saves a lot of time. I can quickly accept pickups that match my inventory.',
              },
              {
                name: 'Saanvi, NGO Volunteer',
                review: 'The map makes relevant donations easier to spot and request. Great for impact-driven collection.',
              },
            ].map((item) => (
              <Card key={item.name}>
                <p className="text-sm text-muted-foreground mb-4">"{item.review}"</p>
                <p className="font-semibold text-sm">{item.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Waste into Value?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of users making waste management efficient and profitable
          </p>
          <Button
            size="lg"
            className="bg-white text-[#0066FF] hover:bg-gray-100"
            onClick={() => onNavigate('role-selection')}
          >
            Start Now <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 WasteX. All rights reserved. Making waste management smarter, one listing at a time.</p>
        </div>
      </footer>
    </div>
  );
}
