import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import useStore from '../store/useStore';

const EquipmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const equipments = useStore((state) => state.equipments);
  const addEquipment = useStore((state) => state.addEquipment);
  const updateEquipment = useStore((state) => state.updateEquipment);

  const isEditMode = !!id;
  const existingEquipment = isEditMode ? equipments.find((eq) => eq.id === parseInt(id)) : null;

  const [formData, setFormData] = useState({
    nom: '',
    type: 'camion',
    statut: 'actif',
    temp: 4,
    tempMin: 2,
    tempMax: 8,
    humid: 75,
    humidMin: 60,
    humidMax: 85,
    localisation: '',
    lotActuel: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingEquipment) {
      setFormData({
        nom: existingEquipment.nom,
        type: existingEquipment.type,
        statut: existingEquipment.statut,
        temp: existingEquipment.temp,
        tempMin: existingEquipment.tempMin,
        tempMax: existingEquipment.tempMax,
        humid: existingEquipment.humid,
        humidMin: existingEquipment.humidMin,
        humidMax: existingEquipment.humidMax,
        localisation: existingEquipment.localisation || '',
        lotActuel: existingEquipment.lotActuel || null,
      });
    }
  }, [existingEquipment]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (formData.tempMin >= formData.tempMax) {
      newErrors.tempMin = 'La température minimale doit être inférieure à la maximale';
    }

    if (formData.humidMin >= formData.humidMax) {
      newErrors.humidMin = 'L\'humidité minimale doit être inférieure à la maximale';
    }

    if (formData.temp < formData.tempMin || formData.temp > formData.tempMax) {
      newErrors.temp = `La température doit être entre ${formData.tempMin}°C et ${formData.tempMax}°C`;
    }

    if (formData.humid < formData.humidMin || formData.humid > formData.humidMax) {
      newErrors.humid = `L'humidité doit être entre ${formData.humidMin}% et ${formData.humidMax}%`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const equipmentData = {
      ...formData,
      derniereActivite: new Date().toISOString(),
    };

    if (isEditMode) {
      updateEquipment(parseInt(id), equipmentData);
    } else {
      addEquipment(equipmentData);
    }

    navigate('/equipments');
  };

  const handleCancel = () => {
    navigate('/equipments');
  };

  if (isEditMode && !existingEquipment) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Équipement non trouvé</h2>
        <button onClick={() => navigate('/equipments')} className="text-primary hover:text-blue-700">
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Retour"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Modifier l\'équipement' : 'Nouvel équipement'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditMode ? 'Modifier les informations de l\'équipement' : 'Ajouter un nouvel équipement au système'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations de base</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'équipement *
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.nom ? 'border-critical' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="Ex: Camion Transport 01"
                />
                {errors.nom && <p className="text-critical text-sm mt-1">{errors.nom}</p>}
              </div>

              {/* Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type d'équipement *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="camion">Camion</option>
                  <option value="chambre_froide_1">Chambre froide 1</option>
                  <option value="chambre_froide_2">Chambre froide 2</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                  Statut *
                </label>
                <select
                  id="statut"
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="actif">Actif</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="hors_service">Hors service</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="localisation" className="block text-sm font-medium text-gray-700 mb-1">
                  Localisation
                </label>
                <input
                  type="text"
                  id="localisation"
                  name="localisation"
                  value={formData.localisation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: Entrepôt A, Zone 3"
                />
              </div>
            </div>
          </div>

          {/* Temperature Settings */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Paramètres de température</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Current Temperature */}
              <div>
                <label htmlFor="temp" className="block text-sm font-medium text-gray-700 mb-1">
                  Température actuelle (°C) *
                </label>
                <input
                  type="number"
                  id="temp"
                  name="temp"
                  value={formData.temp}
                  onChange={handleChange}
                  step="0.1"
                  className={`w-full px-4 py-2 border ${
                    errors.temp ? 'border-critical' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.temp && <p className="text-critical text-sm mt-1">{errors.temp}</p>}
              </div>

              {/* Min Temperature */}
              <div>
                <label htmlFor="tempMin" className="block text-sm font-medium text-gray-700 mb-1">
                  Température min (°C) *
                </label>
                <input
                  type="number"
                  id="tempMin"
                  name="tempMin"
                  value={formData.tempMin}
                  onChange={handleChange}
                  step="0.1"
                  className={`w-full px-4 py-2 border ${
                    errors.tempMin ? 'border-critical' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.tempMin && <p className="text-critical text-sm mt-1">{errors.tempMin}</p>}
              </div>

              {/* Max Temperature */}
              <div>
                <label htmlFor="tempMax" className="block text-sm font-medium text-gray-700 mb-1">
                  Température max (°C) *
                </label>
                <input
                  type="number"
                  id="tempMax"
                  name="tempMax"
                  value={formData.tempMax}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Humidity Settings */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Paramètres d'humidité</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Current Humidity */}
              <div>
                <label htmlFor="humid" className="block text-sm font-medium text-gray-700 mb-1">
                  Humidité actuelle (%) *
                </label>
                <input
                  type="number"
                  id="humid"
                  name="humid"
                  value={formData.humid}
                  onChange={handleChange}
                  step="1"
                  min="0"
                  max="100"
                  className={`w-full px-4 py-2 border ${
                    errors.humid ? 'border-critical' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.humid && <p className="text-critical text-sm mt-1">{errors.humid}</p>}
              </div>

              {/* Min Humidity */}
              <div>
                <label htmlFor="humidMin" className="block text-sm font-medium text-gray-700 mb-1">
                  Humidité min (%) *
                </label>
                <input
                  type="number"
                  id="humidMin"
                  name="humidMin"
                  value={formData.humidMin}
                  onChange={handleChange}
                  step="1"
                  min="0"
                  max="100"
                  className={`w-full px-4 py-2 border ${
                    errors.humidMin ? 'border-critical' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.humidMin && <p className="text-critical text-sm mt-1">{errors.humidMin}</p>}
              </div>

              {/* Max Humidity */}
              <div>
                <label htmlFor="humidMax" className="block text-sm font-medium text-gray-700 mb-1">
                  Humidité max (%) *
                </label>
                <input
                  type="number"
                  id="humidMax"
                  name="humidMax"
                  value={formData.humidMax}
                  onChange={handleChange}
                  step="1"
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X size={20} />
              <span>Annuler</span>
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={20} />
              <span>{isEditMode ? 'Enregistrer' : 'Créer'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EquipmentForm;
