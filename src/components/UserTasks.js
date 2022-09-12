import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import AssignedChart from "./AssignedChart";
import UserChart from './UserChart';
import { getUserTask} from "../actions/user";

//import UserService from "../services/user.service";
const UserTasks = () => {
    const dispatch = useDispatch();
    const [info, setInfo] = useState('');
    const idUrl = new URL(window.location.href);
    const id = idUrl.searchParams.get("param");
    useEffect(() => {
        dispatch(getUserTask(id)).then(
            (response) => {
                setInfo((response.data));
            },
            (error) => {
                console.log(error.data);
            }
        );
    }, [dispatch]);
    console.log(info);
    return (
        <div className="container">
            <header className="jumbotron">
                <h3 className='heading'>Task Analytics for selected User</h3>
            </header>
            {info && <div className="chart-div col-md-3">
                <UserChart info={info} />
            </div>}
        </div>
    );
};
export default UserTasks;