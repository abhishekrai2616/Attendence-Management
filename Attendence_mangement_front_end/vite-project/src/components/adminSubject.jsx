import axios from "axios";
import { useEffect, useState } from "react";
import SubjectCard from "./subjectCard";
import { Button, Card,CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";


function AdminSubjects() {
    const [Subject, setSubject] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        const fun=async()=>{
            const res=await axios.get("http://127.0.0.1:3000/Subject/subjectList",{
                withCredentials:true
              });
            setSubject(res.data.findSubject);
        }
        fun();
    }, []);

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center",marginTop:40}}>
        <Card style={{
        margin:10,
        width:250
        }}>
        <CardContent>
        <div >
        <Button variant="contained" style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={() => {
                  navigate("/addSubject/");
              }} >Add-Subject</Button>
              </div>
        </CardContent>
        </Card>
        {Subject.map(subject => {
            return <SubjectCard subject={subject} />}
        )}
    </div>
   
}

export default AdminSubjects;