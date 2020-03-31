const axios = require('axios')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', function (req, res) {
  res.end('ok')
})

app.post('/', function (req, res) {
  const body = JSON.stringify(req.body)
  axios.post(
    process.env.API_ENDPOINT,
    body,
    {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'content-type': 'application/json'
      }
    }
  ).then((response) => {
    res.send(response.data)
  }).catch((error) => {
    console.log(error.response.data)
  })
})

module.exports = {
  path: '/api/',
  handler: app
}
