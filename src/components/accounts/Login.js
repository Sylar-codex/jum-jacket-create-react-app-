import React from "react";
import useInputState from "../../hooks/inputHook";
import useAuthState from "../../hooks/authHook";
import "../../css/login.css";
import { Link, Navigate } from "react-router-dom";
import ButtonSpinner from "../../utils/ButtonSpinner";

function Login() {
  const { auth, login } = useAuthState();
  const [username, setUsername] = useInputState("");
  const [password, setPassword] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login(username, password);
  };
  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="login-form-div">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={setUsername} />
        </div>
        <div className="login-form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={setPassword} />
        </div>
        <button
          disabled={auth.isSubmitting ? true : false}
          type="submit"
          className={`${auth.isSubmitting ? "login-loading" : "login-submit"}`}
        >
          {auth.isSubmitting ? <ButtonSpinner /> : "Login"}
        </button>
      </form>
      <div className="reg-red">
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <Link style={{ textDecoration: "none" }} to="/email-reset">
          {" "}
          <small>Forgot password?</small>
        </Link>
      </div>
    </div>
  );
}

export default Login;
