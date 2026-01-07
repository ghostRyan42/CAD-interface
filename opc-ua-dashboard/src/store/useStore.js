import { create } from 'zustand';
import { equipments as initialEquipments, lots as initialLots, alerts as initialAlerts, recentEvents } from '../data/mockData';

const useStore = create((set, get) => ({
  // Equipment state
  equipments: initialEquipments,
  selectedEquipment: null,

  // Lots state
  lots: initialLots,
  selectedLot: null,

  // Alerts state
  alerts: initialAlerts,

  // Events state
  events: recentEvents,

  // Theme state
  isDarkMode: false,

  // Actions
  setSelectedEquipment: (equipment) => set({ selectedEquipment: equipment }),

  setSelectedLot: (lot) => set({ selectedLot: lot }),

  updateEquipmentTemp: (id, temp, humid) => set((state) => ({
    equipments: state.equipments.map(eq =>
      eq.id === id ? { ...eq, temp, humid, derniereActivite: new Date().toISOString() } : eq
    )
  })),

  addAlert: (alert) => set((state) => ({
    alerts: [{ ...alert, id: Date.now() }, ...state.alerts]
  })),

  acknowledgeAlert: (alertId, user, comment) => set((state) => ({
    alerts: state.alerts.map(alert =>
      alert.id === alertId
        ? { ...alert, statut: 'acquittee', acquittePar: user, commentaire: comment }
        : alert
    )
  })),

  resolveAlert: (alertId) => set((state) => ({
    alerts: state.alerts.map(alert =>
      alert.id === alertId ? { ...alert, statut: 'resolue' } : alert
    )
  })),

  addEvent: (event) => set((state) => ({
    events: [{ ...event, id: Date.now() }, ...state.events].slice(0, 50) // Keep last 50 events
  })),

  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // Equipment CRUD operations
  addEquipment: (equipment) => set((state) => ({
    equipments: [...state.equipments, { ...equipment, id: Date.now() }]
  })),

  updateEquipment: (id, updates) => set((state) => ({
    equipments: state.equipments.map(eq =>
      eq.id === id ? { ...eq, ...updates } : eq
    )
  })),

  deleteEquipment: (id) => set((state) => ({
    equipments: state.equipments.filter(eq => eq.id !== id)
  })),

  // Get filtered data
  getActiveAlerts: () => {
    const state = get();
    return state.alerts.filter(alert => alert.statut === 'active');
  },

  getActiveEquipments: () => {
    const state = get();
    return state.equipments.filter(eq => eq.statut === 'actif');
  },

  getCriticalAlerts: () => {
    const state = get();
    return state.alerts.filter(alert =>
      alert.statut === 'active' && alert.severite === 'critical'
    );
  },

  getEquipmentAlerts: (equipmentId) => {
    const state = get();
    return state.alerts.filter(alert => alert.equipementId === equipmentId);
  },

  getLotByEquipment: (equipmentId) => {
    const state = get();
    const equipment = state.equipments.find(eq => eq.id === equipmentId);
    if (!equipment || !equipment.lotActuel) return null;
    return state.lots.find(lot => lot.id === equipment.lotActuel);
  }
}));

export default useStore;
