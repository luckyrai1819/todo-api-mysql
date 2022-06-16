const db=require('../db/connect');

class Task{
    name:string;
    status:string;
    constructor(name:string,status:string){
        this.name=name;
        this.status=status;
    }

    async create(){
        let sql=`Insert into tasks(name,status) values('${this.name}','${this.status}')`;

        const task=await db.execute(sql,(err:Error)=>{if(err)throw err;});
        // console.log(task);
        return task;

    }

    static async findAll(){
        let sql=`select * from tasks`;
        const tasks=await db.execute(sql,(err:Error)=>{if(err)throw err;});
        //console.log(tasks)
        return tasks;
    }
    static async findById(id:Number){
        let sql=`select * from tasks where id=${id}`;
        const task=await db.execute(sql,(err:Error)=>{if(err)throw err;});
        //console.log(task)
        return task;
    }
    static async updateById(newId:Number,newStatus:string){
        let sql=`UPDATE tasks SET status=${newStatus} where id=${newId}`;
        const task=await db.execute(sql,(err:Error)=>{if(err)throw err;});
       // console.log(task)
        return task;
    }
    static async deleteById(id:Number){
        let sql=`delete from tasks where id=${id}`;
        const task=await db.execute(sql,(err:Error)=>{if(err)throw err;});
        //console.log(task)
        return task;
    }
}

module.exports=Task;

