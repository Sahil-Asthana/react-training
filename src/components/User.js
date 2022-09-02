import React, { useState, useEffect, useRef } from "react";
import {useSelector, useDispatch} from 'react-redux';
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Toast from 'react-bootstrap/Toast'
import { getAllUsers , deleteUser, createUser, updateUser} from "../actions/user";
import { Dropdown, DropdownButton } from "react-bootstrap";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const User = () => {
const {user : currentUser} = useSelector(state => state.auth);
const form = useRef(); 
const [info, setInfo] = useState("");
const [name, setName] = useState("");
const [password, setPassword]=useState("");
const [password_confirmation, setPasswordConfirmation] = useState("");
const [role, setRole] = useState("");
const [email, setEmail] = useState("");
const [flagOne, setFlagOne] = useState(false);
const [createFlag, setCreateFlag] = useState(false);
const [content, setContent] = useState("");
const [searchParam,setSearchParam]= useState("");
const [sortMethod, setSortMethod] = useState("");
const [filterMethod, setFilterMethod] = useState("");
const dispatch = useDispatch();

const onChangeName = (e) => {
  const name = e.target.value;
  setName(name);
}
const onChangeEmail = (e) => {
  const email = e.target.value;
  setEmail(email);
}
const onChangePassword = (e) => {
  const password = e.target.value;
  setPassword(password);
}
const onChangePasswordConfirmation = (e) => {
  const password_confirmation = e.target.value;
  setPasswordConfirmation(password_confirmation);
}
const onChangeRole = (e) => {
  const role = e.target.value;
  setRole(role);
}

// For sorting
const handleSort = (e) => {
  setSortMethod(e.target.value);
  dispatch(getAllUsers(e.target.value,filterMethod,searchParam)).then((response)=>{
    console.log(response.data);
    setCreateFlag(false);
    setInfo(response.data);
  })
  .catch((error)=>{
    console.log(error);
  })
}
//for filtering
const handleFilter = (e) => {
  console.log(e.target.value);
  // if(e.target.value === 'Apply filter') e.target.value = null;
   setFilterMethod(e.target.value);
    dispatch(getAllUsers(sortMethod,e.target.value,searchParam)).then((response)=>{
    console.log(response.data);
    setCreateFlag(false);
    setInfo(response.data);
  })
  .catch((error)=>{
    console.log(error);
  })
}
const handleSearch = (e) => {
  e.preventDefault();
    dispatch(getAllUsers(sortMethod,filterMethod,searchParam)).then((response)=>{
    console.log(response.data);
    setCreateFlag(false);
    setInfo(response.data);
  })
  .catch((error)=>{
    console.log(error);
  })
}


// Get all users
const handleUsers = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(sortMethod,filterMethod,searchParam)).then((response)=>{
      console.log(response.data);
      setFlagOne(!flagOne);
      setCreateFlag(false);
      setInfo(response.data);
      setFilterMethod("");
      setSortMethod("");
    })
    .catch((error)=>{
      console.log(error);
    })

};

//Show create form
const handleCreateForm = (e) => {
  e.preventDefault();
  setCreateFlag(!createFlag);
  setFlagOne(false);
}
// create a user 
const handleCreate = (e) => {
  e.preventDefault();
  dispatch(createUser(name,email,password,password_confirmation,role)).then((response)=>{
    console.log(response);
    setCreateFlag(false);
    setFlagOne(false);
  })
  .catch((error)=>{
    console.log(error);
  }) 
}
// delete a user
const handleDelete = (e,id) => {
  e.preventDefault();
  dispatch(deleteUser(id)).then((response)=>{
    console.log(response);
    setCreateFlag(false);
  })
  .catch((error)=>{
    console.log(error);
  })
}
// update role of user
const handleUpdate = (e,id) => {
  dispatch(updateUser(id,e.target.value)).then((response)=>{
    console.log(response.data);
  })
  .catch((error)=>{
    console.log(error);
  })
}


  useEffect(() => {
    UserService.getUser().then(
      (response) => {
        //console.log(response);
        setContent(JSON.stringify(response.data));
      },
      (error) => {
        const content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(content);
      }
    );
  }, []);
  return (
    <div className="container"> 
      <div className="jumbotron">
          <div className="board">{currentUser.user.name} , You have Admin Privileges</div>
      </div>
        <button className="btn btn-primary" onClick={handleCreateForm}>Create User</button>
        {createFlag && 
        <Form onSubmit={handleCreate} ref={form}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={onChangeName}
            validation={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Input
            type="text"
            className="form-control"
            name="email"
            value={email}
            onChange={onChangeEmail}
            validation={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={onChangePassword}
            validation={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <Input
            type="password"
            className="form-control"
            name="password_confirmation"
            value={password_confirmation}
            onChange={onChangePasswordConfirmation}
            validation={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <Input
            type="text"
            className="form-control"
            name="role"
            value={role}
            onChange={onChangeRole}
            validation={[required]}
          />
        </div>
        <div className="form-group">
            <button className="btn btn-primary btn-block">Submit</button>
        </div>
        </Form>}

      {/* Above is for creating user by admin */}
        
        <button className="btn btn-primary" onClick={handleUsers}> Show All Users</button>
        { flagOne && 
        <div>
          <div className="drop-menu">
          <div>
            <select className="form-select selected-form" aria-label="size 3 select example" onChange={handleSort}>
            <option defaultValue>Sort By</option>
            <option value = 'name'>Name</option>
            <option value = 'email'> Email</option>
            <option value = 'created_at'> Recent</option>
           </select>
           </div>
           <div>
            <select className="form-select selected-form" aria-label="size 3 select example" onChange={handleFilter}>
            <option defaultValue>Apply filter</option>
            <option value = 'admin'> Admin User</option>
            <option value = 'normal'> Normal User</option>
            <option value = 'deleted_at'> Deleted Tasks</option>
           </select>
           </div>
           <div>
                <input value={searchParam} onChange={(event)=>setSearchParam(event.target.value)} placeholder="Search here"/>
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            </div>
          </div>
          <table className="table table-hover table-primary">
            <thead>
              <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created By</th>
                  <th>Deleted By</th>
                  <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {info.map((item) => {
                return [
                  <tr key={item}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <select className="form-select" aria-label="size 3 select example" onChange={(e)=>handleUpdate(e,item.id)}>
                      <option defaultValue>{item.role}</option>
                      <option value="admin">admin</option>
                      <option value="normal">normal</option>
                      
                      </select>
                      </td>
                    <td>{item.created_by}</td>
                    <td>{item.deleted_by}</td>
                    <td><button className="btn btn-secondary" onClick={(e)=>handleDelete(e,item.id)}>Delete</button></td>
                  </tr>
                ]
              })}
            </tbody>
          </table>
        </div>
        }
    </div>
  );
};
export default User;