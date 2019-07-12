const mongoose = require('mongoose')
const Student = require('../models/student')
const User = require('../models/user')

const createStudent = (req, res, next) => {

    let student = {};
    if(req.body.submit_date.length > 0){
         student = new Student({
            _id : new mongoose.Types.ObjectId(),
            name : req.body.name,
            class_name : req.body.class_name,
            status : true,
            submit_date : new Date(req.body.submit_date),
            include : req.body.include,
            joining_date : new Date(req.body.joining_date)
        })
    }else {
        student = new Student({
            _id : new mongoose.Types.ObjectId(),
            name : req.body.name,
            class_name : req.body.class_name,
            joining_date : new Date(req.body.joining_date)
        })
    }
    student.save()
    .then(result => {
        // update the student id in user model
        User.findOneAndUpdate({
            _id : req.body.userId,
             $push : { 'students' : result._id }
        }).exec()
          .then(response => {
            res.status(200).json({
                message : "Created Successfully",
                createdStudent : {
                    _id : result._id,
                    name : result.name,
                    class_name : result.class_name,
                    status : result.status,
                    submit_date : result.submit_date,
                    include : result.include
                },
                request : {
                    type : "GET",
                    url : 'http://localhost:4000/students/' + result._id
                }
            })
          })
          .catch(err => {
            res.status(500).json({
                error : err
            })
        })
       
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
    

}

const getStudents = (req, res, next) => {

    Student.find()
    .select("_id name class_name status submit_date include joining_date")
    .exec()
    .then(students => {
        const count = students.length;
        res.status(200).json({
            count : count,
            students : students
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })

}

const getStudent = (req, res, next) => {

    Student.findById({ _id : req.params.studentId})
    .select("_id name class_name status submit_date include joining_date")
    .exec()
    .then(result => {
        res.status(200).json({
            message : "Get sucess",
            student : result
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })

}

const modifyStudent = (req, res, next) => {

    const id = req.params.studentId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }

    Student.update({ 
        _id : id, 
        $set : updateOps
    }).exec()
    .then(result => {
          res.status(200).json({
              message : "Updated Student",
              request : {
                  type : 'GET',
                  url : 'http://localhost:4000/students/' + studentId._id
              }
          })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })

}

const deleteStudent = (req, res, next) => {

    Student.remove({ _id : req.params.studentId})
    .exec()
    .then(result => {
        res.status(200).json({
            message : "student deleted",
            result
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })

}

module.exports = {
    createStudent,
    getStudents,
    deleteStudent,
    modifyStudent,
    getStudent
}
