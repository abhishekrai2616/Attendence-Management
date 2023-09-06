import { useState } from "react";
import { Card,Typography,TextField,Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSubject= () => {
    const [name, setName] = useState();
    const [teacher, setTeacher] = useState();
    const [subjectid, setSubjectid] = useState();
    const navigate=useNavigate();
  
    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} style={{maxWidth: 600, marginTop: 200}}>
        <div style={{padding: 20}}>
            <Typography style={{marginBottom: 10}}>AddSubject</Typography>
            <TextField
                value={name}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setName(e.target.value)
                }}
                fullWidth={true}
                label="Name"
                variant="outlined"
            />
  
            <TextField
                value={subjectid}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setSubjectid(e.target.value)
                }}
                fullWidth={true}
                label="SubjectId"
                variant="outlined"
            />
  
            <TextField
                value={teacher}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setTeacher(e.target.value)
                }}
                fullWidth={true}
                label="TeacherId"
                variant="outlined"
            />
  
            <Button
                variant="contained"
                onClick={async () => {
                    axios.post("http://127.0.0.1:3000/Subject/addSubject", {
                        name: name,
                        subjectid: subjectid,
                        teacher: teacher,
                        
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                            "withCredentials":true,
                        });
                        navigate("/addSubject")
                }
                }
            > Add</Button>
        </div>
    </Card>
  </div>
  }

  export default AddSubject;