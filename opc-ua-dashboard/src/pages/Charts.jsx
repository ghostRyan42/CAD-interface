import { useState, useMemo } from 'react';
import { Download, Calendar } from 'lucide-react';
import useStore from '../store/useStore';
import { generateHistoricalData } from '../data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Charts = () => {
  const equipments = useStore((state) => state.equipments);

  const [selectedEquipments, setSelectedEquipments] = useState([equipments[0]?.id]);
  const [period, setPeriod] = useState(24); // hours
  const [dataType, setDataType] = useState('both'); // 'temperature', 'humidity', 'both'

  // Generate data for selected equipments
  const chartData = useMemo(() => {
    if (selectedEquipments.length === 0) return [];

    // Generate data for each equipment
    const allData = selectedEquipments.map((eqId) =>
      generateHistoricalData(eqId, period)
    );

    // Merge data by timestamp
    const mergedData = {};
    allData.forEach((data) => {
      data.forEach((point) => {
        const timestamp = point.timestamp;
        if (!mergedData[timestamp]) {
          mergedData[timestamp] = { timestamp };
        }
        mergedData[timestamp][`temp_${point.equipmentId}`] = point.temperature;
        mergedData[timestamp][`humid_${point.equipmentId}`] = point.humidity;
      });
    });

    return Object.values(mergedData).sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
  }, [selectedEquipments, period]);

  // Calculate statistics
  const statistics = useMemo(() => {
    if (chartData.length === 0) return {};

    const stats = {};
    selectedEquipments.forEach((eqId) => {
      const equipment = equipments.find((eq) => eq.id === eqId);
      if (!equipment) return;

      const tempData = chartData
        .map((d) => d[`temp_${eqId}`])
        .filter((v) => v !== undefined);
      const humidData = chartData
        .map((d) => d[`humid_${eqId}`])
        .filter((v) => v !== undefined);

      const tempMin = Math.min(...tempData);
      const tempMax = Math.max(...tempData);
      const tempAvg = (tempData.reduce((a, b) => a + b, 0) / tempData.length).toFixed(1);

      const humidMin = Math.min(...humidData);
      const humidMax = Math.max(...humidData);
      const humidAvg = (humidData.reduce((a, b) => a + b, 0) / humidData.length).toFixed(1);

      // Count threshold violations
      const violations = tempData.filter(
        (t) => t < equipment.seuilTempMin || t > equipment.seuilTempMax
      ).length;

      stats[eqId] = {
        equipment: equipment.nom,
        temperature: { min: tempMin, max: tempMax, avg: tempAvg },
        humidity: { min: humidMin, max: humidMax, avg: humidAvg },
        violations,
        violationPercent: ((violations / tempData.length) * 100).toFixed(1)
      };
    });

    return stats;
  }, [chartData, selectedEquipments, equipments]);

  const handleEquipmentToggle = (eqId) => {
    setSelectedEquipments((prev) =>
      prev.includes(eqId)
        ? prev.filter((id) => id !== eqId)
        : [...prev, eqId]
    );
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    if (period <= 24) {
      return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit'
    });
  };

  const colors = ['#DC2626', '#F59E0B', '#10B981', '#06B6D4', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Graphiques Historiques</h1>
        <p className="text-gray-600 mt-1">
          Visualisation de l'évolution des données dans le temps
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Filtres</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Equipment Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Équipements
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {equipments.map((equipment) => (
                <label
                  key={equipment.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedEquipments.includes(equipment.id)}
                    onChange={() => handleEquipmentToggle(equipment.id)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{equipment.nom}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Period Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Période
            </label>
            <div className="space-y-2">
              {[
                { label: '1 heure', value: 1 },
                { label: '24 heures', value: 24 },
                { label: '7 jours', value: 168 },
                { label: '30 jours', value: 720 }
              ].map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPeriod(p.value)}
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${
                    period === p.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Data Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de données
            </label>
            <div className="space-y-2">
              {[
                { label: 'Température', value: 'temperature' },
                { label: 'Humidité', value: 'humidity' },
                { label: 'Les deux', value: 'both' }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setDataType(type.value)}
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${
                    dataType === type.value
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      {selectedEquipments.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Évolution sur {period}h
            </h2>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={18} />
                <span>Exporter CSV</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-cyan-700 transition-colors">
                <Download size={18} />
                <span>Exporter PNG</span>
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatDate}
                tick={{ fontSize: 12 }}
              />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              {dataType === 'both' && (
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              )}
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleString('fr-FR')}
                contentStyle={{ fontSize: 12 }}
              />
              <Legend />

              {/* Temperature lines */}
              {(dataType === 'temperature' || dataType === 'both') &&
                selectedEquipments.map((eqId, index) => {
                  const equipment = equipments.find((eq) => eq.id === eqId);
                  return (
                    <Line
                      key={`temp_${eqId}`}
                      yAxisId="left"
                      type="monotone"
                      dataKey={`temp_${eqId}`}
                      stroke={colors[index % colors.length]}
                      name={`${equipment?.nom} - Temp (°C)`}
                      dot={false}
                      strokeWidth={2}
                    />
                  );
                })}

              {/* Humidity lines */}
              {(dataType === 'humidity' || dataType === 'both') &&
                selectedEquipments.map((eqId, index) => {
                  const equipment = equipments.find((eq) => eq.id === eqId);
                  return (
                    <Line
                      key={`humid_${eqId}`}
                      yAxisId={dataType === 'both' ? 'right' : 'left'}
                      type="monotone"
                      dataKey={`humid_${eqId}`}
                      stroke={colors[index % colors.length]}
                      strokeDasharray="5 5"
                      name={`${equipment?.nom} - Humid (%)`}
                      dot={false}
                      strokeWidth={2}
                    />
                  );
                })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            Sélectionnez au moins un équipement pour afficher les données
          </p>
        </div>
      )}

      {/* Statistics */}
      {Object.keys(statistics).length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Statistiques de la période
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(statistics).map(([eqId, stats]) => (
              <div key={eqId} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-primary mb-3">{stats.equipment}</h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 font-medium">Température (°C)</p>
                    <div className="flex justify-between mt-1">
                      <span>Min: <strong>{stats.temperature.min}</strong></span>
                      <span>Moy: <strong>{stats.temperature.avg}</strong></span>
                      <span>Max: <strong>{stats.temperature.max}</strong></span>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 font-medium">Humidité (%)</p>
                    <div className="flex justify-between mt-1">
                      <span>Min: <strong>{stats.humidity.min}</strong></span>
                      <span>Moy: <strong>{stats.humidity.avg}</strong></span>
                      <span>Max: <strong>{stats.humidity.max}</strong></span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Dépassements seuils:</span>
                      <span
                        className={`font-bold ${
                          stats.violations > 0 ? 'text-critical' : 'text-success'
                        }`}
                      >
                        {stats.violations} ({stats.violationPercent}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Charts;
