const jsonwebtoken=require('jsonwebtoken');
const User=require('../models/user_model');
const catchAsyncError = require('./catchAsyncError');
const ErrorHandler = require('../utils/ErrorHandler');

const authenticateAdmin= catchAsyncError(async (req,res,next)=>{
    const {Token}=req.cookies;

    const Admin=jsonwebtoken.verify(`${Token}`,`${process.env.KEY}`);

    const adminDetail= await User.findById(Admin.id);
    
    if(adminDetail.Role==="Admin"){
        req.admin=adminDetail;
        next();
    }else{
        return next(new ErrorHandler("something is wrong",404));
    }
    

})

const authenticateTeacher= catchAsyncError(async (req,res,next)=>{
    const {Token}=req.cookies;

    const teacher=jsonwebtoken.verify(`${Token}`,`${process.env.KEY}`);

    const teacherDetail= await User.findById(teacher.id);

    if(teacherDetail){
        req.teacher=teacherDetail;
        next();
    }else{
        return next(new ErrorHandler("something is wrong",404));
    }
})

const authenticateStudent= catchAsyncError(async (req,res,next)=>{
    const {Token}=req.cookies;

    const student=jsonwebtoken.verify(`${Token}`,`${process.env.KEY}`);

    const studentDetail= await User.findById(student.id);

    if(studentDetail){
        req.student=studentDetail;
        next();
    }else{
        return next(new ErrorHandler("something is wrong",404));
    }
})


module.exports={authenticateAdmin,authenticateTeacher,authenticateStudent};