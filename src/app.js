import React from 'react';
import { HashRouter} from "react-router-dom";

import {Routes} from './Routes'
import {NavBar} from './components'

const App = () => {
  return (
    <HashRouter>
      <div>
        <NavBar/>
        <Routes/>
      </div>
    </HashRouter>

  );
};

export default App;
