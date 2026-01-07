import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatCard = ({ title, value, unit = '', icon: Icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-gradient-to-br from-primary to-blue-600',
    secondary: 'bg-gradient-to-br from-secondary to-cyan-600',
    success: 'bg-gradient-to-br from-success to-green-600',
    warning: 'bg-gradient-to-br from-alert to-orange-600',
    danger: 'bg-gradient-to-br from-critical to-red-700'
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp size={16} />;
    if (trend === 'down') return <TrendingDown size={16} />;
    return <Minus size={16} />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className={`${colorClasses[color]} text-white rounded-lg p-6 shadow-lg relative overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute top-0 right-0 opacity-10">
        {Icon && <Icon size={100} />}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm text-white/80 font-medium">{title}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold">{value}</span>
              {unit && <span className="text-lg text-white/80">{unit}</span>}
            </div>
          </div>
          {Icon && (
            <div className="bg-white/20 p-3 rounded-lg">
              <Icon size={24} />
            </div>
          )}
        </div>

        {/* Trend */}
        {trend && trendValue && (
          <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
