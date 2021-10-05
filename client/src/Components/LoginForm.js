
import "../styls/LoginForm.css";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import LockIcon from "@material-ui/icons/Lock";
import {useState , useEffect} from 'react'
import utils from '../utils/utils'



function LoginFormComp(props) {

  const originalPaparSize = 380;
  const [paperHeight, setPaperHeight] = useState(originalPaparSize);

  const paperStyle = {
    position: "absolute",
    left: "20%",
    top: "20%",
    padding: 20,
    height: "paperHeight",
    width: 280,
    margin: "20px auto",
    //backgroundColor: "#cccccc",
    //color: "white"
    border: "7px solid yellow ",
    borderStyle: "ridge",
  };

  const avatarStyle = {
    backgroundColor: "green",
    marginTop: "5px",
  };

  const ButtonSignInStyle = {
    margin: "3px 0",
    marginBottom: "15px",
  };

  const TextFildsStyle = {
    marginBottom: "15px",   
  };

  const LinkSignUpStyle = {
    marginLeft: "8px",
  }

  const [username , setUsername] = useState('')
  const [password , setpassword] = useState('')
  const [errorlabel , setErrorLabel] = useState(false)

  useEffect(async ()=>{
    let isHaveToken = await utils.isUserHaveToken()
    if(isHaveToken){ 
      props.history.push('/home' , {username : utils.getUsername()})     
    }
    if(props.location.state){
      setPaperHeight(paperHeight+50)
    } 
  },[])
  

  const setSignIn = async ()=>{
        let user = {username : username , password : password}
        let userAuth = await utils.isUserAuthorized(user)
        if(userAuth.data.auth){
          utils.saveToken(userAuth.data.token)
          utils.saveUserName(username)
          props.history.push('/home' , {username : username})          
        }
        else{
          setErrorLabel(true)
          console.log("Wrong User OR Password")
        }
  }

  let msg = (props.location.state) ? <Alert severity="success">{props.location.state.msg}</Alert> : ''

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
        {msg}
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <h2>Sign In</h2>
          <TextField 
            style={TextFildsStyle}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth
            required
            error = {errorlabel}
            
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            
            style={TextFildsStyle}
            id="outlined-basic1"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={e => setpassword(e.target.value)}
            error = {errorlabel}
          />
        </Grid>
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember Me"
        />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          style={ButtonSignInStyle}
          onClick={setSignIn}
        >
          Sign In
        </Button>

        <Typography >
          Need To
          <Link to="/sign-up" style={LinkSignUpStyle}>Sign Up?</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default LoginFormComp;
