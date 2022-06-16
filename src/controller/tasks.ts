import {Request,Response} from 'express';

const Task=require('../model/task');

const createTask=async(req:Request,res:Response)=>{
    const task=new Task(req.body.name,req.body.status);
    const data=await task.create();
    res.status(200).json({data});

}

const getAllTasks=async(req:Request,res:Response)=>{
    const data=await Task.findAll();
    if(!data)
    res.status(200).send('no task present');

    res.status(200).json({data});
}

const getTask=async(req:Request,res:Response)=>{
    const data=await Task.findById(req.params.id);
    if(!data)
    res.status(200).send(`no task with id: ${req.params.id}`);

    res.status(200).json(data);
}
const updateTask=async(req:Request,res:Response)=>{
    const data=await Task.updateById(req.params.id,req.body.status);
    if(!data)
    res.status(200).send(`no task with id: ${req.params.id}`);

    res.status(200).json(data);
}
const deleteTask=async(req:Request,res:Response)=>{
    const data=await Task.deleteById(req.params.id);
    if(!data)
    res.status(200).send(`no task with id: ${req.params.id}`);

    res.status(200).json('task deleted');
}

module.exports={getAllTasks,createTask,getTask,updateTask,deleteTask};