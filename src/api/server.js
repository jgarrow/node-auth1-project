const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const userRoutes = require('./routes/userRoutes')

const baseUrl = '/api'

const server = express()

server.use(cors())
server.use(helmet())
server.use(express())
server.use(baseUrl, userRoutes)

module.exports = server
