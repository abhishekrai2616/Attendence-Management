import { Button, Card, Typography,CardMedia,CardContent} from "@mui/material";
import { UserRole } from "../../store/selectors/user";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

const SubjectCard=(subject)=>{
    const userRole=useRecoilValue(UserRole);
    const navigate = useNavigate();
    return (
      <Card style={{
        margin:10,
        width:400
        }}>
      <CardMedia
        component="img"
        height="200"
        image="https://blog.cdn.cmarix.com/blog/wp-content/uploads/2022/05/Attendance-Management-System.png"
        alt="Image alt text"
      />
      <CardContent>
        <Typography variant="h5" component="div" style={{display:"flex",justifyContent:"center"}}>
          {subject.subject.name}({subject.subject.subjectid})
        </Typography>
        {userRole==="Admin" && <div style={{display:"flex",justifyContent:'space-between',marginTop:"20px"}}>
        <Button variant="contained" onClick={() => {
                  navigate("/updateSubject/" + subject.subject.subjectid);
              }} >Update</Button>
        
        <Button variant="contained" onClick={() => {
                  navigate("/removeSubject/" + subject.subject.subjectid);
              }}>Remove</Button>

        </div>}

        {(userRole==="Student" || userRole==="Teacher") && <div style={{display:"flex",justifyContent:'space-between',marginTop:"20px"}}>
        <Button variant="contained" onClick={() => {
                  navigate("/course/" + subject.subject.subjectid);
              }} >Check-Attendence</Button>
        
        {userRole==="Teacher" && <Button variant="contained" onClick={() => {
                  navigate("/course/" + subject.subject.subjectid);
              }}>Mark-Attendence</Button>}
              </div>}
      </CardContent>
    </Card>
    )
  }
  
  export default SubjectCard;