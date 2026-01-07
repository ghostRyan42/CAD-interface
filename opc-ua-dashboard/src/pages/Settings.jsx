const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">Configuration du système TrackLab</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Paramètres généraux</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fréquence de rafraîchissement (secondes)
            </label>
            <input
              type="number"
              defaultValue={3}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Langue
            </label>
            <select className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Français</option>
              <option>English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Notifications</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <span className="text-sm">Activer les notifications push</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <span className="text-sm">Notifications pour alertes critiques</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <span className="text-sm">Notifications pour maintenances</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">À propos</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Version:</strong> 1.0.0</p>
          <p><strong>Système:</strong> OPC UA TrackLab 4</p>
          <p><strong>Dernière mise à jour:</strong> Janvier 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
