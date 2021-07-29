import React from "react";
import {loadFaves, deleteFave} from '../store/faves'
import {addCurr} from '../store/curr'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {Button} from '@material-ui/core'



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
    console.log(ev.target.parentElement.id)
    await this.props.deleteFave(ev.target.parentElement.id)
    const state = this.state.faves.filter(res => res.name !== ev.target.parentElement.id)
    this.setState({faves: state})
  }
  goNow(ev){
    const curr = this.state.faves.filter(res => res.name === ev.target.id)
    this.props.addCurr(curr[0])
  }

  render() {
    const {faves} =this.state
    return(
      <div class='faveBox'>
        <h3 class='faveHeader'>Your Favorites!</h3>
        <ul class='faveCardBox'>
          {faves.map((res)=>{
            return(
              <div key={res.id} class='cardBox'>
                <h2 class='cardHeader'>{res.name}</h2>
                <img class='cardImg' src={res.imgurl}/>
                <div class='cardInfoBox'>
                  <p><span class='cardUnder'>Rating:</span> {res.rating} ({res.reviews} reviews)</p>
                  <p><span class='cardUnder'>Price:</span> {res.price}</p>
                  <p><span class='cardUnder'>Phone Number:</span> {res.phone}</p>
                  <div class='cardAddy'>
                    <p><span class='cardUnder'>Address:</span></p>
                    <div class='addyInfo'>
                      <p> {res.address}</p>
                      <p>{res.city}, {res.state} {res.zipcode}</p>
                    </div>
                  </div>
                </div>
                <div class='faveButtonBox'>
                  <Button className='faveButton' id={res.name} onClick={(ev)=>this.removeFave(ev)}>Remove from Favorite</Button>
                  <Button id={res.name} className='faveButton' onClick={(ev)=>this.goNow(ev)}><Link  className='goNow' to='/chosen'>Go Now</Link></Button>
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