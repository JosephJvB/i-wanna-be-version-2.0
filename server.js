const express = require('express')
const parcelBundler = require('parcel-bundler')
const helmet = require('helmet')
const path = require('path')
const app = express()
const bundler = new parcelBundler(path.join(__dirname, 'index.html'), {})
// const authRouter = require('./auth-router')

app.use(helmet())
app.use(express.json())
// app.use('/api/v1/auth', authRouter)

// always connect this last
app.use(bundler.middleware())

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('Express listening @ port', PORT))
