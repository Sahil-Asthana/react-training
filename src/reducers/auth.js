import { REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, EMAIL_SENT_FAIL, EMAIL_SENT_SUCCESS } from "../actions/type";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? {isLoggedIn: true ,user} : {isLoggedIn: false, user : null};
// eslint-disable-next-line 
export default function  (state = initialState, action)  {
    const {type, payload} = action;
    switch(type){
        case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case EMAIL_SENT_SUCCESS:
        return{
            ...state,
            isLoggedIn:true,
            user: payload.user
        };
    case EMAIL_SENT_FAIL:
        return{
            ...state,
            isLoggedIn:true,
            user : payload.user
        };
    default: 
      return state;
    }
}