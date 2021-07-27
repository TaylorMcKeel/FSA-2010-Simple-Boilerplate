import React from "react";
import { Link } from "react-router-dom";

import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';

export class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
   
  }

 
  
  render() {
    return(
      <div>
        <h1><Link to='/'>NEXTaurant</Link></h1>
        <div>
          <h4><Link to='/cards'>Search</Link></h4>
          <h4><Link to='/faves'>Favorites</Link></h4>
        </div>
      </div>
    )
        
  }
}




export default (NavBar);
