import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, CheckCircle, Clock, TrendingUp, MapPin } from 'lucide-react';
import useStore from '../store/useStore';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LotTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lots = useStore((state) => state.lots);

  const lot = lots.find((l) => l.id === id);

  if (!lot) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Lot non trouvé</h2>
        <button
          onClick={() => navigate('/lots')}
          className="text-primary hover:text-blue-700"
        >
          Retour à la liste des lots
        </button>
      </div>
    );
  }

  const getEtapeIcon = (type) => {
    switch (type) {
      case 'production':
        return <Package size={24} />;
      case 'stockage':
        return <Clock size={24} />;
      case 'transport':
        return <TrendingUp size={24} />;
      case 'livraison':
        return <CheckCircle size={24} />;
      default:
        return <MapPin size={24} />;
    }
  };

  const getEtapeColor = (type) => {
    switch (type) {
      case 'production':
        return 'bg-purple-500';
      case 'stockage':
        return 'bg-blue-500';
      case 'transport':
        return 'bg-orange-500';
      case 'livraison':
        return 'bg-success';
      case 'transfert':
        return 'bg-gray-500';
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

  const calculateDuration = (debut, fin) => {
    if (!fin) return 'En cours';
    const start = new Date(debut);
    const end = new Date(fin);
    const hours = Math.round((end - start) / (1000 * 60 * 60));
    return `${hours}h`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/lots')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Parcours du Lot</h1>
          <p className="text-gray-600 mt-1">Traçabilité complète du lot {lot.id}</p>
        </div>
      </div>

      {/* Lot Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{lot.id}</h2>
            <p className="text-blue-100 text-lg">{lot.produit}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-lg font-medium ${
              lot.statut === 'transport' ? 'bg-secondary' :
              lot.statut === 'stockage' ? 'bg-primary' :
              lot.statut === 'livré' ? 'bg-success' :
              'bg-gray-500'
            }`}
          >
            {lot.statut}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-sm text-blue-200">Date production</p>
            <p className="font-semibold">{formatDate(lot.dateProduction)}</p>
          </div>
          <div>
            <p className="text-sm text-blue-200">TTL restant</p>
            <p className="font-semibold">{lot.ttlRestant}h / {lot.ttlTotal}h</p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-1">
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
          <div>
            <p className="text-sm text-blue-200">Distance parcourue</p>
            <p className="font-semibold">{lot.distanceParcourue} km</p>
          </div>
          <div>
            <p className="text-sm text-blue-200">Conformité</p>
            <p className="font-semibold flex items-center gap-1">
              {lot.conformite ? (
                <>
                  <CheckCircle size={18} className="text-green-400" />
                  <span>Conforme</span>
                </>
              ) : (
                <>
                  <span className="text-critical">Non conforme</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Parcours détaillé</h3>

        <div className="space-y-6">
          {lot.parcours.map((etape, index) => (
            <div key={index} className="flex gap-4">
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div className={`${getEtapeColor(etape.type)} text-white rounded-full p-3 z-10`}>
                  {getEtapeIcon(etape.type)}
                </div>
                {index < lot.parcours.length - 1 && (
                  <div className="w-1 h-full bg-gray-300 mt-2"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{etape.etape}</h4>
                      <p className="text-sm text-gray-600">{etape.equipement}</p>
                    </div>
                    {etape.enCours && (
                      <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <div className="w-2 h-2 bg-white rounded-full pulse-dot"></div>
                        En cours
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Début</p>
                      <p className="font-medium">{formatDate(etape.dateDebut)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Fin</p>
                      <p className="font-medium">
                        {etape.dateFin ? formatDate(etape.dateFin) : 'En cours'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Durée</p>
                      <p className="font-medium">{calculateDuration(etape.dateDebut, etape.dateFin)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Température moyenne</p>
                      <p className="font-medium">{etape.tempMoy}°C</p>
                    </div>
                  </div>

                  {/* Temperature mini chart */}
                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-sm text-gray-600 mb-2">Plage de température</p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">
                        Min: <strong className="text-blue-600">{etape.tempMin}°C</strong>
                      </span>
                      <div className="flex-1 h-2 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full"></div>
                      <span className="text-sm">
                        Max: <strong className="text-red-600">{etape.tempMax}°C</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-3">Résumé</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Durée totale chaîne:</span>
              <span className="font-medium">
                {Math.round((new Date() - new Date(lot.dateProduction)) / (1000 * 60 * 60))}h
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nombre de transferts:</span>
              <span className="font-medium">{lot.nbTransferts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Équipement actuel:</span>
              <span className="font-medium">{lot.equipementActuel || 'Livré'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-3">Température globale</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Température min:</span>
              <span className="font-medium text-blue-600">
                {Math.min(...lot.parcours.map(p => p.tempMin))}°C
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Température max:</span>
              <span className="font-medium text-red-600">
                {Math.max(...lot.parcours.map(p => p.tempMax))}°C
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Température moyenne:</span>
              <span className="font-medium">
                {(lot.parcours.reduce((sum, p) => sum + p.tempMoy, 0) / lot.parcours.length).toFixed(1)}°C
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-3">Conformité</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-success" />
              <span>Conformité réglementaire</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-success" />
              <span>Chaîne du froid respectée</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-success" />
              <span>Traçabilité complète</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Lots List Page
export const LotsPage = () => {
  const navigate = useNavigate();
  const lots = useStore((state) => state.lots);
  const [filter, setFilter] = useState('all');

  const filteredLots = lots.filter((lot) => {
    if (filter === 'all') return true;
    return lot.statut === filter;
  });

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'transport':
        return 'bg-secondary text-white';
      case 'stockage':
        return 'bg-primary text-white';
      case 'livré':
        return 'bg-success text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Lots</h1>
        <p className="text-gray-600 mt-1">{filteredLots.length} lot{filteredLots.length > 1 ? 's' : ''}</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'transport', 'stockage', 'livré'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'Tous' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Lots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLots.map((lot) => (
          <div
            key={lot.id}
            onClick={() => navigate(`/lot/${lot.id}`)}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-xl text-primary">{lot.id}</h3>
                <p className="text-gray-600">{lot.produit}</p>
              </div>
              <span className={`${getStatusColor(lot.statut)} px-3 py-1 rounded-lg text-sm font-medium`}>
                {lot.statut}
              </span>
            </div>

            <div className="space-y-3 text-sm">
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
              <div className="flex justify-between">
                <span className="text-gray-600">Distance:</span>
                <span className="font-medium">{lot.distanceParcourue} km</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
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
  );
};

export default LotTracking;
