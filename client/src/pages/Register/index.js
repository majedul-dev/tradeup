import React, { useState, useEffect } from "react";
import { Button } from "../../components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { register, clearErrors } from "../../actions/authActions";
import { Form } from "react-bootstrap";

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/no-image.jpg");

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

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("username", username);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  return (
    <section className="section container authform">
      <div className="div"></div>
      <h2>Create an Account</h2>
      <form className="pt-4 formStyle" onSubmit={submitHandler}>
        <div class="form-group">
          <label>Username</label>
          <input
            className="form-control"
            placeholder="Enter Username"
            type="text"
            name="username"
            value={username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="Enter Email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            placeholder="Enter Password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        {/* <div className="form-group">
          <label>Confirm Password</label>
          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
          />
        </div> */}
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Avatar</Form.Label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={avatarPreview}
              alt="avatar-preview"
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "999px",
                marginRight: "1rem",
              }}
            />
            <Form.Control
              type="file"
              size="lg"
              name="avatar"
              accept="images/*"
              onChange={onChange}
            />
          </div>
        </Form.Group>
        <Button
          disabled={loading ? true : false}
          type="submit"
          className={`button mt-3 ${loading ? "disabled" : ""}`}
        >
          Register
        </Button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};

export default Register;
