import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS, LOGOUT, SET_MESSAGE, EMAIL_SENT_SUCCESS, EMAIL_SENT_FAIL
,VERIFY_SUCCESS, VERIFY_FAIL, UPDATE, PASSWORD_RESET,PASSWORD_RESET_FAILED} from "./type";
import AuthService from "../services/auth.service";
export const register = (name,email,password) => (dispatch) => {
    return AuthService.register(name,email,password).then((response) => {
        dispatch ({
            type : REGISTER_SUCCESS
        });
        dispatch({
            type: SET_MESSAGE,
            payload : response.data.message
        });
        return Promise.resolve();
    }, (error) => {
        const message = (error.response && error.response.data && error.response.data.message) || 
                        error.message || error.toString();
        dispatch({
            type : REGISTER_FAIL
        });
        dispatch({
            type : SET_MESSAGE,
            payload : message
        });
        return Promise.reject();
        }
    );
};
export const login = (name, password) => (dispatch) => {
    return AuthService.login(name, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };
  export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
      type: LOGOUT,
    });
  };
  export const requestVerifyEmail = () => (dispatch) => {
    return AuthService.requestVerifyEmail().then(
        (response) => {
            dispatch({
                type : EMAIL_SENT_SUCCESS,
            });
            dispatch({
                type: SET_MESSAGE,
                payload : response.data.message
            });
            return Promise.resolve();
        },
        (error) => {
            const message =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            dispatch({
              type: EMAIL_SENT_FAIL,
            });
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
            return Promise.reject();
          }
    );
  };

  export const emailVerify = (token) => async (dispatch)=>{
     await AuthService.emailVerify(token);
      dispatch({
          type: VERIFY_SUCCESS,
      });
      return await Promise.resolve();
  };
  export const resetPassword = (email) => (dispatch) =>{
    return AuthService.resetPassword(email).then(()=>{
      dispatch({
        type : PASSWORD_RESET
      });
      return Promise.resolve();
    },(error) => {
      const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: PASSWORD_RESET_FAILED,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
    });
  };
  export const newPassword = (token,email,password,password_confirmation) => (dispatch) => {
    return AuthService.newPassword(token,email,password,password_confirmation).then((response)=>{
      dispatch({
        type:PASSWORD_RESET
      });
      dispatch({
        type : SET_MESSAGE,
        payload : response.data.message 
      });
      return Promise.resolve();
    },(error)=>{
      const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: PASSWORD_RESET_FAILED,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
    });
  }
