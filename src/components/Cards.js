import React from "react";
import axios from 'axios'
import TinderCard from 'react-tinder-card'



const API_KEY = 'GM4xwbLME39A7fdii1TaLLa7JHIWYwGLCppJz7zoqUjAsVev8kfGGSZ4eXgtJdX-6lwpGwQgUUzy_ffF7Pp3yZcr2qbQobJj06LAPcbEPg7-fITAfS9Hisze7fo2YHYx'

const yelpREST = axios.create({
  baseURL: "https://api.yelp.com/v3/",
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-type": "application/json",
  },
})

export class Cards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: 'NYC',
      categories: '',
      restaurants: [],
      next: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.next = this.next.bind(this)
    this.nextButt = this.nextButt.bind(this)
  }

  async componentDidMount() {
    const {location, categories} = this.state
    const res =  await axios.get(`/home?location=${location}&categories=${categories}`)
    this.setState({restaurants: res.data.businesses})    
  }
  handleChange(ev){
    const {name, value} = ev.target
    this.setState({[name] : value})
  }
  async handleSubmit(){
    const {location, categories} = this.state
    const res =  await axios.get(`/home?location=${location}&categories=${categories}`)
    console.log(res.data.businesses)
    this.setState({restaurants: res.data.businesses})   
  }
  next(dir){
    if(dir === 'left'){
      console.log(dir)
      const res = [...this.state.restaurants]
      res.shift()
      this.setState({restaurants: res})
    }
  }
  nextButt(){
    const res = [...this.state.restaurants]
    res.shift()
    this.setState({restaurants: res})
  }
  
  render() {
    const { restaurants } = this.state;
    const res = restaurants[0]
    if(this.state.next === false){
      return (
        <div id='main'>
          <h1>NEXTaurants</h1>
          <div id='form'>
            <div >
              <label for="location">Zip Code:</label>
              <input type="text" id="location" name="location" onChange={this.handleChange}/>
              <label for="categories">Category:</label>
              <input type="text" id="categories" name="categories" onChange={this.handleChange} placeholder='ex: Thai'/>
            </div>
            <button id='search' onClick={this.handleSubmit}>Search</button>
          </div>
          {res ? <TinderCard className='card' onSwipe={(dir) => this.next(dir)}>
            <h2>{res.name}</h2>
            <img src={res.image_url}/>
            <p>Rating: {res.rating} ({res.review_count} reviews)</p>
            <p>Price: {res.price}</p>
            <p>Phone Number: {res.display_phone}</p>
            <p>Address: {res.location.address1}</p>
            <p>{res.location.city}, {res.location.state} {res.location.zip_code}</p>
          </TinderCard> : ''}
          <div>
            <button onClick={this.nextButt}>NEXT</button>
            <button onClick={()=>{this.setState({next:true})}}>GO</button>
          </div>
        </div> 
      )

    }else{
      return(
        <div id='main'>
          <h1>NEXTaurants</h1>
          <h2>{res.name}</h2>
          <div>
            <button >Get Directions</button>
            <button ><a href={res.url}>Make a Reservation</a></button>
          </div>
        </div> 
      )
    }
  }
}



export default (Cards);
