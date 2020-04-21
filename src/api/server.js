const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const userRoutes = require('./routes/userRoutes')

const baseUrl = '/api'
const sessionName = process.env.SESSION_NAME || 'notsession'
const sessionSecret = process.env.SESSION_SECRET || 'nobody tosses a dwarf!'

const server = express()

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(
    session({
      name:  sessionName, // default is connect.sid
      secret: sessionSecret,
      cookie: {
        maxAge: 1000 * 30,
        secure: false, // only set cookies over https. Server will not send back a cookie over http.
      }, // 1 day in milliseconds
      httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
      resave: false,
      saveUninitialized: false,
    })
  );
server.use(baseUrl, userRoutes)

module.exports = server
