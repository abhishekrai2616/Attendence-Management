import Teachersubjects from "./TeacherSubjects";
import { UserRole } from "../../store/selectors/user";
import { useRecoilValue } from "recoil";
import Studentsubjects from "./studentSubject";
import Admin from "./admin";

const Content=()=>{
  const userRole=useRecoilValue(UserRole);
  if(userRole==="Teacher"){
    return (
     <Teachersubjects></Teachersubjects>
    )
}else if(userRole==="Admin"){
  return (
    <Admin></Admin>
  )
}else{
  return (
    <Studentsubjects></Studentsubjects>
  )
}
}

export default Content;