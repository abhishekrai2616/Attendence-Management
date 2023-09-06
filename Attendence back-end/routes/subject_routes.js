const express=require('express');
const {addSubject,removeSubject,subjectList}=require('../controllers/subject_controllers');
const {authenticateAdmin}=require('../middlewares/auth');

const router=express.Router();

router.route("/addSubject").post(authenticateAdmin,addSubject);
router.route("/removeSubject").delete(authenticateAdmin,removeSubject);
router.route("/subjectList").get(authenticateAdmin,subjectList);

module.exports=router;