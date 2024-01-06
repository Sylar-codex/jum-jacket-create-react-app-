import React, { useContext } from "react";
import useInputState from "../../hooks/inputHook";
import useAuthState from "../../hooks/authHook";
import "../../css/register.css";
import { createMessage } from "../../actions/messages";
import { MessageContext } from "../../context/MessageContext";
import { Link, Navigate } from "react-router-dom";
import ButtonSpinner from "../../utils/ButtonSpinner";

function Register() {
  const { auth, register } = useAuthState();
  const { dispatchMessage } = useContext(MessageContext);

  const [first_name, setFirst_name] = useInputState("");
  const [last_name, setLast_name] = useInputState("");
  const [email, setEmail] = useInputState("");
  const [username, setUsername] = useInputState("");
  const [password, setPassword] = useInputState("");
  const [password2, setPassword2] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password2 !== password) {
      dispatchMessage(
        createMessage({ passwordNotMatch: "password doesnt match" })
      );
    } else {
      const newUser = { first_name, last_name, email, username, password };
      register(newUser);
    }
  };
  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="register-form-div">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="register-form-group">
          <label>First Name</label>
          <input type="text" value={first_name} onChange={setFirst_name} />
        </div>
        <div className="register-form-group">
          <label>Last Name</label>
          <input type="text" value={last_name} onChange={setLast_name} />
        </div>
        <div className="register-form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={setEmail} />
        </div>
        <div className="register-form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={setUsername} />
        </div>
        <div className="register-form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={setPassword} />
        </div>
        <div className="register-form-group">
          <label>Confirm Password</label>
          <input type="password" value={password2} onChange={setPassword2} />
        </div>
        <button
          disabled={auth.isSubmitting ? true : false}
          type="submit"
          className={`${
            auth.isSubmitting ? "register-loading" : "register-submit"
          }`}
        >
          {auth.isSubmitting ? <ButtonSpinner /> : "Register"}
        </button>
      </form>
      <div className="login-red">
        <p>
          already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
