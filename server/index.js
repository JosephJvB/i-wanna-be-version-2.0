const express = require('express')
const helmet = require('helmet')
const path = require('path')
const fs = require('fs')
const socketIO = require('socket.io')

const authRouter = require('./auth-router')

loadENV()

// INIT EXPRESS. install middleware
const server = express()
server.use(helmet())
server.use(express.static(path.join(__dirname, '../dist')))
server.use(express.json())
server.use('/api/v1/auth', authRouter)
server.get('*', (req, res, next) => res.sendFile(path.join(__dirname, '../dist/index.html')))
const PORT = process.env.PORT || 3000
// save .listen() to variable to have access to server.close() function
const liveServer = server.listen(PORT, console.log('Express listening @ port', PORT))
// EXPRESS ERROR HANDLER
// https://medium.com/@a0viedo/5-common-mistakes-in-every-node-js-app-a4bea7ac05bc
process.on('uncaughtException', err => {
	console.log('Exiting on error:', err)
	liveServer.close(() => process.exit(1))
})

// INIT SOCKET
// maybe I should pass just 'server' but harrison has done this 🤷‍♀️
let activeUsers = 0
const io = socketIO(liveServer)
io.on('connection', socket => {
	activeUsers++
	// emit to all
	io.emit('login_event', activeUsers)
	socket.on('disconnect', () => {
		console.log('user has disconnected')
		activeUsers--
		// emit to all
		io.emit('logout_event', activeUsers)
	})
})

// UTIL
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