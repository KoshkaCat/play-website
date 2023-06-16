import './App.css';
import React from "react";
import Page from "./components/Page.tsx";
import Counter from "./components/Counter.tsx"
import Wordle from "./components/Wordle.tsx"

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css"
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';

const App = () => {
  return (
    <div className="App">
      <Page/>
      <Counter/>
      <br/>
      <Wordle/>
    </div>
  );
}

export default App;
