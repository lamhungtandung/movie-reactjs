import {
  //get
  GET_USER_LIST_REQUEST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAIL,
 //delete
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL,
  //reset
   RESET_USER_LIST,
   //update
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
  //add user
  ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAIL,
  //set user
  SET_IS_EXIST_USER_MODIFIED,
  //get user
  GET_INFO_USER_REQUEST, GET_INFO_USER_SUCCESS, GET_INFO_USER_FAIL,
} from './constants/UsersManagement';

const initialState = {
  usersList: null,
  loadingUsersList: false,
  errorUsersList: null,

  successDelete: "",
  loadingDelete: false,
  errorDelete: null,

  successUpdateUser: null,
  loadingUpdateUser: false,
  errorUpdateUser: null,

  successAddUser: null,
  loadingAddUser: false,
  errorAddUser: null,

  isExistUserModified: false,

  successInfoUser: null,
  loadingInfoUser: false,
  errorInfoUser: null,
}

const usersManagementReducer = (state = initialState, action) => {
  //get user
  switch (action.type) {
    case GET_USER_LIST_REQUEST: {
      return { ...state, loadingUsersList: true, errorUsersList: null };
    }
    case GET_USER_LIST_SUCCESS: {
      return {
        ...state,
        usersList: action.payload.data,
        loadingUsersList: false
      };
    }
    case GET_USER_LIST_FAIL: {
      return {
        ...state,
        errorUsersList: action.payload.error,
        loadingUsersList: false,
      };
    }
//delete user
    case DELETE_USER_REQUEST: {
      return {
        ...state, loadingDelete: true, errorDelete: null, successDelete: "",
      }
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state, loadingDelete: false, successDelete: action.payload.data, errorDelete: null,
      }
    }
    case DELETE_USER_FAIL: {
      return {
        ...state, loadingDelete: false, errorDelete: action.payload.error, successDelete: "",
      }
    }
    //reset user
    case RESET_USER_LIST: {
      return {
        ...state,
        errorUsersList: null,

        successDelete: "",
        errorDelete: null,

        successUpdateUser: null,
        errorUpdateUser: null,
      }
    }
//update user
    case UPDATE_USER_REQUEST: {
      return {
        ...state, loadingUpdateUser: true, errorUpdateUser: null, successUpdateUser: null
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state, loadingUpdateUser: false, successUpdateUser: action.payload.data, errorUpdateUser: null
      }
    }
    case UPDATE_USER_FAIL: {
      return {
        ...state, loadingUpdateUser: false, errorUpdateUser: action.payload.error, successUpdateUser: null
      }
    }
//add user
    case ADD_USER_REQUEST: {
      return {
        ...state, loadingAddUser: true, errorAddUser: null, successAddUser: null
      }
    }
    case ADD_USER_SUCCESS: {
      return {
        ...state, loadingAddUser: false, successAddUser: action.payload.data, errorAddUser: null
      }
    }
    case ADD_USER_FAIL: {
      return {
        ...state, loadingAddUser: false, errorAddUser: action.payload.error, successAddUser: null
      }
    }

    case SET_IS_EXIST_USER_MODIFIED: {
      state.isExistUserModified = action.payload.isExistUserModified
      return state
    }

    case GET_INFO_USER_REQUEST: {
      return { ...state, loadingInfoUser: true, errorInfoUser: null };
    }
    case GET_INFO_USER_SUCCESS: {
      return {
        ...state,
        successInfoUser: action.payload.data,
        loadingInfoUser: false
      };
    }
    case GET_INFO_USER_FAIL: {
      return {
        ...state,
        errorInfoUser: action.payload.error,
        loadingInfoUser: false,
      };
    }
    default:
      return state;
  }
}
export default usersManagementReducer;