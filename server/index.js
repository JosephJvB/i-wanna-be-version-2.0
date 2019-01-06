const express = require('express')
const helmet = require('helmet')
const path = require('path')
const fs = require('fs')
const authRouter = require('./auth-router')

loadENV() // sync add keys to process.env
const server = express()

server.use(helmet())
server.use(express.static(path.join(__dirname, '../dist')))
server.use(express.json())
server.use('/api/v1/auth', authRouter)
server.get('*', (req, res, next) => res.sendFile(path.join(__dirname, '../dist/index.html')))

const PORT = process.env.PORT || 3000
server.listen(PORT, console.log('Express listening @ port', PORT))

function loadENV () {
	const data = fs.readFileSync(path.join(__dirname, '../secrets.json'))
	// did you know that json.parse can turn a buffer into JSON? that is fancy
	const json = JSON.parse(data)
  process.env = Object.assign({}, process.env, json)
  return json
}