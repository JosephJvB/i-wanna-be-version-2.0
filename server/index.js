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
// save .listen() to variable to have access to server.close() function
const liveServer = server.listen(PORT, console.log('Express listening @ port', PORT))

process.on('uncaughtException', err => {
	console.log('Exiting on error:', err)
	liveServer.close(() => process.exit(1))
})

function loadENV () {
	const data = fs.readFileSync(path.join(__dirname, '../secrets.json'))
	// did you know that json.parse can turn a buffer into JSON? that is fancy
	const json = JSON.parse(data)
	// add new parsed keys and node_env if not set
	const nextEnv = {
		...process.env,
		...json,
		NODE_ENV: !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV
	}
	process.env = nextEnv
  return nextEnv
}