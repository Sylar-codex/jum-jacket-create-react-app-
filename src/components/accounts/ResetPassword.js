import React, { useEffect } from "react";
import ButtonSpinner from "../../utils/ButtonSpinner";
import useInputState from "../../hooks/inputHook";
import useAuthState from "../../hooks/authHook";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useInputState("");
  const [password2, setPassword2] = useInputState("");
  const { auth } = useAuthState();

  const { uidb64, token } = useParams();

  useEffect(() => {
    console.log(uidb64, token);
  }, [uidb64, token]);

  return (
    <form className="login-form-div">
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
        {auth.isSubmitting ? <ButtonSpinner /> : "Next"}
      </button>
    </form>
  );
}

export default ResetPassword;
