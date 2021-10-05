import React from "react";
import LoginFormComp from "./LoginForm";
import SignUpFormComp from "./SignUpForm";
import HomePageComp from "./HomePage";

import Background from "../backgroundImage/starsLogin.jpg";

import { Switch, Route } from "react-router-dom";


function LoginPageComp() {
  const style = {
    backgroundImage: `url(${Background})` , 
    backgroundSize: "cover", 
    minHeight: "100vh" , 
    display: "flex",
    flexDirection: "column",
  
  }
  return (
    <div style={style}>
      <Switch>
        <Route exact path="/" component={LoginFormComp} />
        <Route path="https://615c6beb2d501f0007d978d7--quirky-noyce-6ef7be.netlify.app/sign-up" component={SignUpFormComp} />
        <Route path="/home" component={HomePageComp} />
      </Switch>
    </div>
  );
}

export default LoginPageComp;
