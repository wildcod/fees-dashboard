const express = require('express')
const router = express.Router()
const checkAuth = require('../api/middleware/check-auth')

const createStudent = require('../controllers/student').createStudent
const getStudents = require('../controllers/student').getStudents
const deleteStudent = require('../controllers/student').deleteStudent
const modifyStudent = require('../controllers/student').modifyStudent
const getStudent = require('../controllers/student').getStudent

router.get('/',checkAuth, getStudents)
router.post('/',checkAuth, createStudent)
router.delete('/:studentId',checkAuth, deleteStudent)
router.patch('/:studentId' ,checkAuth, modifyStudent)
router.get('/:studentId',checkAuth, getStudent)

module.exports = router