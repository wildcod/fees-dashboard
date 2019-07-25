const express = require('express')
const router = express.Router()
const checkAuth = require('../api/middleware/check-auth')

const createStudent = require('../controllers/student').createStudent
const getStudents = require('../controllers/student').getStudents
const deleteStudent = require('../controllers/student').deleteStudent
const modifyStudent = require('../controllers/student').modifyStudent
const getStudent = require('../controllers/student').getStudent
const updateSubmitDate = require('../controllers/student').updateSubmitDate

router.get('/', getStudents)
router.post('/', createStudent)
router.delete('/:studentId', deleteStudent)
router.patch('/:studentId' , modifyStudent)
router.patch('/modify-date/:studentId',updateSubmitDate)
router.get('/:studentId', getStudent)

module.exports = router