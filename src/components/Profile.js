import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserService from '../services/user.service';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Modal from 'react-bootstrap/Modal';
import { updateMe } from '../actions/user';
import { logout } from '../actions/auth';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const form = useRef();
  const [name, setName] = useState(currentUser.user.name);
  const [email, setEmail] = useState(currentUser.user.email);
  const [content, setContent] = useState('')
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
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
    dispatch(updateMe(name, email))
      .then((response) => {
        console.log(response.data);
        setContent(response.data);
        setShowForm(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch(logout(navigates));
      });

  }

  useEffect(() => {
    setLoading(true);
    UserService.getUser().then(
      (response) => {
        console.log(response.data);
        setLoading(false);
        setContent(response.data)
      },
      (error) => {
        if (error.response && error.response.status) {
          setLoading(false);
          dispatch(logout(navigates));
        }
      }
    );
  }, [dispatch, navigates]);

  if (!currentUser.user.email_verified_at) {
    return <Navigate to="/request_email_verification" />
  }
  return (
    <div className='container'>
      {!loading ? <div><header className="jumbotron">
        <h3>
          Your Profile
        </h3>
      </header>
        <div style={{width:'40%',marginLeft:'40px'}}>
          <img style={{ height: '200px', borderRadius: '100%', margin: '10px'}} src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt='img-pic' />
        </div>
        <div style={{margin:'10px',backgroundColor:'#F8F8EA',padding:'20px',width:'30%'}}>
          <p><strong>name:</strong> {content.name}</p>
          <p><strong>Id:</strong> {content.id}</p>
          <p><strong>Email:</strong> {content.email}</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleForm}>Update profile!</button>
        </div></div> : <div className='spinner-div'><i className='fa fa-circle-o-notch fa-spin spin'></i></div>}
      {showForm &&
      <Modal show={showForm} onHide={handleForm} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        </Form>
        </Modal.Body>
            </Modal>}
    </div>
  );
};
export default Profile;

