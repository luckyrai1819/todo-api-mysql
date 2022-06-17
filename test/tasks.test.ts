import request from "supertest";
const app = require("../src/app");
describe("test create task", () => {
  test("correct response", async () => {
    const res = await request(app).post("/tasks").send({
      name: "taskdemo",
      status: "pending",
    });
    expect(res.body).toEqual({
      name: "taskdemo",
      status: "pending",
    });
  });

  test("error response", async () => {
    const res = await request(app).post("/tasks").send({
      name: "taskdemo",
      status: undefined,
    });
    expect(res.status).toBe(400);
  });
});

describe("test get all tasks", () => {
  test("correct response", async () => {
    const res = await request(app).get("/tasks").query({
      start: 0,
      size: 5,
    });
    expect(res.body.length).toBe(5);
  });
});

describe("test get single task", () => {
  test("correct response", async () => {
    const res = await request(app).get("/tasks/5");
    expect(res.body).toEqual([{ id: 5, name: "task2", status: "pending" }]);
  });

  test("no task present", async () => {
    const res = await request(app).get("/tasks/100");
    expect(res.status).toBe(404);
    expect(res.text).toBe("no task with id: 100");
  });
});

describe("test update task", () => {
  test("correct response", async () => {
    const res = await request(app).put("/tasks/3").send({
      status: "completed",
    });
    expect(res.status).toBe(200);
    expect(res.body).toBe("task updated");
  });

  test("error response", async () => {
    const res = await request(app).put("/tasks/6").send({
      status: "unknown",
    });
    console.log(res.body);
    expect(res.status).toBe(400);
  });
});

describe("test delete task", () => {
  test("correct response", async () => {
    const res = await request(app).delete("/tasks/8");
    expect(res.status).toBe(200);
    expect(res.body).toBe("Task Deleted");
  });
});
