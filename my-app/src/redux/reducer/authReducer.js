import {
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_START,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    DELETE_STUDENT,
    UPDATE_STUDENT,
    CREATE_STUDENT,
    FEES_STUDENT
} from '../types'


const initialState = {
    email : '',
    name : '',
    _id : '',
    token: null,
    requestingLogin : false,
    signedUp : false,
    requestingSignup : false,
    loggedIn : false,
    students : [],
};

  export default function(state = initialState, action) {

    switch (action.type) {
      case SIGNUP_START:
        return {
          ...state,
          requestingSignup: true
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          requestingSignup: false,
          signedUp : true
        };
      case LOGIN_START:
          return {
              ...state,
              requestingLogin : true
          };
        case LOGIN_SUCCESS:
          return {
              ...state,
              requestingLogin : false,
              token : action.payload.data["token"],
              loggedIn : true,
              email : action.payload.data["email"],
              name : action.payload.data["name"],
              _id : action.payload.data["_id"],
              students : action.payload.data["students"]
          };
      case CREATE_STUDENT:
            let updatedStudents = state.students;
            updatedStudents.push(action.payload.createdStudent);
            return {
              ...state,
                students : updatedStudents
            };
      case DELETE_STUDENT:
           return {
               ...state,
               students : state.students.filter(student => student._id != action.payload.deleteId)
           };
      case UPDATE_STUDENT: 
                  let students = state.students
                  students.find((o, i) => {
                    if (o._id == action.payload.updateData._id) {
                        state.students[i] = action.payload.updateData;
                        return true; // stop searching
                    }
                });
                    return {
                        ...state,
                        students : students
                    };
       case FEES_STUDENT: 
                    let newStudents = state.students
                    newStudents.find((o, i) => {
                      if (o._id == action.payload.result._id) {
                          state.students[i] = action.payload.result;
                          return true; // stop searching
                      }
                  });
                      return {
                          ...state,
                          students : newStudents
                      };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case SIGNUP_FAIL:
        return {
          ...state,
          token: null,
          email : '',
          name : '',
          _id : '',
          students : [],
          requestingLogin: false,
          requestingSignup: false,
          loggedIn : false,
          signedUp : false
        };
      default:
        return state;
    }
  }