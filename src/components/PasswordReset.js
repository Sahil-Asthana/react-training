import React ,{useEffect,useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { resetPassword } from '../actions/auth';
const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

const PasswordReset = () => {
    const dispatch = useDispatch();
    const form = useRef();
    const [email, setEmail] = useState("");
    const message = "";
    const [successful, setSuccessful] = useState(false);
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
      };
    const handleRequest = (e) => {
        e.preventDefault();
        dispatch(resetPassword(email))
        .then(()=>{
            setSuccessful(true)
        }).catch(()=>{
            setSuccessful(false);
        })
        
    }
    return (
        <div className='col-md-12'>
            <div className='card card-container'>
                <Form onSubmit={handleRequest} ref={form}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
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
    );
}
export default PasswordReset;