const express = require('express')
const router = express.Router()
const checkAuth = require('../api/middleware/check-auth')

const signup = require('../controllers/user').signup
const login = require('../controllers/user').login
const getUsers = require('../controllers/user').getUsers


router.post('/signup', signup)
router.post('/login', login)
router.get('/',checkAuth, getUsers)


module.exports = router