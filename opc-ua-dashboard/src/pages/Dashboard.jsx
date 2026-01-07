import { useEffect, useState } from 'react';
import { Package, Thermometer, Cpu, Bell } from 'lucide-react';
import useStore from '../store/useStore';
import StatCard from '../components/StatCard';
import EquipmentCard from '../components/EquipmentCard';
import AlertBadge from '../components/AlertBadge';
import TimelineEvent from '../components/TimelineEvent';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const equipments = useStore((state) => state.equipments);
  const lots = useStore((state) => state.lots);
  const alerts = useStore((state) => state.alerts);
  const events = useStore((state) => state.events);
  const getActiveAlerts = useStore((state) => state.getActiveAlerts);
  const getActiveEquipments = useStore((state) => state.getActiveEquipments);
  const getCriticalAlerts = useStore((state) => state.getCriticalAlerts);

  // Calculate KPIs
  const activeEquipments = getActiveEquipments();
  const activeAlerts = getActiveAlerts();
  const criticalAlerts = getCriticalAlerts();
  const lotsInTransit = lots.filter(lot => lot.statut === 'transport').length;

  // Calculate average temperature
  const avgTemp = activeEquipments.length > 0
    ? (activeEquipments.reduce((sum, eq) => sum + eq.temp, 0) / activeEquipments.length).toFixed(1)
    : 0;

  // Alerts in last 24h
  const last24hAlerts = alerts.filter(alert => {
    const alertDate = new Date(alert.timestamp);
    const now = new Date();
    return (now - alertDate) < 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble temps réel du système TrackLab</p>
      </div>

      {/* Critical Alerts Banner */}
      {criticalAlerts.length > 0 && (
        <div className="bg-critical text-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Bell size={24} className="animate-pulse" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">
                {criticalAlerts.length} Alerte{criticalAlerts.length > 1 ? 's' : ''} critique{criticalAlerts.length > 1 ? 's' : ''} active{criticalAlerts.length > 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-white/90">Action immédiate requise</p>
            </div>
            <button
              onClick={() => navigate('/alerts')}
              className="bg-white text-critical px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Voir les alertes
            </button>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Lots en transit"
          value={lotsInTransit}
          icon={Package}
          color="primary"
        />
        <StatCard
          title="Température moyenne"
          value={avgTemp}
          unit="°C"
          icon={Thermometer}
          color="secondary"
        />
        <StatCard
          title="Équipements actifs"
          value={activeEquipments.length}
          unit={`/ ${equipments.length}`}
          icon={Cpu}
          color="success"
        />
        <StatCard
          title="Alertes (24h)"
          value={last24hAlerts}
          icon={Bell}
          color={last24hAlerts > 5 ? 'danger' : 'warning'}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equipment Grid - 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Équipements</h2>
            <button
              onClick={() => navigate('/equipments')}
              className="text-primary hover:text-blue-700 font-medium text-sm"
            >
              Voir tous →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equipments.slice(0, 6).map((equipment) => (
              <EquipmentCard key={equipment.id} equipment={equipment} />
            ))}
          </div>
        </div>

        {/* Sidebar - Events Timeline */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Événements récents</h2>
          <div className="bg-white rounded-lg shadow-md p-4 max-h-[600px] overflow-y-auto">
            {events.map((event, index) => (
              <TimelineEvent
                key={event.id}
                event={event}
                isLast={index === events.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Active Alerts Section */}
      {activeAlerts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Alertes actives ({activeAlerts.length})
            </h2>
            <button
              onClick={() => navigate('/alerts')}
              className="text-primary hover:text-blue-700 font-medium text-sm"
            >
              Gérer les alertes →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeAlerts.slice(0, 4).map((alert) => (
              <AlertBadge
                key={alert.id}
                alert={alert}
                onClick={() => navigate(`/alerts?highlight=${alert.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lots Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Lots actifs</h2>
          <button
            onClick={() => navigate('/lots')}
            className="text-primary hover:text-blue-700 font-medium text-sm"
          >
            Voir tous →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lots.filter(lot => lot.statut !== 'livré').map((lot) => (
            <div
              key={lot.id}
              onClick={() => navigate(`/lot/${lot.id}`)}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-primary">{lot.id}</h3>
                  <p className="text-sm text-gray-600">{lot.produit}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  lot.statut === 'transport' ? 'bg-secondary text-white' :
                  lot.statut === 'stockage' ? 'bg-primary text-white' :
                  'bg-gray-200 text-gray-700'
                }`}>
                  {lot.statut}
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">TTL restant:</span>
                  <span className={`font-medium ${
                    lot.ttlRestant < 24 ? 'text-critical' :
                    lot.ttlRestant < 48 ? 'text-alert' :
                    'text-success'
                  }`}>
                    {lot.ttlRestant}h
                  </span>
                </div>
                {lot.equipementActuel && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Équipement:</span>
                    <span className="font-medium">{lot.equipementActuel}</span>
                  </div>
                )}
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      (lot.ttlRestant / lot.ttlTotal) > 0.5 ? 'bg-success' :
                      (lot.ttlRestant / lot.ttlTotal) > 0.25 ? 'bg-alert' :
                      'bg-critical'
                    }`}
                    style={{ width: `${(lot.ttlRestant / lot.ttlTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
