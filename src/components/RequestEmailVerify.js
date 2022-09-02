import React from 'react';
import {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Navigate } from 'react-router-dom';
import { requestVerifyEmail } from '../actions/auth';

const RequestEmailVerify = () => {
    const {user : currentUser} = useSelector((state) => state.auth);
   // const [successful, setSuccessful] = useState(false);
    //const   {message } = useSelector(state => state.message); 
    const message = "";
    const [successful, setSuccessful] = useState(false);
    const dispatch = useDispatch();

    if(!currentUser){
        <Navigate to = "/login" />;
    }
    const handleVerifyEmailRequest = (e) => {
        e.preventDefault();
        dispatch(requestVerifyEmail())
        .then(() => {
            //console.log(res);
            //alert('success');
            setSuccessful(true);
        })
        .catch(() => {
            setSuccessful(false);
        });
    };
    return (
        <div className = "col-md-12">
            <div className = "card-container card">
                <h3>Verify your email!</h3>
                <button className="btn btn-primary" onClick={handleVerifyEmailRequest}>Verify Email</button>
            </div>
            {message && (
                <div className = {successful ? "alert alert-success" : "alert alert-danger"}>{message}</div>
            )}
        </div>
    );
}
export default RequestEmailVerify;