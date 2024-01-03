import React from "react";
import "../../css/login.css";
import useInputState from "../../hooks/inputHook";
import ButtonSpinner from "../../utils/ButtonSpinner";
import useAuthState from "../../hooks/authHook";

function EmailPasswordReset() {
  const { auth } = useAuthState();
  const [email, setEmail] = useInputState("");
  return (
    <form className="login-form-div">
      <h3 style={{ marginLeft: "12px" }}>Please provide your email</h3>
      <div className="login-form-group">
        <label>Email</label>
        <input type="email" value={email} onChange={setEmail} />
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

export default EmailPasswordReset;
