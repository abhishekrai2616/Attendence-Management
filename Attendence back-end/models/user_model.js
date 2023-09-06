const mongoose=require('mongoose');
const validator=require('validator');
const error = require('../middlewares/error');
const bcrypt=require('bcrypt');
const jsonwebtoken=require('jsonwebtoken');


const userSchema=new mongoose.Schema({
    userid:{
        type:String,
        require:true,
        unique:true,
        validate(value){
            if(validator.isEmpty(value)){
               throw new Error("please fill it");
            }
        }
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("please provide legitmate email");
            }
        }
    },
    name:{
        type:String,
        require:true,
        validate(value){
            if(validator.isEmpty(value)){
               throw new Error("please fill it");
            }
        }
    },
    password:{
        type:String,
        require:true,
        select:false,//this will help in not showing the password when projection is done
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error("pease fill password");
            }
        }
    },
    Role:{
        type:String,
        default:"Teacher"
    }
})
userSchema.methods.getJwtToken=function(){
const Token=jsonwebtoken.sign({id:this._id},process.env.KEY);
return Token;
}
userSchema.methods.comparePassword=async function(enteredPassword){
    const correctTeacher=bcrypt.compare(enteredPassword,this.password);
    return correctTeacher;
}

userSchema.pre("save",async function(next){
    const saltround=10;
   // console.log(this.isModified("password"));
   //here we cannot use the fatarrow function because it modifies the this. property
    if(!this.isModified("password")){next}
    this.password=await bcrypt.hash(this.password,saltround);

})

const User=mongoose.model("User",userSchema);

module.exports=User;