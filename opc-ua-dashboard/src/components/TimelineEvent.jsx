import { AlertTriangle, Package, Settings, CheckCircle, Truck, Info } from 'lucide-react';

const TimelineEvent = ({ event, isLast = false }) => {
  const getIcon = () => {
    switch (event.type) {
      case 'alert':
        return <AlertTriangle size={16} />;
      case 'lot':
        return <Package size={16} />;
      case 'maintenance':
        return <Settings size={16} />;
      case 'delivery':
        return <CheckCircle size={16} />;
      case 'transport':
        return <Truck size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  const getSeverityColor = () => {
    switch (event.severity) {
      case 'critical':
        return 'bg-critical text-white';
      case 'warning':
        return 'bg-alert text-white';
      case 'success':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  };

  return (
    <div className="flex gap-3">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className={`${getSeverityColor()} rounded-full p-2 z-10`}>
          {getIcon()}
        </div>
        {!isLast && <div className="w-0.5 h-full bg-gray-300 mt-2"></div>}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-900">{event.message}</p>
          <p className="text-xs text-gray-500 mt-1">{formatTime(event.timestamp)}</p>
        </div>
      </div>
    </div>
  );
};

export default TimelineEvent;
