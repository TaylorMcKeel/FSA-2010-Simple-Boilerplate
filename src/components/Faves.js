import React from "react";
import axios from 'axios'
import {loadFaves, deleteFave} from '../store/faves'
import {addCurr} from '../store/curr'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';


export class Faves extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      faves: []
    }
    this.goNow = this.goNow.bind(this)
    this.removeFave = this.removeFave.bind(this)
  }
  async componentDidMount(){
    await this.props.loadFaves()
    const one = this.props.faves
    const faves = {...one}
    this.setState({faves: faves.faves})
  }
  async removeFave(ev){
    await this.props.deleteFave(ev.target.id)
    // await this.props.loadFaves()
    const state = this.state.faves.filter(res => res.name !== ev.target.id)
    this.setState({faves: state})
  }
  goNow(ev){
    const curr = this.state.faves.filter(res => res.name === ev.target.id)
    this.props.addCurr(curr[0])
  }

  render() {
    const {faves} =this.state
    return(
      <div>
        <h3>Your Favorites!</h3>
        <ul>
          {faves.map((res)=>{
            return(
              <div key={res.id}>
                <h2>{res.name}</h2>
                <img src={res.imgurl}/>
                <p>Rating: {res.rating} ({res.reviews} reviews)</p>
                <p>Price: {res.price}</p>
                <p>Phone Number: {res.phone}</p>
                <p>Address: {res.address}</p>
                <p>{res.city}, {res.state} {res.zipcode}</p>
                <div>
                  <button id={res.name} onClick={(ev)=>this.removeFave(ev)}>Remove as Favorite</button>
                  <button  onClick={(ev)=>this.goNow(ev)}><Link id ={res.name} to='/chosen'>Go Now</Link></button>
                </div>
              </div>
            )
          })}
        </ul>
      </div>
    )
        
  }
}

const mapState = ({faves}) => {
  return {
    faves:faves
  }
};

const mapDispatch = (dispatch) => {
  return {
    loadFaves: ()=> dispatch(loadFaves()),
    deleteFave: (info)=> dispatch(deleteFave(info)),
    addCurr: (info)=> dispatch(addCurr(info))
  }
};


export default connect(mapState, mapDispatch)(Faves);