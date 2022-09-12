import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../actions/auth";
import ReCAPTCHA from "react-google-recaptcha";
import Alert from "react-bootstrap/Alert";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const [human, setHuman] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0 && human) {
      dispatch(login(email, password))
        .then(() => {
          props.history.push("/profile");
          window.location.reload();

        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setShow(true);
      setLoading(false);
    }
  };
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleLogin} ref={form}>
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
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <ReCAPTCHA sitekey="6Ldo3pohAAAAAIIh7-J_Mtg6-HWAS3HdXpzDfmrM" onChange={() => setHuman(true)} />
          <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Error Occurred</Alert.Heading>
            <p>
              Captcha verification failed
            </p>
          </Alert>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <Link to="/password_reset">Forgot Password</Link>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};
export default Login;