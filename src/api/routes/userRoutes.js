const express = require('express')
const bcrypt = require('bcryptjs')
const userScheme = require('../../data/schemes/userScheme')
const protected = require('../middleware/protectedRoutes')

const router = express.Router()


// create new account
router.post('/register', (req, res) => {
    const credentials = req.body

    const hash = bcrypt.hashSync(credentials.password, 14)

    credentials.password = hash

    userScheme.createUser(credentials)
        .then(response => res.status(201).json(response))
        .catch(err => res.status(500).json({ message: `Error creating account` }))
})


router.post('/login', (req, res) => {
    const { username, password } = req.body
    
    userScheme.getUserByUsername(username)
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.userId = user.id
                res.status(200).json({ message: `Welcome ${user.username}!` })
            } else {
                res.status(401).json({ message: `Invalid login credentials` })
            }
        })
        .catch(err => res.status(500).json({ message: `Error logging in ${username}` }))
    
})

router.get('/users', protected, (req, res) => {
    userScheme.getUserById(req.session.userId)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ message: `Error fetching users` }))
})

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.send('Error logging out')
            } else {
                res.send('Goodbye!')
            }
        })
    }
})

module.exports = router