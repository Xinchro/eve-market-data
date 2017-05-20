require('dotenv').config()

const express = require('express')
const request = require("request")

const app = express()

app.get('/', (req, res) => {

  request({
    url: process.env.DATA_URL,
    method: "GET",
    json: true
  }, function (error, response, body) {
    if(!error && response.statusCode === 200) {
      res.send(textifyData(body))
    } else
    if(error) {
      return console.log('something went wrong!', error)
    } else {
      return console.log(`something went wrong! code ${response.statusCode}`)
    }
  })
})

app.listen(process.env.PORT, (err) => {
  if(err) {
    return console.log('something went wrong!', err)
  }

  console.log(`server is listening on ${process.env.PORT}`)
})


let textifyData = (body) => {
  let text = ""

  // modify this if the url's data structure changes
  // `body` is the full json data sent by the url
  body.items.forEach(function(element, index, array) {
    // `element` is the "item"
    // this is how the data is displayed, modyify to include/exclude whatever data needed
    text += `${element.name} - ${element.buy_price} `

    // add seperator 
    text += "--- "
  })

  return text
}