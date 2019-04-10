const express = require('express')
const router = express.Router()

const createStudent = require('../controllers/student').createStudent
const getStudents = require('../controllers/student').getStudents
const deleteStudent = require('../controllers/student').deleteStudent
const modifyStudent = require('../controllers/student').modifyStudent
const getStudent = require('../controllers/student').getStudent

router.get('/', getStudents)
router.post('/', createStudent)
router.delete('/:studentId', deleteStudent)
router.patch('/:studentId' , modifyStudent)
router.get('/:studentId', getStudent)

module.exports = router