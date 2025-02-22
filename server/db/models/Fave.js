const db = require('../db')
const Sequelize = require('sequelize')
const { STRING, INTEGER} = Sequelize;

const Fave = db.define('fave', {
  name: {
    type: STRING
  },
  imgurl: {
    type: STRING,
  },
  rating: {
    type: STRING
  },
  reviews: {
    type: INTEGER
  },
  price: {
    type: STRING
  },
  phone: {
    type: STRING
  },
  address: {
    type: STRING
  },
  city: {
    type: STRING
  },
  state: {
    type: STRING
  },
  zipcode: {
    type: STRING
  },
  lat: {
    type: STRING
  },
  long: {
    type: STRING
  },
  website: {
    type: STRING
  }
})

module.exports = Fave