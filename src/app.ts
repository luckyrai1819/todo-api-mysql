// const express=require('express');
import express,{Application,Request,Response,NextFunction} from 'express'
require('express-async-errors')
const dotenv=require('dotenv');
dotenv.config();
const app:Application=express();

const db=require('./db/connect')
const taskRouter=require('./routes/tasks')
 const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')

app.use(express.json())
app.get('/',(req:Request,res:Response)=>res.send('welcome to todoapi'));

app.use('/tasks',taskRouter);


 app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const start=async()=>{
    try {
         db.connect((err:Error,conn:ConnectionType)=>{
            if(err)
            throw err;
        
            console.log('db connected ');
        })
        app.listen(process.env.PORT || 8080,()=>console.log('running'));

    } catch (error) {
        console.log(error)
    }
}
start();
