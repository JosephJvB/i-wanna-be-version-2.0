const express = require('express')
const parcelBundler = require('parcel-bundler')
const helmet = require('helmet')
const path = require('path')
const fs = require('fs')
const authRouter = require('./auth-router')

loadENV() // sync add keys to process.env
const app = express()
const bundler = new parcelBundler(path.join(__dirname, 'index.html'), {})

app.use(helmet())
app.use(express.json())
app.use('/api/v1/auth', authRouter)

// always connect this last
app.use(bundler.middleware())

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('Express listening @ port', PORT))

function loadENV () {
	const data = fs.readFileSync(path.join(__dirname, 'secrets.json'))
	// did you know that json.parse can turn a buffer into JSON? that is fancy
	const json = JSON.parse(data)
  process.env = Object.assign({}, process.env, json)
  return json
}