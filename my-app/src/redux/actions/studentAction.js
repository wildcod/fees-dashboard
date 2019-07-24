import axios from 'axios'
import api from '../../utils/api'

import {
   DELETE_STUDENT
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