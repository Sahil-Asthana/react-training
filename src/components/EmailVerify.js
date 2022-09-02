import React ,{useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
   },[]);

   
    return (
        <div className = "col-md-12">
            <div className = "card-container card">
                <h3>Email Verified!</h3>
                {/* <button className="btn btn-primary" onClick={handleVerifyEmailRequest}>Verify Email</button> */}
            </div>
        </div>
    )
};

export default EmailVerify;
