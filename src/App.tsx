import React from 'react';
import PersonalInfo from './components/PersonalInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">CV Builder</h1>
        <p className="app-subtitle">Create your professional CV</p>
      </header>
      
      <div className="cv-section">
        <PersonalInfo />
      </div>
      
      <div className="cv-section">
        <Education />
      </div>
      
      <div className="cv-section">
        <Experience />
      </div>
    </div>
  );
};

export default App;
