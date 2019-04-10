const express = require('express')
const router = express.Router()

const signup = require('../controllers/user').signup
const getUsers = require('../controllers/user').getUsers


router.post('/', signup)
router.get('/', getUsers)


module.exports = router