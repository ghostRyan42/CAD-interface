import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Charts from './pages/Charts';
import EquipmentDetail from './pages/EquipmentDetail';
import EquipmentManagement from './pages/EquipmentManagement';
import EquipmentForm from './pages/EquipmentForm';
import LotTracking, { LotsPage } from './pages/LotTracking';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="charts" element={<Charts />} />
          <Route path="equipment/:id" element={<EquipmentDetail />} />
          <Route path="equipments" element={<EquipmentManagement />} />
          <Route path="equipments/new" element={<EquipmentForm />} />
          <Route path="equipments/edit/:id" element={<EquipmentForm />} />
          <Route path="lots" element={<LotsPage />} />
          <Route path="lot/:id" element={<LotTracking />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
