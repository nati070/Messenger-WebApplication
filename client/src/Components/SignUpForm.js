import {
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

import CreateIcon from "@material-ui/icons/Create";
import { useState, useEffect } from "react";
import utils from "../utils/utils";

function SignUpFormComp(props) {
  const originalPaparSize = 400;
  const [paperHeight, setPaperHeight] = useState(originalPaparSize);

  const paperStyle = {
    position: "absolute",
    left: "20%",
    top: "20%",
    padding: 20,
    height: paperHeight + "px",
    width: 280,
    margin: "20px auto",
    border: "7px solid yellow ",
    borderStyle: "ridge",
    //backgroundColor: '#282c34',
  };
  const paperStyleAlart = {
    padding: 20,
    height: "40px",
    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = {
    backgroundColor: "green",
    marginTop: "5px",
  };
  const ButtonSignInStyle = {
    marginTop: "15px",
  };

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [uname, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [confimPassword, setConfimPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errorPwd, setError] = useState(false);
  const [errorEmptyField, setErrorEmptyField] = useState(false);

  const [isUserExist, setIsUserExist] = useState(false);

  useEffect(async () => {
    let isExist = await utils.isUserExist({ username: uname });
    setIsUserExist(isExist);
    if (isExist) {
      setPaperHeight(paperHeight + 50);
    } else if (
      !isExist &&
      paperHeight > originalPaparSize &&
      !errorEmptyField
    ) {
      setPaperHeight(paperHeight - 50);
    } else if (
      !isExist &&
      paperHeight > originalPaparSize + 50 &&
      errorEmptyField
    ) {
      setPaperHeight(paperHeight - 50);
    }
  }, [uname]);

  useEffect(async () => {
    if (password != confimPassword && !errorPwd && confimPassword != "") {
      setError(true);
      setPaperHeight(paperHeight + 50);
    } else if (errorPwd && password == confimPassword) {
      setError(false);
      setPaperHeight(paperHeight - 50);
    }
  }, [password, confimPassword]);

  const setSignUp = async () => {
    let tempPaperHeight = paperHeight;

    if (
      (fname == "" ||
        lname == "" ||
        password == "" ||
        confimPassword == "" ||
        email == "" ||
        uname == "") &&
      !errorEmptyField
    ) {
      setErrorEmptyField(true);
      tempPaperHeight += 50;
    } else if (
      errorPwd == false &&
      errorEmptyField == false &&
      isUserExist == false
    ) {
      const user = {
        firstname: fname,
        lastname: lname,
        username: uname,
        password: password,
        email: email,
      };
      console.log("before utils");
      await utils.setNewUser(user);
      console.log("created");
      props.history.push("/" , {msg : "User Created!"});
    }
    setPaperHeight(tempPaperHeight);
  };

  let toggle;
  let msgPassConf = errorPwd ? (
    <Alert severity="error">Password does not match.</Alert>
  ) : (
    ""
  );
  if (password != confimPassword && confimPassword != "") {
    toggle = errorPwd ? true : false;
  }
  let msgEmptFiled = errorEmptyField ? (
    <Alert severity="error">Please fill all the fields.</Alert>
  ) : (
    ""
  );
  let msgUserExist = isUserExist ? (
    <Alert severity="error">Username already exist</Alert>
  ) : (
    ""
  );

  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          {msgPassConf}
          {msgEmptFiled}
          {msgUserExist}
          <Grid container algin="center">
            <Grid item xs={12} align="center">
              <Avatar style={avatarStyle}>
                <CreateIcon />
              </Avatar>
              <h2>Sign Up</h2>
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="standard-basic"
                label="FirstName"
                onChange={(e) => setFname(e.target.value)}
              />
            </Grid>
            <Grid item xs={5} style={{ marginLeft: "45px" }}>
              <TextField
                id="standard-basic"
                label="LastName"
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <TextField
              error={isUserExist}
              id="standard-basic"
              label="UserName"
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              error={toggle}
              id="standard-basic"
              label="Password"
              fullWidth
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              error={toggle}
              id="standard-basic"
              label="Confirm"
              fullWidth
              type="password"
              onChange={(e) => setConfimPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              style={ButtonSignInStyle}
              onClick={setSignUp}
            >
              Sign Up
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

export default SignUpFormComp;
