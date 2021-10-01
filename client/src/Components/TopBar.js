import { Avatar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";

import { ChatContext } from "../Contexts/ChatProvider";

const useStyle = makeStyles(() => ({
  avatar: {
    marginTop: 10,
     marginLeft: 20,
     height: 70,
     width: 70
  },
  room_name: {
    marginLeft: 15,
    marginTop: 20,
    fontSize: 30,
  },

}));
function TopBarComp() {
  const { nameOfRoom } = useContext(ChatContext);
  const [nameOfRoomVal] = nameOfRoom

  const classes = useStyle();
  return (
    <div>
      <Grid container spacing={2}>
        <Avatar className={classes.avatar} />

        <p className={classes.room_name}> {nameOfRoomVal} </p>
      </Grid>
    </div>
  );
}

export default TopBarComp;
