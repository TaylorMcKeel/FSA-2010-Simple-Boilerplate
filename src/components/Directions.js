import React from "react";
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, DirectionsRenderer, withScriptjs, Marker, InfoWindow} from 'react-google-maps';

const MAP_API = process.env.MAP_KEY

const Map = withScriptjs(withGoogleMap((props) =>{  
  const chosen = props.chosen  
  console.log(chosen)
    return (
      <GoogleMap zoom={14} center={ { lat:  chosen.lat*1, lng: chosen.long*1 } } >
            <div>
              <Marker key={chosen.id} position={{lat: chosen.lat*1, lng: chosen.long*1}} />
              <InfoWindow
                 position={{
                    lat: chosen.lat*1,
                    lng: chosen.long*1
                 }}
              >
                <div>
                  <h5>{chosen.name}</h5>
                </div>
              </InfoWindow>
            </div>
      </GoogleMap>
    )  
}))



export class Directions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
   
  }
  componentDidMount(){
   
  }
 
  
  render() {
    
    return(
      <div className="map-container">
        <Map
           chosen={this.props.chosen}
          //  marker= {this.state.selectedMarker}
           googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API}&v=3.exp&libraries=geometry,drawing,places`}
           loadingElement={<div style={{ height: `100%` }} />}
           containerElement={<div style={{ height: `300px`, width: `400px` }} />}
           mapElement={<div style={{ height: `300px`, width:'400px' }} />}
        />
       </div>
    )
        
  }
}

const mapState = ({curr}) => {
  return {
    curr: curr,
  }
};

const mapDispatch = dispatch => {
  return {
    loadCurr: ()=> dispatch(loadCurr()),
    deleteCurr: (info)=>dispatch(deleteCurr(info)),
  }
};


export default connect(mapState, mapDispatch)(Directions);


