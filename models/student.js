const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({

   _id : mongoose.Schema.Types.ObjectId,
   class_name : {
             type : String,
             required : true,
         },
   name : {
       type : String,
       required : true,
   },
   status : {
       type : Boolean,
       default : false
   },
   submit_date : {
       type : Date,
       default : Date.now
   },
   include : [ {type : String}],
   user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
  }
   
})

module.exports = mongoose.model('Student' ,studentSchema)