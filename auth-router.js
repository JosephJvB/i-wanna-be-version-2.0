const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('./knexfile')

const router = express.Router()

router.use(express.json())

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
    createdUser.token = createToken(createdUser)
    return res.status(200).json(createdUser)
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
  } catch (err) {
    res.status(500).json({message: err.message, error: true})
  }
})
router.post('/logout', async (req, res, next) => {
	try {
		if(!req.body.token) {
      return res.status(400).json({message: 'No user token on request body', error: true})
    }
    const userData = verifyToken(req.body.token)
    // does user exist?
		const user = await knex('users').where({id: userData.id}).first()
		if(!user) {
      return res.status(400).json({message: 'User is not logged in', error: true})
    }
		res.status(200).json({message: 'logout success'})
	} catch(err) {
		res.status(500).json({message: err.message, error: true})
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

function createToken (user) {
  const payload = {
    id: user.id,
    username: user.username
  }
  const opts = { expiresIn: '1d' }
	return jwt.sign(payload, process.env.AUTH_SECRET, opts)
}
function verifyToken (token) {
	const opts  = { maxAge: '1d' }
	return jwt.verify(token, process.env.AUTH_SECRET, opts)
}

module.exports = router