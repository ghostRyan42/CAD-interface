import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Cpu,
  Bell,
  Settings,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import useStore from '../store/useStore';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const alerts = useStore(state => state.getActiveAlerts());

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/charts', icon: TrendingUp, label: 'Graphiques' },
    { path: '/lots', icon: Package, label: 'Lots' },
    { path: '/equipments', icon: Cpu, label: 'Équipements' },
    { path: '/alerts', icon: Bell, label: 'Alertes', badge: alerts.length },
    { path: '/settings', icon: Settings, label: 'Paramètres' }
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`bg-primary text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-blue-700">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold">TrackLab 4</h1>
              <p className="text-xs text-blue-200">OPC UA Monitor</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors relative ${
                  isActive
                    ? 'bg-secondary text-white'
                    : 'hover:bg-blue-700 text-blue-100'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge > 0 && (
                      <span className="bg-critical text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 w-full p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
            {sidebarOpen && (
              <>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">Opérateur</p>
                  <p className="text-xs text-blue-200">operateur@tracklab.fr</p>
                </div>
                <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>TrackLab</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <input
                type="search"
                placeholder="Rechercher..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
                {alerts.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-critical rounded-full"></span>
                )}
              </button>

              {/* User Avatar */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left">
                      <User size={16} />
                      <span>Profil</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left">
                      <Settings size={16} />
                      <span>Paramètres</span>
                    </button>
                    <hr className="my-2" />
                    <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left text-critical">
                      <LogOut size={16} />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-3 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span>© 2024 TrackLab 4 - OPC UA Monitoring System</span>
            <span>Version 1.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
