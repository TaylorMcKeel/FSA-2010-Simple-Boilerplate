import React from "react";
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import { connect } from 'react-redux';


export class Directions extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
   
  }

 
  
  render() {
    return(
      <div></div>
    )
        
  }
}

export default (Directions);

 // else if(this.state.next === true && this.state.map === false){
    //   return(
    //     <div id='main'>
    //       <h2>{res.name}</h2>
    //       <div>
    //         <button onClick={()=>{this.setState({map: true})}}>Get Directions</button>
    //         <button ><a href={res.url}>Make a Reservation</a></button>
    //       </div>
    //     </div> 
    //   )
    // }else if(this.state.map === true){
    //   const Directions = withGoogleMap(() => (
    //     <GoogleMap defaultCenter = { { lat: 40.756795, lng: -73.954298 } } defaultZoom = { 13 }>
    //       <DirectionsRenderer directions={this.state.directions}/>
    //     </GoogleMap>
    //   ));
    //   const directionsService = new google.maps.DirectionsService();

    //   const origin = { lat: this.state.lat, lng: this.state.long };
    //   const destination = { lat: res.coordinates.latitude, lng: res.coordinates.longitude };

    //   directionsService.route(
    //     {
    //       origin: origin,
    //       destination: destination,
    //       travelMode: google.maps.TravelMode.TRANSIT
    //     },
    //     (result, status) => {
    //       if (status === google.maps.DirectionsStatus.OK) {
    //         this.setState({
    //           directions: result
    //         });
    //       } else {
    //         console.error(`error fetching directions ${result}`);
    //       }
    //     }
    //   );
    //   return(
    //     <div>
    //       <Directions containerElement={ <div style={{ height: `500px`, width: '500px' }} /> } mapElement={ <div style={{ height: `100%` }} /> }/>
    //     </div>
    //   );
    //  }
