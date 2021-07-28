import React, { Component } from "react";
import {  Route, Switch, Redirect } from "react-router-dom";
import {
	Cards,
  Chosen,
  Home,
  Faves
} from "./components";

export class Routes extends Component{
  render(){
    
    return(
      <Switch>
        <Route path='/cards' component={Cards}/>
        <Route path='/chosen' component={Chosen}/>
        <Route path='/faves' component={Faves}/>
        <Route path='/' component={Home}/>
        <Redirect to='/'/>
      </Switch>
    )
  }
}

export default (Routes)