const mongoose = require('mongoose')
const Student = require('../models/student')
const User = require('../models/user')

const createStudent = (req, res, next) => {

    let student = {};
    if(req.body.fees_check){
         student = new Student({
            _id : new mongoose.Types.ObjectId(),
            name : req.body.name,
            class_name : req.body.class_name,
            status : true,
            submit_date_and_include : [req.body.submit_date_and_include],
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
        // add the student id in user model
        User.findOneAndUpdate(
            {_id : req.body.userId},
            {
             $push : { 'students' : result._id },
        }).exec()
          .then(response => {
            res.status(200).json({
                message : "Created Successfully",
                createdStudent : {
                    _id : result._id,
                    name : result.name,
                    class_name : result.class_name,
                    status : result.status,
                    joining_date : result.joining_date,
                    submit_date_and_include : result.submit_date_and_include
                },
                request : {
                    type : "GET",
                    url : 'http://localhost:4000/students/' + result._id
                }
            })
          })
          .catch(err => {
            res.status(500).json({
                error : err,
                message : "user adding error"
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
    .select("_id name class_name status submit_date_and_include joining_date")
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
    .select("_id name class_name status submit_date_and_include joining_date")
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
    console.log(req.body)
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
   console.log(updateOps)
    Student.findOneAndUpdate( 
       { _id : id }, 
       { $set : updateOps },
       { new : true}
    ).exec()
    .then(result => {
          res.status(200).json({
              message : "Updated Student",
              request : {
                  type : 'GET',
                  url : 'http://localhost:4000/students/' + result._id,
                  result
              }
          })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })

}

const updateSubmitDate = (req, res, next) => {
    Student.findOneAndUpdate(
        {_id : req.params.studentId},
        {
          $push : { 'submit_date_and_include' : req.body.submit_date_and_include },
        },
        {new : true}
    ).exec()
    .then(result => {
        res.status(200).json({
            message : "updated",
            result
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })

}

const deleteStudent = (req, res, next) => {

    Student.remove({ _id : req.params.studentId},
       )
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
    getStudent,
    updateSubmitDate
}
