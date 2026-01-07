import { useState } from 'react';
import { Filter, Download } from 'lucide-react';
import useStore from '../store/useStore';
import AlertBadge from '../components/AlertBadge';
import { useNavigate } from 'react-router-dom';

const Alerts = () => {
  const navigate = useNavigate();
  const alerts = useStore((state) => state.alerts);
  const acknowledgeAlert = useStore((state) => state.acknowledgeAlert);
  const equipments = useStore((state) => state.equipments);

  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterEquipment, setFilterEquipment] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [comment, setComment] = useState('');

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = filterSeverity === 'all' || alert.severite === filterSeverity;
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesStatus = filterStatus === 'all' || alert.statut === filterStatus;
    const matchesEquipment = filterEquipment === 'all' || alert.equipement === filterEquipment;

    return matchesSeverity && matchesType && matchesStatus && matchesEquipment;
  });

  // Statistics
  const stats = {
    total: filteredAlerts.length,
    active: filteredAlerts.filter(a => a.statut === 'active').length,
    critical: filteredAlerts.filter(a => a.severite === 'critical').length,
    warning: filteredAlerts.filter(a => a.severite === 'warning').length,
    acknowledged: filteredAlerts.filter(a => a.statut === 'acquittee').length,
    resolved: filteredAlerts.filter(a => a.statut === 'resolue').length
  };

  const handleAcknowledge = () => {
    if (selectedAlert) {
      acknowledgeAlert(selectedAlert.id, 'Opérateur', comment);
      setSelectedAlert(null);
      setComment('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alertes & Notifications</h1>
          <p className="text-gray-600 mt-1">
            {stats.total} alerte{stats.total > 1 ? 's' : ''} •{' '}
            <span className="text-critical font-medium">{stats.critical} critique{stats.critical > 1 ? 's' : ''}</span>
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          <Download size={20} />
          <span>Exporter rapport</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Actives</p>
          <p className="text-2xl font-bold text-secondary">{stats.active}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Critiques</p>
          <p className="text-2xl font-bold text-critical">{stats.critical}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Warnings</p>
          <p className="text-2xl font-bold text-alert">{stats.warning}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Acquittées</p>
          <p className="text-2xl font-bold text-gray-900">{stats.acknowledged}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm text-gray-600">Résolues</p>
          <p className="text-2xl font-bold text-success">{stats.resolved}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-primary" />
          <h2 className="text-lg font-bold text-gray-900">Filtres</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Severity Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sévérité
            </label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Toutes</option>
              <option value="critical">Critique</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tous</option>
              <option value="temperature">Température</option>
              <option value="humidity">Humidité</option>
              <option value="maintenance">Maintenance</option>
              <option value="state">État</option>
              <option value="connection">Connexion</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tous</option>
              <option value="active">Active</option>
              <option value="acquittee">Acquittée</option>
              <option value="resolue">Résolue</option>
            </select>
          </div>

          {/* Equipment Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Équipement
            </label>
            <select
              value={filterEquipment}
              onChange={(e) => setFilterEquipment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tous</option>
              {equipments.map((eq) => (
                <option key={eq.id} value={eq.nom}>
                  {eq.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setFilterSeverity('all');
            setFilterType('all');
            setFilterStatus('all');
            setFilterEquipment('all');
          }}
          className="mt-4 text-sm text-gray-600 hover:text-gray-900"
        >
          Réinitialiser les filtres
        </button>
      </div>

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600">Aucune alerte trouvée</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div key={alert.id}>
              <AlertBadge
                alert={alert}
                onClick={() => {
                  if (alert.statut === 'active') {
                    setSelectedAlert(alert);
                  } else {
                    navigate(`/equipment/${alert.equipementId}`);
                  }
                }}
              />
              {alert.acquittePar && (
                <div className="ml-14 mt-2 text-sm text-gray-600">
                  Acquittée par {alert.acquittePar}
                  {alert.commentaire && ` : "${alert.commentaire}"`}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Acknowledge Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Acquitter l'alerte
            </h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Alerte:</p>
              <p className="font-medium">{selectedAlert.message}</p>
              <p className="text-sm text-gray-600 mt-1">{selectedAlert.equipement}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commentaire (optionnel)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows="3"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedAlert(null);
                  setComment('');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAcknowledge}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Acquitter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;
