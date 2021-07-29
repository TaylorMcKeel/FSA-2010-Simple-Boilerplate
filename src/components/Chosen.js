import React from "react";
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {loadCurr, deleteCurr} from '../store/curr'
import {addFave} from '../store/faves'
import {Directions} from './Directions'
import {Button} from '@material-ui/core'


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
      <div class='chosenBox'>
        <h2 class='congrats'>Congratulations you have chosen</h2>
        <h2 class='resName'>{chosen.name}</h2>
        <div class='chosenBox'>
          <div class='imgAndMap'>
            <img class='chosenImg' src={chosen.imgurl}/>
            <Directions chosen={chosen}/>
          </div>
          <div class='chosenInfoBox'>
            <p><span class='cardUnder'>Rating:</span> {chosen.rating} ({chosen.reviews} reviews)</p>
            <p><span class='cardUnder'>Price:</span> {chosen.price}</p>
            <p><span class='cardUnder'>Phone Number:</span> {chosen.phone}</p>
            <div class='cardAddy'>
              <p><span class='cardUnder'>Address:</span></p>
              <div class='addyInfo'>
                <p> {chosen.address}</p>
                <p>{chosen.city}, {chosen.state} {chosen.zipcode}</p>
              </div>
            </div>
          </div>
          <div class='faveButtonBox'>
            <Button className='faveButton'><a className='goNow' href={chosen.website}>Make a Reservation</a></Button>
            {!this.state.fave ? 
              <Button className='faveButton' onClick={this.addNewFave}>Save for Later</Button> 
            : 
              <Button className='faveButton'>Saved</Button>
            }
            <Button className='faveButton' onClick={this.removeChosen}><Link className='goNow' to='/cards'>Start Over</Link></Button>
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
