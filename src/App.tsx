import './App.css';
import React from "react";
import Counter from "./components/Counter"
import Wordle from "./components/Wordle"

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css"
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';

const App = () => {
  return (
    <div className="App">
      <Counter/>
      <br/>
      <Wordle/>
    </div>
  );
}

export default App;
