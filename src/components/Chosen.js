import React from "react";
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {loadCurr, deleteCurr} from '../store/curr'
import {addFave} from '../store/faves'

export class Chosen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chosen: [],
      fave: false
    }
    this.removeChosen = this.removeChosen.bind(this)
    this.addNewFave = this.addNewFave.bind(this)
  }
  async componentDidMount(){
    await this.props.loadCurr()
    const one = this.props.curr.curr
    const chosen = {...one[one.length - 1]}
    this.setState({chosen: chosen})
  }
  removeChosen(){
    this.props.deleteCurr(this.state.chosen)
  }

  addNewFave(){
    this.props.addFave(this.state.chosen)
    this.setState({fave:true})
  }
  
  render() {
    const {chosen} = this.state
    return(
      <div>
        <h3>Congratulations you have chosen</h3>
        <h3>{chosen.name}</h3>
        <div>
          <img src={chosen.imgurl}/>
          <p>Rating: {chosen.rating} ({chosen.reviews} reviews)</p>
          <p>Price: {chosen.price}</p>
          <p>Phone Number: {chosen.phone}</p>
          <p>Address: {chosen.address}</p>
          <p>{chosen.city}, {chosen.state} {chosen.zipcode}</p>
          <div>
            <button ><Link to='/directions'>Get Directions</Link></button>
            <button ><a href={chosen.website}>Make a Reservation</a></button>
            {!this.state.fave ? 
              <button onClick={this.addNewFave}>Save for Later</button> 
            : 
              <button>Saved</button>
            }
            <button onClick={this.removeChosen}><Link to='/cards'>Start Over</Link></button>
          </div>
        </div>
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
    addFave: (info)=> dispatch(addFave(info))
  }
};


export default connect(mapState, mapDispatch)(Chosen);
