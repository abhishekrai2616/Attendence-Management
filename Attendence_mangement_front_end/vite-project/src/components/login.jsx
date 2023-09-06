import { Card,Typography,TextField,Button,CardContent} from "@mui/material";
import axios from "axios";
import { useState,useRef } from "react";
import { userState } from '../../store/atom/user';
import { useRecoilState } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import './login.css'


function Login(){
  const [Id,setId]=useState("");

  const [password,setPassword]=useState("");

  const [UserState,setUserState] = useRecoilState(userState);

 const login=async() => {
  try{
  let res;
  if(UserState.Role==="Teacher"){
    res= await axios.post("http://127.0.0.1:3000/Teacher/loginTeacher",{
    "userid":Id,
    "password":password
    }, {
      headers: {
        "Content-Type": "application/json",
      },
        "withCredentials":true,
    });
  }
    let data = res.data;
    setUserState({
      userId:data.user.userid,
      Role:data.user.Role
    })
    navigate("/content");
    }catch{
      setUserState({
      userId:null
    })

    }     
}

  const navigate=useNavigate(Navigate);
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}>
        <Card style={{maxWidth: 400}}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Login As a  <SwitchButton setUserState={setUserState}></SwitchButton>
          </Typography>
          <TextField
            label="ID"
            type="string"
            variant="outlined"
            fullWidth
            onChange={(e)=>{
              setId(e.target.value);
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth   
            onClick={login}
          >
            Login
          </Button>
        </CardContent>
      </Card>
      </div>
    )
}

const SwitchButton = ({setUserState}) => {
  const btnRef = useRef(null);

  const leftClick = () => {
    btnRef.current.style.left = '0';
    setUserState({
      Role:"Teacher"
    });
  };

  const rightClick = () => {
    btnRef.current.style.left = '110px';
    setUserState({
      Role:"Student"
    });
  };

  return (
    <div className="form-box">
      <div className="button-box">
        <div id="btn" ref={btnRef} />
        <button className="toggle-btn" onClick={leftClick}>
          Teacher
        </button>
        <button className="toggle-btn" onClick={rightClick}>
          Student
        </button>
      </div>
    </div>
  );
};

export default Login;

//BIG LEARNING
// i tried to use the recoil in the same card so that if user if writing its email and password than just dont refresh the whole card
