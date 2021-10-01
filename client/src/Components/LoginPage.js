import React from "react";
import LoginFormComp from "./LoginForm";
import SignUpFormComp from "./SignUpForm";
import HomePageComp from "./HomePage";

import Background from "../backgroundImage/starsLogin.jpg";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


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
        <Route path="/sign-up" component={SignUpFormComp} />
        <Route path="/home" component={HomePageComp} />
      </Switch>
    </div>
  );
}

export default LoginPageComp;
