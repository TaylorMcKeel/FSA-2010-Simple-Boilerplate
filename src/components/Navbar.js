import React from "react";
import { Link } from "react-router-dom";
import { deleteCurr, loadCurr} from '../store/curr'
import { connect } from 'react-redux';
import {Button} from '@material-ui/core'

export class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      curr: null
    }
    this.removeChosen = this.removeChosen.bind(this)
  }
  async componentDidMount(){
    await this.props.loadCurr()
    const one = this.props.curr.curr
    const chosen = {...one[one.length - 1]}
    this.setState({curr: chosen})
  }
  removeChosen(){
    this.props.deleteCurr(this.state.curr)
    this.setState({curr: null})
  }
  
  render() {
    return(
      <div class='mainNav'>
        <h1><Link className='mainNext' onClick ={this.removeChosen} to='/'>NE<span class='redx'>X</span>Taurant</Link></h1>
        <div class='navButtonBox'>
          <Button><Link className='navButton' onClick ={this.removeChosen} to='/cards'>Search</Link></Button>
          <Button><Link className='navButton' onClick ={this.removeChosen} to='/faves'>Favorites</Link></Button>
        </div>
        <hr/>
      </div>
    )
        
  }
}


const mapState = ({curr}) => {
  return {
    curr: curr
   }
};

const mapDispatch = dispatch => {
  return {
    deleteCurr: (info)=>dispatch(deleteCurr(info)),
    loadCurr: ()=> dispatch(loadCurr()),
  }
};


export default connect(mapState, mapDispatch)(NavBar);
