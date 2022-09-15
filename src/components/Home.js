import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import AssignedChart from "./AssignedChart";
import CreatorChart from "./CreatorChart";
import TimeLine from "./TimeLine";
import UserService from "../services/user.service";
import { logout } from '../actions/auth';

const Home = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState('');
  const navigates = useNavigate();

  useEffect(() => {
    UserService.getMyTasks().then(
      (response) => {
        console.log(response);
        setInfo((response.data));
      },
      (error) => {
        if (error.response && error.response.status) {
          alert("Token Expires");
          return dispatch(logout(navigates));
        }
      }
    );
  }, []);
  return (
    <>
      <header className="jumbotron">
        <h3 className='heading'>Your Task Analytics</h3>
      </header>
      <div className='home-div'>
        <div className='row'>
          <div className="chart-div col-lg-6">
            <AssignedChart info={info} />
          </div>
          <div className="chart-div col-lg-6">
            <CreatorChart info={info} />
          </div>
        </div>
      </div>
      <div className='timeline-div'>
            <TimeLine info={info} />
      </div>
    </>

  );
};
export default Home;