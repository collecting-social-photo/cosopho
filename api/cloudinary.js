const os = require('os')
const express = require('express')
const cors = require('cors')
const app = express()
const cloudinary = require('cloudinary').v2
const formData = require('express-form-data')

app.use(cors())

const config = {
  'api_key': process.env.CLOUDINARY_API_KEY,
  'cloud_name': process.env.CLOUDINARY_NAME,
  'api_secret': process.env.CLOUDINARY_API_SECRET
}

console.log(config)

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
}

cloudinary.config(config)

app.use(formData.parse(options))

app.get('/', function (req, res) {
  res.end('ok')
})

app.post('/', async function (req, res) {
  const data = await cloudinary.uploader.upload(req.files.file.path, { exif: true })
  res.send(data)
})

app.delete('/', async function (req, res) {
  if (req.query && req.query.id) {
    const data = await cloudinary.uploader.destroy(req.query.id)
    res.send(data)
  }
  res.end('ok')
})

module.exports = {
  path: '/cloudinary/',
  handler: app
}
