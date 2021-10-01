import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Background from "../backgroundImage/stars.jpg"


const useStyle = makeStyles(() => ({
  send_msg: {
    borderRadius: "15px 0px 15px 0px",
   // background: "#73AD21",
    padding: "7px",
    display: "inline-block",
    border: "7px solid white ",
    borderStyle: "ridge",
    maxWidth: "50%",
    minWidth: "30%",
    overflow: "hidden",
    height: "auto",
    borderSpacing: 12,
    fontSize: 25,
    backgroundImage: `url(${Background})`,
    color: "white",
 
  },
  paddinglines: {
    paddingRight: 100,
    padding: 5,
    display: "flex",
    justifyContent: "flex-end",
 
  
    
  },
}));
function SendComp(props) {
  const classes = useStyle();
  const [msg, setMsg] = useState(props.msg);

  useEffect(() => {
    let lines = Math.floor(props.msg.length / 50);
    let sumLines;
    let maxCharLine = 40;
    let start = 0;
    while (lines >= 0) {
      let line = props.msg.slice(start, maxCharLine + start);
      sumLines = (
        <div>
          {sumLines} {line} <br />
        </div>
      );
      start += maxCharLine;
      lines--;
    }
    setMsg(sumLines);
  }, []);

  return (
    <div className={classes.paddinglines}>
      <div className={classes.send_msg}>{msg}</div>
      
    </div>
  );
}
export default SendComp;
