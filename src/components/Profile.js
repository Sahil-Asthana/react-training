import React, { useState , useEffect, useRef} from 'react';
import {Navigate,useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import UserService from '../services/user.service';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { updateMe } from '../actions/user';
import { logout } from '../actions/auth';
const Profile = () => {
    const {user : currentUser} = useSelector((state) => state.auth);
    const form = useRef();
    const [name, setName] = useState(currentUser.user.name);
    const [email, setEmail] = useState(currentUser.user.email);
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();
    const navigates = useNavigate();
    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };
      const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const handleForm = () => {
        setShowForm(!showForm);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();      
        dispatch(updateMe(name,email))
        .then((response) => {
              console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
       
    }
    
  useEffect(() => {
    UserService.getUser().then(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        if(error.response && error.response.status){
          console.log("Token is not valid");
          return dispatch(logout(navigates));
        }
      }
    );
  }, [dispatch, navigates]);

    if(!currentUser.user.email_verified_at){
        return <Navigate to = "/request_email_verification"/>
    }
    return (
        <div className='container'>
            <header className="jumbotron">
                <h3>
                 Your Profile 
                </h3>
            </header>
           <div >
            <p>
                <strong>name:</strong> {currentUser.user.name}
            </p>
            </div>
            <div>
            <p>
                <strong>Id:</strong> {currentUser.user.id}
            </p>
            </div>
            <div>
            <p>
                <strong>Email:</strong> {currentUser.user.email}
            </p>
            </div>
            <div>
            <button className = "btn btn-primary" onClick={handleForm}>Update profile!</button>
            </div>
            {showForm && 
            <Form onSubmit={handleSubmit} ref={form}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={onChangeName}
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
              />
            </div>
            <div className="form-group">
                <button className="btn btn-primary btn-block">Submit</button>
            </div>
            </Form>}
        </div>
    );
};
export default Profile;

