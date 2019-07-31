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
   joining_date : {
    type : Date,
    default : ''
   },
   submit_date_and_include : [{
        submit_date : { type : Date, required : true},
        include : [ {type :String , required : true }]
   }]
   
})

module.exports = mongoose.model('Student' ,studentSchema)