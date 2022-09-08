import React ,{useState, useRef} from 'react';
import { useDispatch} from 'react-redux';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { newPassword } from '../actions/auth';
const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
 
const ResetPassword = () => {
    const form = useRef();
   const [successful, setSuccessful] =useState(false); 
   const targetUrl = new URL(window.location.href);
   const token = targetUrl.searchParams.get("token");
   const email = targetUrl.searchParams.get("email");
   const [password, setPassword] = useState("");
   const [password_confirmation, setPasswordConfirmation] = useState("");
   const message ="";
   

   const onChangePassword = (e) =>{
    const password = e.target.value;
    setPassword(password);
   }
   const onChangePasswordConfirmation = (e) =>{
    const password_confirmation = e.target.value;
    setPasswordConfirmation(password_confirmation);
   }

   const dispatch = useDispatch();
   const handleReset = (e) => {
    e.preventDefault();
    dispatch(newPassword(token,email,password,password_confirmation))
    .then((response)=>{
        console.log(response);
        setSuccessful(true);
    }).catch((error)=>{
        console.log(error);
        setSuccessful(false);
    })
   }
   
    return (
        <div className = "col-md-12">
            <div className = "card-container card">
                <Form onSubmit={handleReset} ref={form}>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
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
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                <button className="btn btn-primary btn-block">Submit</button>
                </div>
                {message && (
                <div className = {successful ? "alert alert-success" : "alert alert-danger"}>{message}</div>
                )}
                </Form>
            </div>
        </div>
    )
};

export default ResetPassword;
