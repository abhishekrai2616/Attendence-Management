const express=require('express');
const {markAttendence,findAttendence}=require('../controllers/attendence_controller');
const {authenticateTeacher}=require('../middlewares/auth')
const router=express.Router();

router.route("/markAttendence").post(authenticateTeacher,markAttendence);
router.route("/checkAttendence").get(authenticateTeacher,findAttendence);

module.exports=router;