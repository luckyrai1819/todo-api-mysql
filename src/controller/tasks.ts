import { Request, Response } from "express";
const db = require("../db/connect");

const createTask = async (req: Request, res: Response) => {
  const { name, status } = req.body;
  const sql = `Insert into tasks(name,status) values(?,?)`;
  const query = await db.query(
    sql,
    [name, status],
    (err: Error, result: any) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
};

const getAllTasks = async (req: Request, res: Response) => {
  let { size = 10, start = 0 } = req.query;

  const sql = `select * from tasks limit ?,?`;

  const query = await db.query(
    sql,
    [Number(start), Number(size)],
    (err: Error, result: any) => {
      if (err) {
        res.status(400).send(err);
      } else if (!result) {
        res.status(404).send("no task present");
      } else {
        res.status(200).json(result);
      }
    }
  );
};

const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = `select * from tasks where id=?`;
  const query = await db.query(sql, id, (err: Error, result: any) => {
    if (err) {
      res.status(400).send(err);
    } else if (result.length == 0) {
      res.status(404).send(`no task with id: ${id}`);
    } else {
      res.status(200).json(result);
    }
  });
};
const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = `update tasks set status=? where id=?`;
  const query = await db.query(sql, [status, id], (err: Error, result: any) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(result);
    }
  });
};
const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = `delete from tasks where id=?`;
  const query = await db.query(sql, id, (err: Error, result: any) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
