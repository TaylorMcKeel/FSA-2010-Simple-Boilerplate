const path = require('path');
const express = require('express');
const axios = require('axios')

const app = express();
module.exports = app




const PUBLIC_PATH = path.join(__dirname, '../../public');
const DIST_PATH = path.join(__dirname, '../../dist');

app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));


app.use(express.json());


app.get('/home', async(req,res,next)=>{
  try{
    const yelpREST = axios.create({
      baseURL: "https://api.yelp.com/v3/",
      headers: {
        Authorization: `Bearer ${req.query.api}`,
        "Content-type": "application/json",
      },
    })
    const restaurants = (await yelpREST("/businesses/search", {
      params: {
        location: `${req.query.location}`,
        term: "restaurants",
        limit: 10,
        categories: `${req.query.categories}`
      },
    })).data
    // console.log(restaurants.businesses)
    res.send(restaurants)
  }catch(er){
    console.log(er)
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.use("/api", require("./routes"));
