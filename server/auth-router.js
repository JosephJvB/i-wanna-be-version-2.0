const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('../database/connection')

const router = express.Router()

router.use(express.json())

// where to store socket-data??
let activeUsers = []

router.post('/register', async (req, res, next) => {
  try {
    // does user already exist?
    const user = await knex('users').where({username: req.body.username}).first()
    if(!!user) {
      return res.status(400).json({message: 'User already exists', error: true})
    }
    const newUser = {
      username: req.body.username,
      hash: await createHash(req.body.password)
    }
    const createdUser = await knex('users').insert(newUser).returning(['id', 'username'])
    .then(res => res[0]) // knex returns result in an array
    createdUser.token = createToken(createdUser)
    activeUsers.push(createdUser)
    // exit here
    req.app.socketServer.emit('active_user_change', activeUsers)
    res.status(200).json(createdUser)
  } catch (err) {
    res.status(500).json({message: err.message, error: true})
  }
})

router.post('/login', async (req, res, next) => {
  try {
    // does user exist?
    const user = await knex('users').where({username: req.body.username}).first()
    if(!user) {
      return res.status(400).json({message: 'User does not exist', error: true})
    }
    // did user enter correct password?
		const passwordMatch = await matchHash(req.body.password, user.hash)
		if(!passwordMatch) {
			return res.status(400).json({ message: 'Incorrect password', error: true })
    }
    const loggedInUser = {
      id: user.id,
      username: user.username,
      token: createToken(user)
    }
    activeUsers.push(loggedInUser)
    // exit here
    req.app.socketServer.emit('active_user_change', activeUsers)
    res.status(200).json(loggedInUser)
  } catch (err) {
    res.status(500).json({message: err.message, error: true})
  }
})

router.post('/logout', async (req, res, next) => {
	try {
		if(!req.body) return res.status(400).json({message: 'No request body given', error: true})
		if(!req.body.token) {
      return res.status(400).json({message: 'No user token on request body', error: true})
    }
    const userData = verifyToken(req.body.token)
    if(userData.isGuest) {
      // const guest = activeUsers.find(u => u.id === userData.id)
      // if(!guest) {
        //   return res.status(400).json({message: 'No active guest session found', error: true})
        // }
    }
    // does user exist?
    const user = userData.isGuest
    ? userData
    : await knex('users').where({id: userData.id}).first()
		if(!user) {
      return res.status(400).json({message: 'User does not exist', error: true})
    }
    activeUsers = activeUsers.filter(u => u.id !== userData.id)
    // exit here
    req.app.socketServer.emit('active_user_change', activeUsers)
    res.status(200).json({message: 'logout success'})
	} catch(err) {
		res.status(500).json({message: err.message, error: true})
	}
})

router.post('/login-as-guest', async (req,res) => {
  try {
    // is that guest already logged in
    if(activeUsers.length > 0) {
      const activeGuest = activeUsers.find(u => u.id === req.body.guestId)
      // when will this ever happen?
      if(activeGuest) {
        return res.status(400).json({message: 'Guest is already logged in', error: true})
      }
    }
    const guestData = {
      id: req.body.guestId,
      username: 'Guest',
      isGuest: true    
    }
    guestData.token = createToken(guestData)
    activeUsers.push(guestData)
    // exit here
    req.app.socketServer.emit('active_user_change', activeUsers)
    res.status(200).json(guestData)
  } catch(err) {
    return res.status(500).json({msg: err.message, error: true})
  }
})
 
// Auth utils:
// bcrypt return promises
// jwt is sync
function createHash (password) {
  const SALT_ROUNDS = 1
	return bcrypt.hash(password, SALT_ROUNDS)
}
function matchHash (password, hash) {
  return bcrypt.compare(password, hash)
}

function createToken (payload) {
  const opts = { expiresIn: '1d' }
	return jwt.sign(payload, process.env.AUTH_SECRET, opts)
}
function verifyToken (token) {
	const opts  = { maxAge: '1d' }
	return jwt.verify(token, process.env.AUTH_SECRET, opts)
}

module.exports = router