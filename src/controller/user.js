import UserModel from '../model/user.js'
import Auth from '../utils/auth.js'
import nodemailer from 'nodemailer'
import RecipeModel from '../model/recipe.js'

let getAllUser = async(req,res)=>{
    try {
       let user = await UserModel.find({},{password:0})
       res.status(200).send({
        message:"user data fetched Successfully",
        user
       })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

let getUserById = async(req,res)=>{
    try {
        let user = await UserModel.findOne({_id:req.params.id},{password:0})
        res.status(200).send({
            message:`${user.name} data fetched Successfully`,
            user
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

let createUser = async(req,res)=>{
    try {
        let data = req.body
        let user = await UserModel.findOne({email:req.body.email})
        if(!user){
            req.body.password = await Auth.hashPassword(req.body.password)
            let newUser = await UserModel.create(req.body)
            res.status(201).send({
                message:"User Created Successfully",
                newUser
            })
        }else{
            res.status(409).send({
                message:`User with ${req.body.email} already exists`
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}
const login = async(req,res)=>{
    try {
        let user = await UserModel.findOne({email:req.body.email})

        if(user){
            if(await Auth.hashCompare(req.body.password,user.password)){
              let token = await  Auth.createToken({
                    name:user.name,
                    email:user.email, 
                    userId:user._id, 
                    role : user.role
                })
                res.status(200).send({
                    message:"Login Success",
                    token,
                    name:user.name,
                    email:user.email, 
                    userId:user._id, 
                    role : user.role
                })

            }else{
                res.status(500).send({
                    message:"Password Incorrect"
                })
            }
        }else{
            res.status(404).send({
                message:"Invalid UserId or Password"
            })
        }

    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

let editUserById = async(req,res)=>{
    try {
        let user = await UserModel.findOne({_id:req.params.id})
        if(user){
            let data = req.body
            let editedData = await UserModel.findByIdAndUpdate({_id:req.params.id},data,{new:true})
            res.status(200).send({
                message:"User data edited successfully",
                editedData
            })
        }else{
            res.status(404).send({
                message:"Invalid User"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const deleteUserById = async(req,res)=>{
    try {
        let user = await UserModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({
            message:"User Deleted Successfully",
            user
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const resetPassword = async(req,res)=>{
    try {
        let token = req.params.token
        const decodedToken = await Auth.decodeToken(token)
        if(!decodedToken){
            res.status(401).send({
                message:"Invalid Token"
            })
        }
        const user = await UserModel.findOne({_id:decodedToken.id})
        if(!user){
            res.status(401).send({
                message:"User Not Found"
            })
        }
        req.body.password = await Auth.hashPassword(req.body.password)
        user.password = req.body.password
        await user.save()

        res.status(200).send({
            message:"Password Updated"
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const forgotMail = async (req, res) => {
    try {
        let user = await UserModel.findOne({email:req.body.email})
        let token = await Auth.createToken({
                name:user.name,
                email:user.email,
                id:user._id,
                role:user.role
        })
        if(user){
            const transporter = nodemailer.createTransport({
                service:"gmail",
                host:"smtp.gmail.email",
                port:587,
                secure:false,
                auth:{
                    user:process.env.USER_MAIL,
                    pass:process.env.MAIL_PASS
                }
            })
    
            const mailOption = {
                from:{
                    name:'RURAL_DEVELOPMENT',
                    address:process.env.USER_MAIL
                },
                to:[req.body.email],
                subject:"Reset password link for RECIPE APP Application",
                
                html : `<div style="background-color: black;">
                <h1 style="color: red;">Password Reset Mail</h1>
                <p style="color:white">Hello User &#128075;</p>
                <p style="color:white">Click the Link Below Button to Reset Your Password</p>
                <button style="padding: 5px 10px; border-radius: 5px; background-color: orangered; color: white; font-weight: 900; margin: 15px;">
                    <a style="text-decoration: none; color: inherit;" href="http://localhost:5173/reset-password/${token}">Click Here</a>
                </button>
                <p style="color:white">Or Copy Paste The Link: http://localhost:5173/reset-password/${token}</p>
            </div>`
            }
    
            const sendMail = async(transporter,mailOption)=>{
                try {
                    await transporter.sendMail(mailOption);
                    res.status(201).send({
                        message:"Mail send Successfully"
                    })
                } catch (error) {
                    console.log(error);
                }
            }
            sendMail(transporter,mailOption)
        }else{
            res.status(404).send({
                message:`User With ${req.body.email} does not exist`
            })
        }
        
        
    } catch (error) {
        res.status(500).send({
             message: 'Failed to send password reset email.' 
        })
    }
};



const saveRecipe = async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.userId);
        let recipe = await RecipeModel.findById(req.params.recipeId);
        
        if (user && recipe) {
            user.savedList.push(recipe);
            await user.save();
            
            res.status(200).send({
                message: "Recipe Saved Successfully"
            });
        } else {
            res.status(404).send({
                message: "Invalid User or Recipe"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
}

export default {
    getAllUser,
    getUserById,
    createUser,
    login,
    editUserById,
    deleteUserById,
    forgotMail,
    resetPassword,
    saveRecipe
}