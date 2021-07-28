import React from 'react';
import { render } from 'react-dom';
import { HashRouter} from "react-router-dom";
import { Provider, connect } from "react-redux";
import store from "./store/index";
import {Routes} from './Routes'
import {NavBar} from './components'

class _App extends React.Component{
  constructor(){
    super()
  }
  render(){
    return (
      <HashRouter>
        <div>
          <NavBar/>
          <Routes/>
        </div>
      </HashRouter>
    );
  }
  
};

const root = document.querySelector('#app');
const App = connect()(_App)

render(
	<Provider store={store}>
		<App />
	</Provider>,
  root
);
