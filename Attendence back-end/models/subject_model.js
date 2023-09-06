const mongoose=require('mongoose');
const validator=require('validator');

const subjectSchema= new mongoose.Schema({
    subjectid:{
        type:String,
        require:true,
        unique:true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error("please fill subjectid")
            }
        }
    },
    name:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error("provide the name")
            }
        }
    },
    teacher:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
})

subjectSchema.index({"subjectid":1});

const Subject=new mongoose.model("Subject",subjectSchema);

module.exports=Subject;