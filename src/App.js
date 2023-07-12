import { Scheduler } from "./pages/Scheduler";
import React from 'react';
import './App.css';
import { Axiostest } from "./pages/Axiostest";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Scheduler />
        {/* <Axiostest /> */}
      </header>
    </div >
  );
}

export default App;
