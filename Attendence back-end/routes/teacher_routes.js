const express=require('express');
const {registerUser,removeUser,registerAdmin,loginUser,checkSubjects,addStudentToSubject,removeStudentSubject,subjectStudentList,studentSubjectList}=require('../controllers/user_controllers');
const {authenticateAdmin,authenticateTeacher, authenticateStudent}=require('../middlewares/auth');
const router=express.Router();

router.route("/registerTeacher").post(authenticateAdmin,registerUser);
router.route("/removeUser").delete(authenticateAdmin,removeUser);
router.route("/registerAdmin").post(registerAdmin);
router.route("/loginTeacher").post(loginUser);
router.route("/checkSubjects").get(authenticateTeacher,checkSubjects);
router.route("/addStudentToSubject").post(authenticateAdmin,addStudentToSubject);
router.route("/removeStudentSubject").delete(authenticateAdmin,removeStudentSubject);
router.route("/subjectStudentList/:subjectid").get(authenticateTeacher,subjectStudentList);
router.route("/studentSubjectList").get(authenticateStudent,studentSubjectList);
module.exports=router;
