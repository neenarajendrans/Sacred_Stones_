const mongoose =require("mongoose")

const user= mongoose.Schema({
  fullName:{
      type:String,
      required:true,
      trim: true

  },
  email:{
      type:String,
      required:true,
      unique:true,
      trim: true

  },
  phoneNumber: {
    type: String,
    required: true,
   
  },

  password:{
      type:String,
      required:true,
      

  },
  isAdmin:{
      type:Boolean,
      default:false,

  },

   is_blocked:{
    type:Boolean,
     default:false,
},
},{ timestamps: true });
module.exports=mongoose.model("User",user)