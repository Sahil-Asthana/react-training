import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8000";

const getAllUsers = (sortMethod,filterMethod,searchParam,currPage) => {
  return axios.get(API_URL+"/users", {headers : authHeader(),params :{sort : sortMethod, filter : filterMethod, searchParam : searchParam, page : currPage}})
};
const getUser = () => {
  return axios.get(API_URL + "/me", { headers: authHeader() });
};

const updateMe = async (name,email) => {
    const response = await axios.put(API_URL + "/update-me", {name,email},{headers : authHeader()});
    return response;
};

const updateUser = (id,role) => {
  return axios.put(API_URL + "/update-user/"+id, {role:role},{headers : authHeader()});
}
const deleteUser = (id) => {
  return axios.delete(API_URL+"/delete-user/"+id,{headers : authHeader()});
}
const createUser = (name,email,password,password_confirmation,role) =>{
  return axios.post(API_URL+'/create' ,{name,email,password,password_confirmation,role}, {headers : authHeader()});
}

const bulkDeleteUser = (arrayId) => {
  return axios.delete(API_URL+'/bulk-delete',{headers : authHeader(), params : {arrayId : arrayId}});
}

// for task management
const createTask = (title,description,assignee,due_date) =>{
  return axios.post(API_URL+'/create-task', {title,description,assignee,due_date},{headers : authHeader()});
}

const getMyTasks = () => {
  return axios.get(API_URL + '/my-tasks', {headers : authHeader()});
}
const getUserTask = (id) => {
  return axios.get(API_URL+'/tasks/'+id, {headers : authHeader()});
}

const showAllTasks = (sortMethod,filterMethod,searchParam,currentPage,id) => {
  return axios.get(API_URL+"/all-tasks", {headers : authHeader(),params :{sort : sortMethod, filter : filterMethod, searchParam : searchParam , page : currentPage, id : id}});
}

const updateStatus = (id,status) => {
  return axios.put(API_URL+"/status/"+id , {status : status}, {headers : authHeader()});
}

const deleteTask = (id) => {
  return axios.delete(API_URL+"/delete-task/"+id, {headers : authHeader()});
}
const editTask = (id,title,description,due_date) => {
  return axios.put(API_URL + "/edit-task/"+id, {title : title, description : description, due_date : due_date}, {headers : authHeader()});
}

const bulkDeleteTask = (arrayId) => {
  return axios.delete(API_URL+'/tasks/bulk-delete',{headers : authHeader(), params : {arrayId : arrayId}});
}

const listNotifs = () => {
  return axios.get(API_URL + '/listNotifs', {headers: authHeader()});
}

const deleteNotif = (id) => {
  return axios.delete(API_URL + '/notif/'+id, {headers: authHeader()});
}

const clearNotif = () => {
  return axios.delete(API_URL + '/clear-notif', {headers: authHeader()});
}
// eslint-disable-next-line 
export default {
  getUser,
  updateMe,
  getAllUsers,
  deleteUser,
  createUser,
  updateUser,
  createTask,
  getMyTasks,
  bulkDeleteUser,
  getUserTask,
  showAllTasks,
  updateStatus,
  deleteTask,
  editTask,
  bulkDeleteTask,
  listNotifs,
  deleteNotif,
  clearNotif,
};