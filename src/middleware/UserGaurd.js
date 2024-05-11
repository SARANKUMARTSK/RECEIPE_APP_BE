import Auth from '../utils/auth.js'

const UserGaurd = async(req,res,next)=>{
 
    try {
        let token = req?.headers?.authorization?.split(" ")[1]
        if(token)
        {
            let payload = await Auth.decodeToken(token)
            if(payload.role === 'admin' || payload.role ==='user')
                next()
            else    
                res.status(402).send({message:"Permission Denied"})
        }
        else
        {
            res.status(402).send({
                message:"Token Not Found"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error",
        })
    }
}

export default UserGaurd