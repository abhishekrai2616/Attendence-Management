import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from '@mui/material';
import {useNavigate} from "react-router-dom";
import { useRecoilState } from 'recoil';
import { userState } from '../../store/atom/user';
import { useEffect } from 'react';
import axios from 'axios';

function Appbar() {
  const navigate=useNavigate();
  const [user,setUser]=useRecoilState(userState);

  if(user.userId){
    return(
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Attendence-Mangement
        </Typography>
        <Button color="inherit" onClick={async()=>{
            await axios.
            setUser({
                userId:null
            })
            navigate("/login");
        }
        }>Logout</Button>
      </Toolbar>
    </AppBar>
    );
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Attendence-Mangement
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
