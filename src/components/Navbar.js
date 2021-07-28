import React from "react";
import { Link } from "react-router-dom";
import { deleteCurr, loadCurr} from '../store/curr'
import { connect } from 'react-redux';


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
      <div>
        <h1><Link onClick ={this.removeChosen} to='/'>NEXTaurant</Link></h1>
        <div>
          <h4><Link onClick ={this.removeChosen} to='/cards'>Search</Link></h4>
          <h4><Link onClick ={this.removeChosen} to='/faves'>Favorites</Link></h4>
        </div>
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
