import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import AssignedChart from "./AssignedChart";
import CreatorChart from "./CreatorChart";
import UserService from "../services/user.service";
import { logout } from '../actions/auth';

const Home = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState('');
  const navigates = useNavigate();

  useEffect(() => {
    UserService.showMyTasks().then(
      (response) => {
        setInfo((response.data));
      },
      (error) => {
        if (error.response && error.response.status) {
          console.log("Token is not valid");
          return dispatch(logout(navigates));
        }
      }
    );
  }, [dispatch, navigates]);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3 className='heading'>Your Task Analytics</h3>
      </header>
      <div className="chart-div col-md-3">
        <AssignedChart info={info} />
        <CreatorChart info={info} />
      </div>
    </div>
  );
};
export default Home;