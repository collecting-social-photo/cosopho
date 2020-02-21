const express = require('express')
const cors = require('cors')
const app = express()
var cloudinary = require('cloudinary').v2
const formData = require("express-form-data")
const os = require("os")

app.use(cors())

const config = {
  "api_key": "978561673254743",
  "cloud_name": "hftpxlihv",
  "api_secret": "F2Y2nU_RheZf8tDz8Z1EMq7ZCpg"
}

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
}

cloudinary.config(config)

app.use(formData.parse(options))

app.get('/', function(req, res) {
  res.end('ok')
})

app.post('/', async function(req, res) {
  const data = await cloudinary.uploader.upload(req.files.file.path, { exif: true })
  res.send(data)
})

module.exports = {
  path: "/upload/",
  handler: app
}
