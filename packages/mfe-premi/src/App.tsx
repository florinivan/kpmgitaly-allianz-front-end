import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PremiumPage from './pages/PremiumPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PremiumPage />} />
    </Routes>
  );
};

export default App;