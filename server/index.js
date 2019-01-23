const socketIO = require('socket.io')
const server = require('./express-server')
const {
	loadEnv
	// connectSockets // not a thing yet
} = require('./util')
const PORT = process.env.PORT || 3000

/*
 > load proc.env
 > init express
 > init socket
 > save socket to expressApp
*/

loadEnv()
const expressServer = server.listen(PORT, console.log('Express listening @ port', PORT))
const io = socketIO(expressServer)
// io.on('connection', socket => connectSockets(socket, io))
server.socketServer = io

// boilerplate error handler
// https://medium.com/@a0viedo/5-common-mistakes-in-every-node-js-app-a4bea7ac05bc
process.on('uncaughtException', err => {
	console.log('Exiting on error:', err)
	expressServer.close(() => process.exit(1))
})
