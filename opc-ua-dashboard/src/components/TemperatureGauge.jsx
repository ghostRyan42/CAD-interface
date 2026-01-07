import React from 'react';

const TemperatureGauge = ({ value, min, max, size = 'md', unit = '°C' }) => {
  // Size configurations
  const sizes = {
    sm: { width: 120, height: 80, fontSize: 'text-lg', padding: 4 },
    md: { width: 180, height: 120, fontSize: 'text-2xl', padding: 6 },
    lg: { width: 240, height: 160, fontSize: 'text-3xl', padding: 8 }
  };

  const config = sizes[size] || sizes.md;

  // Calculate angle (-90 to 90 degrees)
  const percentage = ((value - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180 - 90;

  // Determine color based on thresholds
  const getColor = () => {
    if (value < min || value > max) return '#DC2626'; // critical - red
    if (value < min + (max - min) * 0.2 || value > max - (max - min) * 0.2) {
      return '#F59E0B'; // warning - orange
    }
    return '#10B981'; // success - green
  };

  const color = getColor();
  const radius = config.width / 2 - config.padding;
  const centerX = config.width / 2;
  const centerY = config.height - config.padding;

  // Create arc path
  const createArc = () => {
    const startAngle = -180;
    const endAngle = 0;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;
  };

  // Needle position
  const needleAngle = (angle * Math.PI) / 180;
  const needleLength = radius - 10;
  const needleX = centerX + needleLength * Math.cos(needleAngle);
  const needleY = centerY + needleLength * Math.sin(needleAngle);

  return (
    <div className="inline-flex flex-col items-center">
      <svg width={config.width} height={config.height}>
        {/* Background arc */}
        <path
          d={createArc()}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Colored zones */}
        <defs>
          <linearGradient id={`gauge-gradient-${value}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>

        {/* Value arc */}
        <path
          d={createArc()}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${(percentage / 100) * Math.PI * radius} ${Math.PI * radius}`}
        />

        {/* Center point */}
        <circle cx={centerX} cy={centerY} r="8" fill="#374151" />

        {/* Needle */}
        <line
          x1={centerX}
          y1={centerY}
          x2={needleX}
          y2={needleY}
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Min/Max labels */}
        <text
          x={config.padding + 10}
          y={centerY + 5}
          fontSize="12"
          fill="#6B7280"
          textAnchor="start"
        >
          {min}{unit}
        </text>
        <text
          x={config.width - config.padding - 10}
          y={centerY + 5}
          fontSize="12"
          fill="#6B7280"
          textAnchor="end"
        >
          {max}{unit}
        </text>
      </svg>

      {/* Value display */}
      <div className={`${config.fontSize} font-bold mt-2`} style={{ color }}>
        {value}{unit}
      </div>
    </div>
  );
};

export default TemperatureGauge;
