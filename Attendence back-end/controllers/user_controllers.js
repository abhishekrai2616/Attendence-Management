const User=require('../models/user_model');
const Subject=require('../models/subject_model');
const linkSubjectStudent=require('../models/linkSubjectStudent_model');
const catchAsyncError=require('../middlewares/catchAsyncError');
const ErrorHandler=require('../utils/ErrorHandler');


const registerUser=catchAsyncError(async (req,res,next) =>{
    const user=await User.create({
        userid:req.body.userid,
        email:req.body.email,
        name:req.body.name,
        password:req.body.password,
        Role:req.body.role
    })

    const findUser=await User.findOne({userid:req.body.userid});
    if(findUser){
        res.json({
            user
        })
    }
    else{
        return next(new ErrorHandler("id is taken",404));
    }
})

const removeUser=catchAsyncError(async(req,res,next)=>{
    const user=await User.findOne({userid:req.query.userid});
    if(user){
       const deleteUser=await User.deleteOne({userid:req.query.userid});
       res.json({
        deleteUser
       })
    }else{
        return next(new ErrorHandler("something is wrong",404));
    }
})

const registerAdmin=catchAsyncError(async (req,res,next)=>{
    const admin=await User.create({
         userid:req.body.adminid,
         email:req.body.email,
         name:req.body.name,
         password:req.body.password,
         Role:"Admin"
    })
    const findAdmin=await User.findOne({userid:req.body.adminid});
    if(findAdmin){
        res.json({
            admin
        })
    }else{
        return next (new ErrorHandler("id is taken",404));
    }
})

const loginUser=catchAsyncError(async (req,res,next)=>{
    const {userid,password}=req.body;
    const user=await User.findOne({userid:userid}).select("+password");

    const correctUser=await user.comparePassword(password);

    if(correctUser){
        const Token=await user.getJwtToken(password);
        res.cookie("Token",Token,{httpOnly: true, sameSite: 'None', secure: true}).json({
            cong:"you are logged in",
            message:"cookie is also set",
            user:user
        });
    }else{
        return next(new ErrorHandler("id or password is wrong",404));
    }
})

const checkSubjects=catchAsyncError(async(req,res,next)=>{
        const id=req.teacher._id;
        //console.log(id);
        const subjects=await Subject.find({teacher:id});
        if(subjects){
            res.json({
                subjects
            })
        }else{
            return next(new ErrorHandler("something is wrong",404));
        }
})

 const addStudentToSubject=catchAsyncError(async(req,res,next)=>{
    const subject=await Subject.findOne({subjectid:req.body.subjectid});
    const student=await User.findOne({userid:req.body.userid});
    const find=await linkSubjectStudent.findOne({teacher:subject.teacher,student:student._id,subject:subject._id})
    if(!find && subject && student){
    const addStudentToSubject=await linkSubjectStudent.create({
        rollno:req.body.userid,
        subjectid:req.body.subjectid,
        subject:subject._id,
        teacher:subject.teacher,
        student:student._id
 })
    const findStudentSubject=await linkSubjectStudent.findOne({teacher:subject.teacher,student:student._id,subject:subject._id});

    if(findStudentSubject){
        res.json({
            findStudentSubject
        })
    }else{
        return next(new ErrorHandler("something is wrong",404));
    }
}else{
    res.json({
        massage:"already present in collection"
    })
}

})
const removeStudentSubject=catchAsyncError(async(req,res,next)=>{
    const findStudentSubject=await linkSubjectStudent.findOne({teacher:req.teacher._id,student:req.query.student,subject:req.query.subject});
    if(findStudentSubject){
    const remove=await linkSubjectStudent.deleteOne({teacher:req.teacher._id,student:req.query.student,subject:req.query.subject});
        res.json({
            massage:"its done"
        });
    }else{
        return next(new ErrorHandler("something is wrong",404));
    }
})

const subjectStudentList=catchAsyncError(async(req,res,next)=>{
//     const subjectStudent=await linkSubjectStudent.aggregate([
//         {
//           $match:{teacher:req.teacher._id}
//         },
//         { 
//             $group: {_id:"$subject",items:{$push:"$$ROOT"}}
//         }
// ]);

  const subjectStudent=await linkSubjectStudent.find({subject:req.params.subjectid});
if(subjectStudent){
    res.json({
        subjectStudent
    })
}else{
    return next(new ErrorHandler("did not find any of this teacher",404));
}
})

const studentSubjectList=catchAsyncError(async(req,res,next)=>{
    const studentSubject=await linkSubjectStudent.find({student:req.student._id});
    if(studentSubject){
        res.json({
            studentSubject
        })
    }else{
        return next(new ErrorHandler("not find any subject",404));
    }
})
          
           
 

module.exports={
    registerUser,
    removeUser,
    registerAdmin,
    loginUser,
    checkSubjects,
    addStudentToSubject,
    removeStudentSubject,
    subjectStudentList,
    studentSubjectList
}