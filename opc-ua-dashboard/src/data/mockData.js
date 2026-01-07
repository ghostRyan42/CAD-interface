// Mock data for OPC UA TrackLab 4 Dashboard

export const equipments = [
  {
    id: 1,
    nom: "Camion_01",
    type: "camion",
    temp: 3.2,
    humid: 45,
    statut: "actif",
    lat: 48.4,
    lon: -4.5,
    capacite: "15 palettes",
    seuilTempMin: 2,
    seuilTempMax: 8,
    frequenceMesure: 30,
    derniereActivite: "2024-01-07 14:30:00",
    lotActuel: "LOT-2024-001",
    uptime: 98.5,
    nbLotsTraites: 45,
    nbAlertes: 3,
    heuresFonctionnement: 1240
  },
  {
    id: 2,
    nom: "ChambreFroide_A1",
    type: "chambre_froide_1",
    temp: -18.5,
    humid: 60,
    statut: "actif",
    capacite: "50 palettes",
    seuilTempMin: -20,
    seuilTempMax: -15,
    frequenceMesure: 60,
    derniereActivite: "2024-01-07 14:28:00",
    lotActuel: "LOT-2024-003",
    uptime: 99.2,
    nbLotsTraites: 120,
    nbAlertes: 1,
    heuresFonctionnement: 8760
  },
  {
    id: 3,
    nom: "ChambreFroide_B2",
    type: "chambre_froide_2",
    temp: 2.1,
    humid: 55,
    statut: "maintenance",
    capacite: "30 palettes",
    seuilTempMin: 0,
    seuilTempMax: 4,
    frequenceMesure: 45,
    derniereActivite: "2024-01-07 09:00:00",
    lotActuel: null,
    uptime: 95.8,
    nbLotsTraites: 85,
    nbAlertes: 5,
    heuresFonctionnement: 6240
  },
  {
    id: 4,
    nom: "Camion_02",
    type: "camion",
    temp: 4.8,
    humid: 50,
    statut: "actif",
    lat: 48.6,
    lon: -4.3,
    capacite: "20 palettes",
    seuilTempMin: 2,
    seuilTempMax: 8,
    frequenceMesure: 30,
    derniereActivite: "2024-01-07 14:29:00",
    lotActuel: "LOT-2024-002",
    uptime: 97.3,
    nbLotsTraites: 38,
    nbAlertes: 2,
    heuresFonctionnement: 980
  },
  {
    id: 5,
    nom: "ChambreFroide_C3",
    type: "chambre_froide_1",
    temp: -19.2,
    humid: 58,
    statut: "actif",
    capacite: "45 palettes",
    seuilTempMin: -20,
    seuilTempMax: -15,
    frequenceMesure: 60,
    derniereActivite: "2024-01-07 14:30:00",
    lotActuel: "LOT-2024-005",
    uptime: 99.5,
    nbLotsTraites: 95,
    nbAlertes: 0,
    heuresFonctionnement: 7200
  }
];

export const lots = [
  {
    id: "LOT-2024-001",
    produit: "Vaccins",
    dateProduction: "2024-01-05T08:00:00",
    ttlRestant: 72,
    ttlTotal: 120,
    statut: "transport",
    equipementActuel: "Camion_01",
    parcours: [
      {
        etape: "Production",
        type: "production",
        dateDebut: "2024-01-05T08:00:00",
        dateFin: "2024-01-05T12:00:00",
        equipement: "Ligne_Production_1",
        tempMin: 22,
        tempMax: 24,
        tempMoy: 23
      },
      {
        etape: "Stockage chambre froide",
        type: "stockage",
        dateDebut: "2024-01-05T12:30:00",
        dateFin: "2024-01-06T08:00:00",
        equipement: "ChambreFroide_A1",
        tempMin: -18.8,
        tempMax: -17.5,
        tempMoy: -18.2
      },
      {
        etape: "Chargement camion",
        type: "transfert",
        dateDebut: "2024-01-06T08:00:00",
        dateFin: "2024-01-06T08:45:00",
        equipement: "Quai_1",
        tempMin: 5,
        tempMax: 8,
        tempMoy: 6.5
      },
      {
        etape: "Transport",
        type: "transport",
        dateDebut: "2024-01-06T09:00:00",
        dateFin: null,
        equipement: "Camion_01",
        tempMin: 2.8,
        tempMax: 4.5,
        tempMoy: 3.5,
        enCours: true
      }
    ],
    distanceParcourue: 245,
    nbTransferts: 3,
    conformite: true
  },
  {
    id: "LOT-2024-002",
    produit: "Produits laitiers",
    dateProduction: "2024-01-06T06:00:00",
    ttlRestant: 156,
    ttlTotal: 168,
    statut: "transport",
    equipementActuel: "Camion_02",
    parcours: [
      {
        etape: "Production",
        type: "production",
        dateDebut: "2024-01-06T06:00:00",
        dateFin: "2024-01-06T10:00:00",
        equipement: "Ligne_Production_2",
        tempMin: 4,
        tempMax: 6,
        tempMoy: 5
      },
      {
        etape: "Transport",
        type: "transport",
        dateDebut: "2024-01-06T10:30:00",
        dateFin: null,
        equipement: "Camion_02",
        tempMin: 3.8,
        tempMax: 5.2,
        tempMoy: 4.5,
        enCours: true
      }
    ],
    distanceParcourue: 180,
    nbTransferts: 1,
    conformite: true
  },
  {
    id: "LOT-2024-003",
    produit: "Vaccins",
    dateProduction: "2024-01-04T14:00:00",
    ttlRestant: 48,
    ttlTotal: 120,
    statut: "stockage",
    equipementActuel: "ChambreFroide_A1",
    parcours: [
      {
        etape: "Production",
        type: "production",
        dateDebut: "2024-01-04T14:00:00",
        dateFin: "2024-01-04T18:00:00",
        equipement: "Ligne_Production_1",
        tempMin: 21,
        tempMax: 23,
        tempMoy: 22
      },
      {
        etape: "Stockage chambre froide",
        type: "stockage",
        dateDebut: "2024-01-04T18:30:00",
        dateFin: null,
        equipement: "ChambreFroide_A1",
        tempMin: -19.0,
        tempMax: -17.8,
        tempMoy: -18.5,
        enCours: true
      }
    ],
    distanceParcourue: 0,
    nbTransferts: 1,
    conformite: true
  },
  {
    id: "LOT-2024-004",
    produit: "Médicaments",
    dateProduction: "2024-01-03T10:00:00",
    ttlRestant: 8,
    ttlTotal: 96,
    statut: "livré",
    equipementActuel: null,
    parcours: [
      {
        etape: "Production",
        type: "production",
        dateDebut: "2024-01-03T10:00:00",
        dateFin: "2024-01-03T14:00:00",
        equipement: "Ligne_Production_3",
        tempMin: 20,
        tempMax: 22,
        tempMoy: 21
      },
      {
        etape: "Stockage chambre froide",
        type: "stockage",
        dateDebut: "2024-01-03T14:30:00",
        dateFin: "2024-01-05T08:00:00",
        equipement: "ChambreFroide_B2",
        tempMin: 1.8,
        tempMax: 3.2,
        tempMoy: 2.5
      },
      {
        etape: "Transport",
        type: "transport",
        dateDebut: "2024-01-05T08:30:00",
        dateFin: "2024-01-06T16:00:00",
        equipement: "Camion_01",
        tempMin: 2.5,
        tempMax: 4.8,
        tempMoy: 3.6
      },
      {
        etape: "Livraison",
        type: "livraison",
        dateDebut: "2024-01-06T16:00:00",
        dateFin: "2024-01-06T16:30:00",
        equipement: "Point_Livraison_A",
        tempMin: 3,
        tempMax: 5,
        tempMoy: 4
      }
    ],
    distanceParcourue: 320,
    nbTransferts: 4,
    conformite: true
  },
  {
    id: "LOT-2024-005",
    produit: "Vaccins",
    dateProduction: "2024-01-06T09:00:00",
    ttlRestant: 96,
    ttlTotal: 120,
    statut: "stockage",
    equipementActuel: "ChambreFroide_C3",
    parcours: [
      {
        etape: "Production",
        type: "production",
        dateDebut: "2024-01-06T09:00:00",
        dateFin: "2024-01-06T13:00:00",
        equipement: "Ligne_Production_1",
        tempMin: 22,
        tempMax: 24,
        tempMoy: 23
      },
      {
        etape: "Stockage chambre froide",
        type: "stockage",
        dateDebut: "2024-01-06T13:30:00",
        dateFin: null,
        equipement: "ChambreFroide_C3",
        tempMin: -19.5,
        tempMax: -18.8,
        tempMoy: -19.2,
        enCours: true
      }
    ],
    distanceParcourue: 0,
    nbTransferts: 1,
    conformite: true
  }
];

export const alerts = [
  {
    id: 1,
    type: "temperature",
    severite: "critical",
    equipement: "Camion_01",
    equipementId: 1,
    message: "Température hors plage acceptable",
    description: "La température a dépassé le seuil maximum de 8°C",
    valeur: 8.2,
    timestamp: "2024-01-07T14:23:15",
    statut: "active",
    acquittePar: null,
    commentaire: null
  },
  {
    id: 2,
    type: "maintenance",
    severite: "warning",
    equipement: "ChambreFroide_A1",
    equipementId: 2,
    message: "Maintenance prévue dans 2 jours",
    description: "Maintenance préventive planifiée pour le 09/01/2024",
    valeur: null,
    timestamp: "2024-01-07T09:00:00",
    statut: "active",
    acquittePar: null,
    commentaire: null
  },
  {
    id: 3,
    type: "humidity",
    severite: "warning",
    equipement: "ChambreFroide_B2",
    equipementId: 3,
    message: "Humidité élevée détectée",
    description: "L'humidité a dépassé 65%",
    valeur: 67,
    timestamp: "2024-01-07T08:45:00",
    statut: "acquittee",
    acquittePar: "Opérateur_1",
    commentaire: "Système de ventilation ajusté"
  },
  {
    id: 4,
    type: "state",
    severite: "info",
    equipement: "ChambreFroide_B2",
    equipementId: 3,
    message: "Équipement mis en maintenance",
    description: "Maintenance programmée en cours",
    valeur: null,
    timestamp: "2024-01-07T09:00:00",
    statut: "active",
    acquittePar: null,
    commentaire: null
  },
  {
    id: 5,
    type: "temperature",
    severite: "warning",
    equipement: "Camion_02",
    equipementId: 4,
    message: "Température proche du seuil",
    description: "La température approche du seuil maximum",
    valeur: 7.5,
    timestamp: "2024-01-07T13:30:00",
    statut: "resolue",
    acquittePar: "Opérateur_2",
    commentaire: "Température revenue à la normale"
  },
  {
    id: 6,
    type: "connection",
    severite: "critical",
    equipement: "Camion_01",
    equipementId: 1,
    message: "Perte de connexion",
    description: "Connexion au capteur OPC UA perdue pendant 3 minutes",
    valeur: null,
    timestamp: "2024-01-07T12:15:00",
    statut: "resolue",
    acquittePar: "Opérateur_1",
    commentaire: "Reconnexion automatique effectuée"
  },
  {
    id: 7,
    type: "temperature",
    severite: "info",
    equipement: "ChambreFroide_C3",
    equipementId: 5,
    message: "Température optimale",
    description: "La température est dans la plage optimale",
    valeur: -19.2,
    timestamp: "2024-01-07T14:00:00",
    statut: "active",
    acquittePar: null,
    commentaire: null
  }
];

// Generate historical temperature data for charts
export const generateHistoricalData = (equipmentId, hours = 24) => {
  const data = [];
  const now = new Date();
  const equipment = equipments.find(e => e.id === equipmentId);

  if (!equipment) return data;

  const baseTemp = equipment.temp;
  const tempVariation = 2;
  const baseHumid = equipment.humid;
  const humidVariation = 5;

  for (let i = hours * 12; i >= 0; i--) { // Every 5 minutes
    const timestamp = new Date(now - i * 5 * 60 * 1000);
    const randomTemp = baseTemp + (Math.random() - 0.5) * tempVariation;
    const randomHumid = baseHumid + (Math.random() - 0.5) * humidVariation;

    data.push({
      timestamp: timestamp.toISOString(),
      temperature: parseFloat(randomTemp.toFixed(1)),
      humidity: parseFloat(randomHumid.toFixed(1)),
      equipmentId: equipmentId,
      equipmentName: equipment.nom
    });
  }

  return data;
};

// Events timeline data
export const recentEvents = [
  {
    id: 1,
    type: "alert",
    icon: "AlertTriangle",
    message: "Alerte température sur Camion_01",
    timestamp: "2024-01-07T14:23:15",
    severity: "critical"
  },
  {
    id: 2,
    type: "lot",
    icon: "Package",
    message: "Nouveau lot LOT-2024-005 créé",
    timestamp: "2024-01-07T13:00:00",
    severity: "info"
  },
  {
    id: 3,
    type: "maintenance",
    icon: "Settings",
    message: "ChambreFroide_B2 mis en maintenance",
    timestamp: "2024-01-07T09:00:00",
    severity: "warning"
  },
  {
    id: 4,
    type: "delivery",
    icon: "CheckCircle",
    message: "Livraison réussie du lot LOT-2024-004",
    timestamp: "2024-01-06T16:30:00",
    severity: "success"
  },
  {
    id: 5,
    type: "transport",
    icon: "Truck",
    message: "Camion_02 démarré avec lot LOT-2024-002",
    timestamp: "2024-01-06T10:30:00",
    severity: "info"
  }
];

export const maintenanceHistory = {
  1: [ // Camion_01
    {
      date: "2023-12-15T10:00:00",
      type: "Maintenance préventive",
      description: "Vérification système de refroidissement",
      technicien: "Tech_01",
      duree: 2
    },
    {
      date: "2023-11-20T14:00:00",
      type: "Réparation",
      description: "Remplacement capteur température",
      technicien: "Tech_02",
      duree: 3
    }
  ],
  2: [ // ChambreFroide_A1
    {
      date: "2024-01-02T08:00:00",
      type: "Maintenance préventive",
      description: "Contrôle général système",
      technicien: "Tech_01",
      duree: 4
    },
    {
      date: "2023-10-15T09:00:00",
      type: "Calibration",
      description: "Calibration capteurs",
      technicien: "Tech_03",
      duree: 2
    }
  ],
  3: [ // ChambreFroide_B2
    {
      date: "2024-01-07T09:00:00",
      type: "Maintenance corrective",
      description: "Maintenance en cours",
      technicien: "Tech_02",
      duree: null,
      enCours: true
    },
    {
      date: "2023-12-01T10:00:00",
      type: "Maintenance préventive",
      description: "Vérification système ventilation",
      technicien: "Tech_01",
      duree: 3
    }
  ],
  4: [ // Camion_02
    {
      date: "2023-12-20T11:00:00",
      type: "Maintenance préventive",
      description: "Contrôle système refroidissement",
      technicien: "Tech_03",
      duree: 2
    }
  ],
  5: [ // ChambreFroide_C3
    {
      date: "2023-12-28T08:00:00",
      type: "Maintenance préventive",
      description: "Maintenance générale",
      technicien: "Tech_01",
      duree: 4
    }
  ]
};
