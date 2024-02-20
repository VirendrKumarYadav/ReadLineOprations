console.log("started server");
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const tasks = [];

const addTask = (taskName) => {
  tasks.push({ name: taskName, completed: false });
  console.log(`Task "${taskName}" added.`);
};
const viewTask = () => {
  console.log("\nTasks:");
  tasks.forEach((task, idx) => {
    console.log(`${idx + 1}. [${task.completed ? "X" : " "}] ${task.name}`);
  });
};

const markTaskAsCompleted = (taskIdx) => {
  if (taskIdx >= 0 && taskIdx < tasks.length) {
    tasks[taskIdx].completed = true;
    console.log(`Task "${tasks[taskIdx].name}" marked as complete.`);
  } else {
    console.log("Invalid task index.");
  }
};

const deleteTask = (taskIdx) => {
  if (taskIdx >= 0 && taskIdx < tasks.length) {
    const removedTask = tasks.splice(taskIdx, 1);
    console.log(`Task "${removedTask[0].name}" is deleted.`);
  } else {
    console.log("Invalid task index.");
  }
};

const promtTask = () => {
  rl.question(
    "\nEnter your command (add, view, complete, delete, exit): ",
    (answer) => {
      switch (answer) {
        case "add":
          rl.question("Enter task name: ", (taskName) => {
            addTask(taskName);
            promtTask();
          });
          break;
        case "view":
          viewTask();
          promtTask();
          break;
        case "complete":
          rl.question("Enter task index to mark as complete: ", (index) => {
            markTaskAsCompleted(parseInt(index) - 1);
            promtTask();
          });
          break;
        case "delete":
          rl.question("Enter task index to remove: ", (index) => {
            deleteTask(parseInt(index) - 1);
            promtTask();
          });
          break;
        case "exit":
          rl.close();
          break;
        default:
          console.log("Invalid commandadd.");
          promtTask();
          break;
      }
    }
  );
};

console.log("Welcome to the Task Manager!");

promtTask();

