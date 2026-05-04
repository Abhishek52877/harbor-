import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Landing } from '../pages/Landing';
import { Auth } from '../pages/Auth';
import { RoleSelection } from '../pages/RoleSelection';
import { CitizenDashboard } from '../pages/CitizenDashboard';
import { RecyclerDashboard } from '../pages/RecyclerDashboard';
import { NGODashboard } from '../pages/NGODashboard';
import { AdminDashboard } from '../pages/AdminDashboard';
import { CreateListing } from '../pages/CreateListing';
import { ActivityHistory } from './components/ActivityHistory';
import { User, UserRole } from '../types';
import { authService } from '../services/api';

type Page = 'landing' | 'auth' | 'role-selection' | 'dashboard' | 'create-listing' | 'listings' | 'pickups' | 'transactions' | 'listing-detail' | 'activity-history';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleNavigate = (page: string, data?: any) => {
    const landingSectionTargets = new Set(['features', 'how-it-works']);
    const protectedPages = new Set(['dashboard', 'create-listing', 'activity-history']);

    if (landingSectionTargets.has(page)) {
      setCurrentPage('landing');
      requestAnimationFrame(() => {
        document.getElementById(page)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }

    if (!currentUser && protectedPages.has(page)) {
      setCurrentPage('auth');
      return;
    }

    setCurrentPage(page as Page);
    setPageData(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    authService.setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    authService.logout();
    setCurrentPage('landing');
  };

  const renderDashboard = () => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case 'citizen':
        return <CitizenDashboard user={currentUser} onNavigate={handleNavigate} />;
      case 'recycler':
        return <RecyclerDashboard user={currentUser} onNavigate={handleNavigate} />;
      case 'ngo':
        return <NGODashboard user={currentUser} onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      default:
        return <CitizenDashboard user={currentUser} onNavigate={handleNavigate} />;
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setPageData({ selectedRole: role });
    setCurrentPage('auth');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} />;
      case 'role-selection':
        return (
          <RoleSelection
            onRoleSelect={handleRoleSelect}
            onBack={() => setCurrentPage('landing')}
          />
        );
      case 'auth':
        return (
          <Auth
            onLogin={handleLogin}
            onNavigate={handleNavigate}
            initialRole={pageData?.selectedRole}
          />
        );
      case 'dashboard':
        return renderDashboard();
      case 'create-listing':
        return (
          <CreateListing
            onNavigate={handleNavigate}
            onSuccess={() => {
              setCurrentPage('dashboard');
            }}
          />
        );
      case 'activity-history':
        return <ActivityHistory />;
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />
      <main>{renderPage()}</main>
    </div>
  );
}
