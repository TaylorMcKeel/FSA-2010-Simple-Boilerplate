import React from "react";
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {addCurr} from '../store/curr'
import {addFave, deleteFave} from '../store/faves'
import {Button, TextField} from '@material-ui/core'




export class Cards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: 'NYC',
      categories: '',
      restaurants: [],
      next: false,
      fave: false,
      directions: null,
      lat:40.741895,
      long:-73.989308
    }

    this.chosen = this.chosen.bind(this)
    this.addNewFave = this.addNewFave.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.searchRes = this.searchRes.bind(this)
    this.nextButt = this.nextButt.bind(this)
    this.removeFave = this.removeFave.bind(this)
    // this.next = this.next.bind(this)
  }

  componentDidMount() {
    // console.log(this.props)
    const {location, categories} = this.state
    axios.get(`/home?location=${location}&categories=${categories}&api=${process.env.API_KEY}`)
      .then(res => this.setState({restaurants: res.data.businesses}))
  }

  chosen(){
    const data = this.state.restaurants[0]
    const chosen = {
      name: data.name,
      imgurl: data.image_url,
      rating: `${data.rating}`,
      reviews: data.review_count,
      price: data.price,
      phone: data.display_phone,
      address: data.location.address1,
      city: data.location.city,
      state: data.location.state,
      zipcode: data.location.zip_code,
      lat: `${data.coordinates.latitude}`,
      long: `${data.coordinates.longitude}`,
      website: data.url
    }
    // console.log(chosen)
    this.props.addCurr(chosen)
  }

  addNewFave(){
    const data = this.state.restaurants[0]
    const fave = {
      name: data.name,
      imgurl: data.image_url,
      rating: data.rating,
      reviews: data.review_count,
      price: data.price,
      phone: data.display_phone,
      address: data.location.address1,
      city: data.location.city,
      state: data.location.state,
      zipcode: data.location.zip_code,
      lat: `${data.coordinates.latitude}`,
      long: `${data.coordinates.longitude}`,
      website: data.url
    }
    this.props.addFave(fave)
    this.setState({fave: true})
  }
  
  removeFave(){
    const data = this.state.restaurants[0]
    this.props.deleteFave(data.name)
    this.setState({fave: false})
  }
  handleChange(ev){
    const {name, value} = ev.target
    this.setState({[name] : value})
  }

  nextButt(){
    const res = [...this.state.restaurants]
    res.shift()
    this.setState({restaurants: res, fave:false})
  }

  async searchRes(){
    const {location, categories} = this.state
    const res =  await axios.get(`/home?location=${location}&categories=${categories}&api=${process.env.API_KEY}`)
    console.log(res.data.businesses)
    this.setState({restaurants: res.data.businesses})   
  }

  // Tinder card swiping function
  // next(){
  //   const res = [...this.state.restaurants]
  //   res.shift()
  //   this.setState({restaurants: res})
  // }
  
  
  render() {
    const { restaurants, fave } = this.state;
    const res = restaurants[0]
    return (
      <div id='main'>
        <div id='form'>
          <div class='typing'>
            <TextField   type="text" label='Zip Code:' id="location" name="location" onChange={this.handleChange}/>
            <TextField  type="text" label='Category:' id="categories" name="categories" onChange={this.handleChange} placeholder='ex: Thai'/>
          </div>
          <Button id='search' onClick={this.searchRes}>Search</Button>
        </div>
          {res ? <div className='card' >
              <h2>{res.name}</h2>
              <img class='cardImg' src={res.image_url}/>
              <div class='cardInfoBox'>
                <p><span class='cardUnder'>Rating:</span> {res.rating} ({res.review_count} reviews)</p>
                <p><span class='cardUnder'>Price:</span> {res.price}</p>
                <p><span class='cardUnder'>Phone Number:</span> {res.phone}</p>
                <div class='cardAddy'>
                  <p><span class='cardUnder'>Address:</span></p>
                  <div class='addyInfo'>
                    <p> {res.location.address1}</p>
                    <p>{res.location.city}, {res.location.state} {res.location.zip_code}</p>
                  </div>
                </div>
              </div>
              <div class='forLater'>
                {!fave ? (
                  <Button onClick={this.addNewFave}>Save for Later</Button>
                ) : (
                  <Button  onClick={this.removeFave}>Remove from Favorites</Button>
                )}
              </div>
          </div> : ''}
        <div class='nextButtons'>
          <Button onClick={this.nextButt}>NEXT</Button>
          <Button  onClick={this.chosen}><Link className='goNow' to='/chosen'>GO</Link></Button>
        </div>
      </div> 
    )
  }
}

const mapState = () => {
  return {}
};

const mapDispatch = (dispatch) => {
  return {
    addCurr: (info)=> dispatch(addCurr(info)),
    addFave: (info)=> dispatch(addFave(info)),
    deleteFave: (info)=>dispatch(deleteFave(info))
  }
};


export default connect(mapState, mapDispatch)(Cards);


