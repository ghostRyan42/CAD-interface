import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Refrigerator, MapPin, Package, Clock, Activity } from 'lucide-react';
import useStore from '../store/useStore';
import TemperatureGauge from '../components/TemperatureGauge';
import AlertBadge from '../components/AlertBadge';
import { maintenanceHistory, generateHistoricalData } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EquipmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const equipments = useStore((state) => state.equipments);
  const getEquipmentAlerts = useStore((state) => state.getEquipmentAlerts);
  const getLotByEquipment = useStore((state) => state.getLotByEquipment);

  const equipment = equipments.find((eq) => eq.id === parseInt(id));
  const alerts = getEquipmentAlerts(parseInt(id));
  const currentLot = getLotByEquipment(parseInt(id));
  const maintenance = maintenanceHistory[parseInt(id)] || [];

  // Generate last 24h data
  const historicalData = generateHistoricalData(parseInt(id), 24);

  if (!equipment) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Équipement non trouvé</h2>
        <button
          onClick={() => navigate('/')}
          className="text-primary hover:text-blue-700"
        >
          Retour au dashboard
        </button>
      </div>
    );
  }

  const getIcon = () => {
    if (equipment.type === 'camion') {
      return <Truck size={48} />;
    }
    return <Refrigerator size={48} />;
  };

  const getStatusColor = () => {
    switch (equipment.statut) {
      case 'actif':
        return 'bg-success';
      case 'maintenance':
        return 'bg-alert';
      case 'hors_service':
        return 'bg-critical';
      default:
        return 'bg-gray-400';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Détail Équipement</h1>
          <p className="text-gray-600 mt-1">Informations complètes et monitoring</p>
        </div>
      </div>

      {/* Equipment Header Card */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-lg">
              {getIcon()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{equipment.nom}</h2>
              <p className="text-blue-100 capitalize">
                {equipment.type.replace('_', ' ')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {equipment.statut === 'actif' && (
              <div className="w-4 h-4 bg-green-400 rounded-full pulse-dot"></div>
            )}
            <span className={`${getStatusColor()} px-4 py-2 rounded-lg font-medium`}>
              {equipment.statut}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Real-time data */}
        <div className="lg:col-span-2 space-y-6">
          {/* Temperature and Humidity Gauges */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Données temps réel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Température</h4>
                <TemperatureGauge
                  value={equipment.temp}
                  min={equipment.seuilTempMin}
                  max={equipment.seuilTempMax}
                  size="lg"
                />
              </div>
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Humidité</h4>
                <TemperatureGauge
                  value={equipment.humid}
                  min={30}
                  max={80}
                  size="lg"
                  unit="%"
                />
              </div>
            </div>
          </div>

          {/* Historical Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Évolution (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                  }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  yAxisId="temp"
                  domain={[equipment.seuilTempMin - 2, equipment.seuilTempMax + 2]}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  yAxisId="humid"
                  orientation="right"
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  labelFormatter={(value) => formatDate(value)}
                  contentStyle={{ fontSize: 12 }}
                />
                <Legend />
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#DC2626"
                  name="Température (°C)"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="humid"
                  type="monotone"
                  dataKey="humidity"
                  stroke="#06B6D4"
                  name="Humidité (%)"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Alerts */}
          {alerts.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Alertes ({alerts.length})
              </h3>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <AlertBadge
                    key={alert.id}
                    alert={alert}
                    onClick={() => navigate('/alerts')}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Info cards */}
        <div className="space-y-6">
          {/* Current Lot */}
          {currentLot && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package size={20} className="text-primary" />
                <h3 className="text-lg font-bold text-gray-900">Lot actuel</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">ID Lot</p>
                  <p className="font-bold text-primary">{currentLot.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Produit</p>
                  <p className="font-medium">{currentLot.produit}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">TTL restant</p>
                  <p className="font-medium">{currentLot.ttlRestant}h</p>
                </div>
                <button
                  onClick={() => navigate(`/lot/${currentLot.id}`)}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Voir le parcours
                </button>
              </div>
            </div>
          )}

          {/* Location (for trucks) */}
          {equipment.type === 'camion' && equipment.lat && equipment.lon && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-primary" />
                <h3 className="text-lg font-bold text-gray-900">Position</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Latitude:</span>
                  <span className="font-medium">{equipment.lat.toFixed(4)}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Longitude:</span>
                  <span className="font-medium">{equipment.lon.toFixed(4)}°</span>
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={20} className="text-primary" />
              <h3 className="text-lg font-bold text-gray-900">Statistiques</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Uptime:</span>
                <span className="font-bold text-success">{equipment.uptime}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lots traités:</span>
                <span className="font-medium">{equipment.nbLotsTraites}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alertes générées:</span>
                <span className="font-medium">{equipment.nbAlertes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Heures de fonctionnement:</span>
                <span className="font-medium">{equipment.heuresFonctionnement}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Capacité:</span>
                <span className="font-medium">{equipment.capacite}</span>
              </div>
            </div>
          </div>

          {/* Maintenance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={20} className="text-primary" />
              <h3 className="text-lg font-bold text-gray-900">Maintenance</h3>
            </div>
            <div className="space-y-3">
              {maintenance.map((m, index) => (
                <div
                  key={index}
                  className={`border-l-4 pl-3 py-2 ${
                    m.enCours ? 'border-alert bg-orange-50' : 'border-gray-300'
                  }`}
                >
                  <p className="text-sm font-medium">{m.type}</p>
                  <p className="text-xs text-gray-600">{m.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(m.date)}
                    {m.duree && ` - ${m.duree}h`}
                  </p>
                  {m.technicien && (
                    <p className="text-xs text-gray-500">Par: {m.technicien}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
            <button className="w-full bg-success text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Démarrer maintenance
            </button>
            <button className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-cyan-700 transition-colors">
              Forcer recalibration
            </button>
            <button className="w-full bg-alert text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Tester alerte
            </button>
            <button
              onClick={() => navigate(`/equipments/edit/${equipment.id}`)}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Éditer équipement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;
