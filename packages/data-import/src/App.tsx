import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DataImportPage from './pages/DataImportPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DataImportPage />} />
    </Routes>
  );
};

export default App;