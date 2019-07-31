import axios from 'axios'
import api from '../../utils/api'

import {
   DELETE_STUDENT,
   UPDATE_STUDENT,
   CREATE_STUDENT,
   FEES_STUDENT
} from '../types'

import { returnErrors } from './errorAction'

export const deleteStudent = ({deleteId})  => async(dispatch) => {

    try{

        if(deleteId.length > 0){
            const res = await axios.delete(api('deleteStudent',deleteId));

            console.log(res);

            dispatch({
                type : DELETE_STUDENT,
                payload : {
                    deleteId
                }
            })

        }else{
            dispatch(
                returnErrors("delete ID missing", 500, 'DELETE_ID')
              );
        }

    }catch(e){
        dispatch(
            returnErrors(e.response.data, e.response.status, 'DELETE_ID')
          );
    }

}

export const updateStudent = ({name,date,updateClass,studentId})  => async(dispatch) => {

    try{

        if(name.length > 0 || date.length > 0 || updateClass.length > 0){
            
          let updateField = [];

          if(name.length > 0){
              updateField.push({"propName" : "name" , "value" : name})
          }
          if(date.length > 0){
            updateField.push({"propName" : "joining_date" , "value" : date})
          }
          if(updateClass.length > 0){
            updateField.push({"propName" : "class_name" , "value" : updateClass})
          }

          const res = await axios.patch(api('updateStudent', studentId), updateField);

          const updateData = res.data.request.result;

          console.log(updateData);

          dispatch({
            type : UPDATE_STUDENT,
            payload : {
               updateData
            }
        })

        }else{
            dispatch(
                returnErrors("at least one field required", 500, 'UPDATE_ERROR')
              );
        }

    }catch(e){
        dispatch(
            returnErrors(e.response.data, e.response.status, 'UPDATE_ERROR')
          );
    }

}

export const createStudent = ({name,joiningDate,classOfStudent,userId})  => async(dispatch) => {

    try{
          const createField = {
              name : name,
              joining_date : joiningDate,
              class_name : classOfStudent,
              fees_check : false,
              userId :userId
          }

          const res = await axios.post(api('createStudent'), createField);
          
          const createdStudent = res.data.createdStudent

          dispatch({
            type : CREATE_STUDENT,
            payload : {
               createdStudent
            }
        })          

      }catch(e){
        dispatch(
            returnErrors(e.response.data, e.response.status, 'CREATE_ERROR')
          );
    }

}


export const submitFees = ({submit_date,include,studentId})  => async(dispatch) => {

    try{
          const feesField = {
            "submit_date_and_include" : {
                "submit_date" : submit_date,
                "include"	: include
            }
          }

          const res = await axios.patch(api('updateSubmitDate', studentId), feesField);
    

          dispatch({
            type : FEES_STUDENT,
            payload : {
               result : res.result
            }
        })          

      }catch(e){
        dispatch(
            returnErrors(e.response.data, e.response.status, 'SUBMIT_FEES_ERROR')
          );
    }

}