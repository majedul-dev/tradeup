import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Input, Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/authActions";
import { useAlert } from "react-alert";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <section className="container section authform">
      <h2>Login to Your Account</h2>
      <form className="pt-4 formStyle" onSubmit={submitHandler}>
        <div class="form-group">
          <label>Email</label>
          <Input
            placeholder="Enter Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <Input
            placeholder="Enter Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/password/forgot" className="forgot-password">
            Forgot Password?
          </Link>
        </div>
        <Button
          disabled={loading ? true : false}
          type="submit"
          className={`button mt-3 ${loading ? "disabled" : ""}`}
        >
          Login
        </Button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/register">Signup</Link>
      </p>
    </section>
  );
};

export default Login;
