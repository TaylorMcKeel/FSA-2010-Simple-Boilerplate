import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import {
	Cards,
  Chosen,
  Directions,
  Home
} from "./components";

export class Routes extends Component{
  render(){
    return(
      <Switch>
        <Route path='/cards' component={Cards}/>
        <Route path='/chosen' component={Chosen}/>
        <Route path='/directions' component={Directions}/>
        <Route path='/' component={Home}/>
        <Redirect to='/'/>
      </Switch>
    )
  }
}

export default (Routes)