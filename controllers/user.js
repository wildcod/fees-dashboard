const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')


const signup = (req, res, next) => {

 bcrypt.hash(req.body.password, 10, function(err, hash) {

    if(err){
       return res.status(500).json({
            error : err
        })
    }else {
        const user = new User({
            _id : mongoose.Types.ObjectId(),
            name : req.body.name,
            email : req.body.email,
            password : hash
        })
        user.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message : "User is created"
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
    }

 })
}

const getUsers = (req, res, next) => {
    User.find()
    .select("_id name email")
    .populate('user')
    .exec()
    .then(users => {
        const count = users.length
        res.status(200).json({
            count,
            users
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
}

const login = (req, res, next) => {
    User.find({ email : req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message : 'Auth Failed'
            })
        }

        bcrypt.compare(req.body.password, user[0].password, (err,res) => {
            if(err){
                return res.status(401).json({
                    message : 'Auth Failed'
                })
            }
            if(result){
                return res.status(200).json({
                    message : 'Auth Successful'
                })
            }
            res.status(401).json({
                message : 'Auth Failed'
            })
        })

    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
}



module.exports = {
    signup,
    getUsers,
    login
}