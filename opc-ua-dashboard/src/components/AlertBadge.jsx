import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

const AlertBadge = ({ alert, onClick, compact = false }) => {
  const getIcon = () => {
    switch (alert.severite) {
      case 'critical':
        return <AlertTriangle size={compact ? 16 : 20} />;
      case 'warning':
        return <AlertCircle size={compact ? 16 : 20} />;
      default:
        return <Info size={compact ? 16 : 20} />;
    }
  };

  const getSeverityColor = () => {
    switch (alert.severite) {
      case 'critical':
        return 'bg-critical border-red-700';
      case 'warning':
        return 'bg-alert border-orange-700';
      default:
        return 'bg-secondary border-cyan-700';
    }
  };

  const getStatusBadge = () => {
    switch (alert.statut) {
      case 'acquittee':
        return 'Acquittée';
      case 'resolue':
        return 'Résolue';
      default:
        return 'Active';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={`${getSeverityColor()} text-white rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity`}
      >
        {getIcon()}
        <span className="text-sm font-medium truncate">{alert.message}</span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${getSeverityColor()} text-white rounded-lg p-4 border-2 cursor-pointer hover:shadow-lg transition-all`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-bold text-lg">{alert.message}</h4>
            <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
              {getStatusBadge()}
            </span>
          </div>
          <p className="text-sm text-white/90 mb-2">{alert.description}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{alert.equipement}</span>
            <span className="text-white/80">{formatTime(alert.timestamp)}</span>
          </div>
          {alert.valeur !== null && (
            <div className="mt-2 pt-2 border-t border-white/20">
              <span className="text-sm">
                Valeur mesurée: <strong>{alert.valeur}°C</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertBadge;
