import React from "react";
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';

export class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
   
  }

 
  
  render() {
    return(
      <div class='homeBox'>
        <h1>Welcome to NE<span class='redx'>X</span>Taurants</h1>
        <p>Based on the popular MTV show NEXT combined with the swipping technology of Tinder, NEXTaurants makes choosing a restaurant easier by taking away the endless options. Just swipe left if you wanna NEXT, or swipe right if you're ready to eat!</p>
      </div>
    )
        
  }
}


export default (Home);
