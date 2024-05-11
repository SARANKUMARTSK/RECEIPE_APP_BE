import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import AppRoutes from './src/routes/index.js'

const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send(
        `<div style="display: flex; justify-content: center;align-items: center; height: 90vh;">
            <div style="display: flex; flex-direction: column; max-width: 400px; justify-content: center; align-items: center;">
                <h1 style="font-weight: 900; font-size:100px; color: gray;">Oops !</h1>
                <h2 style="color: gray; font-weight: 900; text-align: center;">No data found in this path., Try Different path...!</h2>
            </div>
        </div>`
    )
})

app.use('/',AppRoutes)

app.listen(process.env.PORT ,()=>console.log(`App is Running in ${process.env.PORT}`))