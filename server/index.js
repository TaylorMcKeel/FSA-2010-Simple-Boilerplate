const path = require('path');
const express = require('express');
const app = express();
const axios = require('axios')

const API_KEY = 'GM4xwbLME39A7fdii1TaLLa7JHIWYwGLCppJz7zoqUjAsVev8kfGGSZ4eXgtJdX-6lwpGwQgUUzy_ffF7Pp3yZcr2qbQobJj06LAPcbEPg7-fITAfS9Hisze7fo2YHYx'

const yelpREST = axios.create({
  baseURL: "https://api.yelp.com/v3/",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-type": "application/json",
  },
})



// const getRes = async (location, categories)=>{
//   const restaurants = (await yelpREST("/businesses/search", {
//     params: {
//       location: `${location}`,
//       term: "restaurants",
//       limit: 30,
//       categories: `${categories}`
//     },
//   })).data
//   return restaurants
// }


const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../public');
const DIST_PATH = path.join(__dirname, '../dist');

app.use(express.json());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));


app.get('/home', async(req,res,next)=>{
  try{
    const restaurants = (await yelpREST("/businesses/search", {
      params: {
        location: `${req.query.location}`,
        term: "restaurants",
        limit: 10,
        categories: `${req.query.categories}`
      },
    })).data
    console.log(restaurants.businesses)
    res.send(restaurants)
  }catch(er){
    console.log(er)
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});