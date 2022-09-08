import axios from 'axios';
import authHeader from './auth-header';
const API_URL = "http://localhost:8000/";
const register = (name,email,password) => {
    return axios.post(API_URL + "signup", {
        name,
        email,
        password
    });
};
const login = async (email, password) => {
    const response = await axios.post(API_URL + "login", {
        email,
        password
    });
    if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};
const requestVerifyEmail = async () => {
    const response = await axios.post(API_URL + "email/request-verification", {}, { headers: authHeader() });
    if (response.data.access_token) {
        localStorage.setItem("token", JSON.stringify(response.data));
    }
    alert(response.data);
    return response.data;
};
const emailVerify = async (token) => {
    const response = await axios.post(API_URL + "email/verify",{token} );
    console.log(response.data);
    return response.data;
};
const resetPassword = (email) => {
    const response = axios.post(API_URL + "password/reset-request",{email});
    //alert(response.data);
    return response;
}
const newPassword = (token,email,password,password_confirmation) => {
    const response = axios.post(API_URL+"/password/reset",{token,email,password,password_confirmation});
    return response;
}
// eslint-disable-next-line 
export default {
    register,
    login,
    logout,
    requestVerifyEmail,
    emailVerify,
    resetPassword,
    newPassword
}