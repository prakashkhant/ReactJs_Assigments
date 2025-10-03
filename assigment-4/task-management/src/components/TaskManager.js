import React, { Component } from "react";
import TaskList from "./TaskList";


class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: 1, text: "Learn React", completed: false },
        { id: 2, text: "Build a project", completed: false },
      ],
      newTask: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ newTask: e.target.value });
  };

  addTask = (e) => {
    e.preventDefault();
    if (this.state.newTask.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: this.state.newTask,
      completed: false,
    };

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
      newTask: "",
    }));
  };

  toggleTaskCompletion = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  render() {
    return (
      <div className="task-manager">
        {/* Controlled Form */}
        <form className="task-form" onSubmit={this.addTask}>
          <input
            type="text"
            value={this.state.newTask}
            onChange={this.handleInputChange}
            placeholder="Enter a new task"
          />
          <button type="submit">Add Task</button>
        </form>

        {/* Task List */}
        <TaskList
          tasks={this.state.tasks}
          onToggle={this.toggleTaskCompletion}
          onDelete={this.deleteTask}
        />
      </div>
    );
  }
}

export default TaskManager;
