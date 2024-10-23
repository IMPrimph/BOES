import React, { useState } from 'react';
import TrafficCalculator from './components/TrafficCalculator';
import StorageCalculator from './components/StorageCalculator';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [activeTab, setActiveTab] = useState('traffic');

  return (
    <div className="app-container">
      <Header />
      <div className="tabs main-content">
        <button onClick={() => setActiveTab('traffic')}>Traffic Calculator</button>
        <button onClick={() => setActiveTab('storage')}>Storage Calculator</button>
      </div>
      <div className="calculator">
        {activeTab === 'traffic' ? <TrafficCalculator /> : <StorageCalculator />}
      </div>
      <Footer />
    </div>
  );
};

export default App;
