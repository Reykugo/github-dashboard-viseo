import React from 'react';

import Navbar from "./navbar/Navbar";
import Routes from '../routes';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Routes />
    </div>
  );
}

export default App;
