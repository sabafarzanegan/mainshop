import React from "react";
import LoginCard from "./LoginCard";
import RhfLogin from "./RhfLogin";

function LoginForm() {
  return (
    <LoginCard title="ورود">
      <div className="">
        <RhfLogin />
      </div>
    </LoginCard>
  );
}

export default LoginForm;
