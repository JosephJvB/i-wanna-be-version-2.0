const express = require('express')
const helmet = require('helmet')
const path = require('path')

const authRouter = require('./auth-router')

const server = express()
server.use(helmet())
server.use(express.static(path.join(__dirname, '../dist')))
server.use(express.json())
server.use('/api/v1/auth', authRouter)
server.get('*', (req, res, next) => res.sendFile(path.join(__dirname, '../dist/index.html')))

module.exports = server
