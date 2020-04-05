const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({

   _id : mongoose.Schema.Types.ObjectId,
   class_name : {
             type : String,
             enum : ['4','5','6','7','8','9','10','11','12'],
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