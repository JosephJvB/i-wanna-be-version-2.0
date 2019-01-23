const path = require('path')
const fs = require('fs')

module.exports = {
	connectSockets(socket, io) {
	// socket.on('someEvent', (data) => io.emit(data))
	// socket.on('someEvent', (data) => socket.broadcast.emit(data))
	},
	loadEnv() {
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
}