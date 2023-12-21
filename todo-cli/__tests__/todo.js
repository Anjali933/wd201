const todoList = require("../todo");
const { all, markAsComplete, add, overdue,
    dueToday,
    dueLater } = todoList();
const tdy = new Date(); 
const ody = 60 * 60 * 24 * 1000;
describe("todoList", () => {
  beforeAll(() => {
    const tdy = new Date();
     //referred to discord forum for this line of code
    add({
      title: "Teto",
      completed: false,
      dueDate: new Date(tdy.getTime() - 1 * ody).toLocaleDateString(
        "en-CA",
      ),
    });
    add({
      title: "Teto2",
      completed: false,
      dueDate: new Date(tdy.getTime() + 1 * ody).toLocaleDateString(
        "en-CA",
      ),
    });
    add({
      title: "Teto3",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Teto",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });
  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("checks return a list of overdue todos", () => {
    const overDueTodoItemsCount =overdue().length;
    add({
        title: "Teto",
        completed: false,
        dueDate: new Date(tdy.getTime() - 1 * ody).toLocaleDateString(
          "en-CA",
        ),
      });
    expect(overdue().length).toEqual(overDueTodoItemsCount+1) 
  });
  test("checks return a list of todos due today", () => {
    const duetodayTodoItemsCount =dueToday().length;
    add({
        title: "Teto3",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      });
    expect(dueToday().length).toEqual(duetodayTodoItemsCount+1) ;
  });
  test("checks return a list of todos due later", () => {
    const dueLaterTodoItemsCount =dueLater().length;
    add({
        title: "Teto2",
        completed: false,
        dueDate: new Date(tdy.getTime() + 2 * ody)
        .toISOString()
        .slice(0, 10),
      });
    expect(dueLater().length).toEqual(dueLaterTodoItemsCount+1);
  });
});
