import axios from "axios";
import { useEffect, useState } from "react";
import SubjectCard from "./subjectCard";


function Studentsubjects() {
    const [Subject, setSubject] = useState([]);
    
    useEffect(() => {
        const fun=async()=>{
            const res=await axios.get("http://127.0.0.1:3000/Teacher/studentSubjectList",{
                withCredentials:true
              });
            setSubject(res.data.studentSubject);
        }
        fun();
    }, []);

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center",marginTop:40}}>
        {Subject.map(subject => {
            return <SubjectCard subject={subject} />}
        )}
    </div>
   
}

export default Studentsubjects;