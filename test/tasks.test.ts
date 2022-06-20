import request from "supertest";
const app = require("../src/app");
describe("test create task", () => {
  test("correct response", async () => {
    const todo = {
      name: "taskdemo",
      status: "completed",
    };

    const res = await request(app).post("/tasks").send(todo);
    expect(res.body).toEqual({
      name: "taskdemo",
      status: "completed",
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
    expect(res.getMaxListeners()).toBeLessThanOrEqual(10);

    expect(res.error).toBeFalsy();
    expect(res.ok).toBeTruthy();

    expect(res.body.length).toBe(5);
    expect(res.body).toContainEqual({
      id: 5,
      name: "task2",
      status: "pending",
    });
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(res.body).toEqual(
      expect.arrayContaining([{ id: 5, name: "task2", status: "pending" }])
    );
  });
});

describe("test get single task", () => {
  test("correct response", async () => {
    const res = await request(app).get("/tasks/5");
    expect(res.body).toEqual([{ id: 5, name: "task2", status: "pending" }]);
    expect(res.body).toStrictEqual([
      { id: 5, name: "task2", status: "pending" },
    ]);
  });

  test("no task present", async () => {
    const res = await request(app).get("/tasks/1000");
    expect(res.status).toBe(404);
    expect(res.text).toBe("no task with id: 1000");
  });
});

describe("test update task", () => {
  test("correct response", async () => {
    const res = await request(app).put("/tasks/3").send({
      status: "completed",
    });
    expect(res.status).toBe(200);
    expect(res.body).toBe("task updated");
    expect(res.body).toMatch(/Updated/i);
  });

  test("error response", async () => {
    const res = await request(app).put("/tasks/6").send({
      status: "unknown",
    });
    expect(res.status).toBe(400);
  });
});

describe("test delete task", () => {
  test("correct response", async () => {
    const res = await request(app).delete("/tasks/8");
    expect(res.status).toBe(200);
    expect(res.body).toBe("Task Deleted");
    expect(res.body).toBeDefined();
  });
});

describe("pracice mocking", () => {
  test("1", () => {
    const calculate = (fun: Function, num1: Number, num2: Number) => {
      return fun(num1, num2);
    };
    const Operations = {
      sum: function (num1: number, num2: number) {
        return num1 + num2;
      },
      multiply: function (num1: number, num2: number) {
        return num1 * num2;
      },
    };

    const mockSum = jest.fn();
    mockSum.mockImplementation((a, b) => a + b + 1);
    const mockMultiply = jest.fn();
    mockMultiply.mockImplementation((a, b) => a * b + 1);

    jest.spyOn(Operations, "sum").mockImplementation(mockSum);
    jest.spyOn(Operations, "multiply").mockImplementation(mockMultiply);

    // mocked functions will execute instead of real ones.
    expect(calculate(Operations.sum, 1, 2)).toBe(4);
    expect(calculate(Operations.multiply, 3, 2)).toBe(7);
  });
});
