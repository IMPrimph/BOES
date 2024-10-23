import React, { useState } from 'react';
import TrafficCalculator from './components/TrafficCalculator';
import StorageCalculator from './components/StorageCalculator';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [activeTab, setActiveTab] = useState('traffic');

  return (
    <div className="app">
      <h1>System Design Estimation Tool</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab('traffic')}>Traffic Calculator</button>
        <button onClick={() => setActiveTab('storage')}>Storage Calculator</button>
      </div>
      <div className="calculator">
        {activeTab === 'traffic' ? <TrafficCalculator /> : <StorageCalculator />}
      </div>
    </div>
  );
};

export default App;
