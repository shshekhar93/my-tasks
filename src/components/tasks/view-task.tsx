import React from "react";
import { Task } from "./types";

interface ViewTaskProps {
  task: Task;
}

const ViewTask: React.FC<ViewTaskProps> = ({ task }) => {
  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>{task.dueDate}</p>
    </div>
  );
};

export default ViewTask;