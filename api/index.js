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
  const session = req.query.session
  let apiToken = process.env.API_KEY

  if (session) {
    apiToken = `${process.env.API_KEY}-${session}`
  }

  // GOD mode override
  apiToken = `${process.env.API_KEY}-${process.env.SIGNATURE}`

  axios.post(
    process.env.API_ENDPOINT,
    body,
    {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
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
