import { Truck, Refrigerator, Thermometer, Droplets, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EquipmentCard = ({ equipment }) => {
  const navigate = useNavigate();

  // Get icon based on equipment type
  const getIcon = () => {
    if (equipment.type === 'camion') {
      return <Truck size={32} />;
    }
    return <Refrigerator size={32} />;
  };

  // Get status color
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

  // Get temperature color
  const getTempColor = () => {
    const { temp, seuilTempMin, seuilTempMax } = equipment;
    if (temp < seuilTempMin || temp > seuilTempMax) {
      return 'text-critical bg-red-100';
    }
    if (
      temp < seuilTempMin + (seuilTempMax - seuilTempMin) * 0.2 ||
      temp > seuilTempMax - (seuilTempMax - seuilTempMin) * 0.2
    ) {
      return 'text-alert bg-orange-100';
    }
    return 'text-success bg-green-100';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      onClick={() => navigate(`/equipment/${equipment.id}`)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <h3 className="font-bold text-lg">{equipment.nom}</h3>
            <p className="text-sm text-blue-100 capitalize">
              {equipment.type.replace('_', ' ')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {equipment.statut === 'actif' && (
            <div className="w-3 h-3 bg-green-400 rounded-full pulse-dot"></div>
          )}
          <span
            className={`${getStatusColor()} px-3 py-1 rounded-full text-xs font-medium text-white`}
          >
            {equipment.statut}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Temperature */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Thermometer size={20} />
            <span className="text-sm">Température</span>
          </div>
          <span className={`${getTempColor()} px-3 py-1 rounded-lg font-bold text-lg`}>
            {equipment.temp}°C
          </span>
        </div>

        {/* Humidity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Droplets size={20} />
            <span className="text-sm">Humidité</span>
          </div>
          <span className="text-gray-900 font-semibold">{equipment.humid}%</span>
        </div>

        {/* Current Lot */}
        {equipment.lotActuel && (
          <div className="pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Lot actuel:</span>
              <span className="text-primary font-medium">{equipment.lotActuel}</span>
            </div>
          </div>
        )}

        {/* Location for trucks */}
        {equipment.type === 'camion' && equipment.lat && equipment.lon && (
          <div className="pt-2 border-t border-gray-200">
            <div className="text-xs text-gray-600">
              Position: {equipment.lat.toFixed(2)}, {equipment.lon.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{formatDate(equipment.derniereActivite)}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/equipment/${equipment.id}`);
            }}
            className="text-primary hover:text-blue-700 font-medium"
          >
            Détails →
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;
