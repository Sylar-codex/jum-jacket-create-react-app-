import React, { useEffect, useContext } from "react";
import ButtonSpinner from "../../utils/ButtonSpinner";
import useInputState from "../../hooks/inputHook";
import useAuthState from "../../hooks/authHook";
import { createMessage } from "../../actions/messages";
import { MessageContext } from "../../context/MessageContext";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useInputState("");
  const [password2, setPassword2] = useInputState("");
  const { auth, resetPassword } = useAuthState();
  const { dispatchMessage } = useContext(MessageContext);
  const navigate = useNavigate();

  const { uidb64, token } = useParams();

  useEffect(() => {}, [uidb64, token]);
  // https://localhost:3000/#/reset-passowrd/MTA/c0ctb4-7c72d446fa5f54b9daa4671ef1f0b82f

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatchMessage(
        createMessage({ passwordNotMatch: "password doesnt match" })
      );
    } else {
      resetPassword({ password, uidb64, token });
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form-div">
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
        className={`${auth.isSubmitting ? "login-loading" : "login-submit"}`}
      >
        {auth.isSubmitting ? <ButtonSpinner /> : "Confirm"}
      </button>
    </form>
  );
}

export default ResetPassword;
