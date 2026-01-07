# OPC UA TrackLab 4 - Dashboard React

Système de surveillance et traçabilité pour équipements de transport et stockage réfrigérés.

## 🚀 Fonctionnalités

### Phase 1 (MVP)
- ✅ **Dashboard Principal** - Vue d'ensemble temps réel avec KPIs, équipements, alertes et événements
- ✅ **Page Détail Équipement** - Informations complètes, graphiques, statistiques et maintenance
- ✅ **Graphiques Historiques** - Visualisation évolution température/humidité avec filtres avancés

### Phase 2
- ✅ **Gestion Équipements** - CRUD complet avec recherche et filtres (vue grille/tableau)
- ✅ **Parcours Lot** - Traçabilité complète avec timeline interactive
- ✅ **Alertes & Notifications** - Centralisation et gestion des alertes avec statistiques

## 🛠️ Technologies

- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand
- **Icons**: Lucide React

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Preview du build de production
npm run preview
```

## 🎨 Structure du Projet

```
opc-ua-dashboard/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── AlertBadge.jsx
│   │   ├── EquipmentCard.jsx
│   │   ├── StatCard.jsx
│   │   ├── TemperatureGauge.jsx
│   │   ├── TimelineEvent.jsx
│   │   └── Toast.jsx
│   ├── data/               # Données mockées
│   │   └── mockData.js
│   ├── layouts/            # Layouts
│   │   └── MainLayout.jsx
│   ├── pages/              # Pages de l'application
│   │   ├── Alerts.jsx
│   │   ├── Charts.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EquipmentDetail.jsx
│   │   ├── EquipmentManagement.jsx
│   │   ├── LotTracking.jsx
│   │   └── Settings.jsx
│   ├── store/              # État global (Zustand)
│   │   └── useStore.js
│   ├── App.jsx             # Point d'entrée routing
│   └── main.jsx            # Point d'entrée React
├── tailwind.config.js      # Configuration Tailwind
└── package.json
```

## 📊 Données Mockées

Le prototype utilise des données fictives pour démonstration :
- 5 équipements (3 camions, 2 chambres froides)
- 5 lots avec parcours complets
- 7 alertes de différents types
- Historique de maintenance
- Événements récents

## 🎯 Pages et Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Vue d'ensemble système |
| `/charts` | Graphiques | Visualisation historique |
| `/equipment/:id` | Détail Équipement | Informations détaillées |
| `/equipments` | Gestion Équipements | CRUD équipements |
| `/lots` | Liste Lots | Tous les lots |
| `/lot/:id` | Parcours Lot | Traçabilité complète |
| `/alerts` | Alertes | Gestion alertes |
| `/settings` | Paramètres | Configuration |

## 🎨 Palette de Couleurs

- **Primaire** (`primary`): #1E3A8A (Bleu foncé)
- **Secondaire** (`secondary`): #06B6D4 (Cyan)
- **Alerte** (`alert`): #F59E0B (Orange)
- **Critique** (`critical`): #DC2626 (Rouge)
- **Succès** (`success`): #10B981 (Vert)
- **Background**: #F3F4F6 (Gris clair)

## 🔧 Configuration

### Tailwind CSS
Le fichier `tailwind.config.js` contient la configuration des couleurs personnalisées.

### Zustand Store
L'état global gère :
- Liste des équipements
- Liste des lots
- Liste des alertes
- Événements récents
- Actions CRUD

## 📱 Responsive Design

L'application est entièrement responsive :
- **Desktop** : Sidebar fixe, layout 3 colonnes
- **Tablet** : Sidebar collapsible, layout 2 colonnes
- **Mobile** : Menu hamburger, layout 1 colonne

## 🎓 Composants Réutilisables

### TemperatureGauge
Jauge semi-circulaire avec zones colorées selon seuils.

```jsx
<TemperatureGauge
  value={3.2}
  min={2}
  max={8}
  size="lg"
/>
```

### EquipmentCard
Carte affichant un équipement avec température, humidité et statut.

```jsx
<EquipmentCard equipment={equipmentData} />
```

### StatCard
Carte KPI avec icône, valeur et tendance.

```jsx
<StatCard
  title="Lots en transit"
  value={12}
  icon={Package}
  color="primary"
/>
```

## 🚀 Évolutions Possibles (Phase 3)

- [ ] Connexion WebSocket pour données temps réel
- [ ] Export PDF des rapports
- [ ] Carte interactive avec itinéraires
- [ ] Authentification utilisateurs
- [ ] Multi-langue complet
- [ ] Mode sombre
- [ ] Notifications push navigateur
- [ ] Intégration API OPC UA

## 📝 Notes de Développement

- Les données sont entièrement mockées dans `src/data/mockData.js`
- Aucune connexion backend requise pour le prototype
- Les graphiques utilisent des données générées aléatoirement basées sur les valeurs actuelles
- Les actions CRUD modifient uniquement l'état local (pas de persistance)

## 🤝 Contribution

Ce projet est un template/prototype pour démonstration.

## 📄 Licence

MIT
