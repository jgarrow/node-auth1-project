const db = require('../dbConfig')

function getUsers() {
    return db('users')
}

function getUserByUsername(username) {
    return db('users').where({ username })
}

function getUserById(userId) {
    return db('users').where({ id: userId })
}

function createUser(newUser) {
    return db('users').insert(newUser)
}

module.exports = {
    getUsers,
    getUserByUsername,
    getUserById,
    createUser
}