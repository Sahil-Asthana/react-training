import React ,{useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { emailVerify } from '../actions/auth';
 
const EmailVerify = () => {
    
   const [successful, setSuccessful] =useState(false); 
   const tokenUrl = new URL(window.location.href);
   const token = tokenUrl.searchParams.get("token");
   //console.log(token);

   const dispatch = useDispatch();
   useEffect(() => {
    dispatch(emailVerify(token))
    .then(() => {
        setSuccessful(true);
       // dispatch(logout());
    })
    .catch(() =>{
        setSuccessful(false);
    });
   },[dispatch,token]);

   
    return (
        <div className = "col-md-12">
            <div className = "card-container card">
                <h3>Email Verified!</h3>
            </div>
        </div>
    )
};

export default EmailVerify;
