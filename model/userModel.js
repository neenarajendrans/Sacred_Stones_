const mongoose =require("mongoose")

const user= mongoose.Schema({
  FullName:{
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
    match: /^(?!0+$)(?!0)/, // Regular expression to exclude strings consisting only of zeros or starting with zero
    minlength: 10, // Example: Minimum length of 10 characters
    maxlength: 10 // Example: Maximum length of 15 characters
  },

  password:{
      type:String,
      required:true,
      minlength:5

  },
  isAdmin:{
      type:Number,
      default:0,

  },
  image:{
    type:String
   
},


   is_blocked:{
    type:Number,
     default:1,
},
},{ timestamps: true });
module.exports=mongoose.model("User",user)