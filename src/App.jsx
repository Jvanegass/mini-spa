// src/App.jsx

import React from 'react';
import './assets/css/App.css';
import Citas from './views/citas/citas';

//console.log("App.jsx se está renderizando"); // Línea de prueba

function App() {
  return (
    <div className="App">
      <Citas />
    </div>
  );
}

export default App;
