const mongoose=require('mongoose');

const UserSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       select:false
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    plan:{
        type:String,
        enum:['free','premium'],
        default:'free'
    },
    refreshToken:{
        type:String,
        required:true,
        default:null
    }
},
{
        timestamps:true

}
)

module.exports = mongoose.model('User', UserSchema);