import mongoose from "./index.js";

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Name is Required"]
        },
        email:{
            type:String , 
            required:[true,"Email is Required"],
            validate:{
                validator:(value)=>validateEmail(value)
            }
        },
        phoneNumber : {
            type:String , 
            default:""
        },
        password:{
            type:String , 
            required:[true , "Password is Required"]
        },
        createdAt : {
            type:Date , 
            default:new Date()
        },
        role : {
            type:String , 
            default:"user"
        },
        savedList :{
            type:Array ,
            default :[]
        },
        recipes:{
            type:Array, 
            default:[]
        },
        saved:{
            type:Array,
            default:[]
        }
    },
    {
        collection:"users",
        versionKey:false
    }
)

const userModel = mongoose.model('users',userSchema)

export default userModel