import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ChecklistPage from './pages/ChecklistPage';
import DestinationsPage from './pages/DestinationsPage';
import ConverterPage from './pages/ConverterPage';
import PlannerPage from './pages/PlannerPage';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="checklist" element={<ChecklistPage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="converter" element={<ConverterPage />} />
          <Route path="planner" element={<PlannerPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;