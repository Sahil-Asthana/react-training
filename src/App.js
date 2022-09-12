import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Link, Route, BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from "./components/Profile";
import User from "./components/User";
import Task from './components/Task';
import Notification from './components/Notification'
import PasswordReset from "./components/PasswordReset";
import ResetPassword from "./components/ResetPassword";
import RequestEmailVerify from "./components/RequestEmailVerify";
import { logout } from './actions/auth';
import { clearMessage } from './actions/messages';
import { history } from './helpers/history';
import EmailVerify from "./components/EmailVerify";
import UserService from "./services/user.service";
import Pusher from "pusher-js";
import UserTasks from "./components/UserTasks"


const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [info, setInfo] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };

  useEffect(()=>{
    UserService.listNotifs().then((response)=>{
    setInfo(response.data);
    Pusher.logToConsole = true;

    var pusher = new Pusher('47e061ae680fadb96900', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('my-channel-'+currentUser.user.id);
    channel.bind('my-event', function (data) {
      alert(JSON.stringify(data.message));
    });
  }).catch((error)=>{
    console.log(error.data);
  })
  },[currentUser]);

  return (
    <BrowserRouter history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            {currentUser && <li className="nav-item">
              <Link to={"/home"} className="nav-link">Home</Link>
            </li>}
            {(currentUser && currentUser.user.role === "admin") && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link"> User</Link>
              </li>
            )}
            {currentUser &&
              <li className="nav-item">
                <Link to={"/tasks"} className="nav-link">Tasks</Link>
              </li>
            }
          </div>
          {currentUser ? (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">{currentUser.user.name}</Link>
              </li>
                <Notification info={info}/>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>LogOut</a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">SignUp</Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/request_email_verification" element={<RequestEmailVerify />} />
            <Route exact path="/email_verify" element={<EmailVerify />} />
            <Route path="/user" element={<User />} />
            <Route exact path="/password_reset" element={<PasswordReset />} />
            <Route exact path="/password/reset" element={<ResetPassword />} />
            <Route exact path="/tasks" element={<Task />} />
            <Route exact path="/user-tasks" element={<UserTasks />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default App;
