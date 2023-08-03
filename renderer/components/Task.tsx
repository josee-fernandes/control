import { memo, useCallback } from "react";
import { useTasks } from "../contexts/tasks";

const icon = {
  done: "✅",
  paused: "⏸️",
  working: "🛠️",
  dependent: "🟨",
  "not-started": "❌",
};

const Task: React.FC<ITaskProps> = ({ task }) => {
  const { deleteTaskById } = useTasks();

  const handleDelete = useCallback(() => {
    deleteTaskById(task.id);
  }, [deleteTaskById, task]);

  return (
    <div className="">
      <div className="flex gap-4">
        <h2 className="font-bold">
          {task.title} - {task.id}
        </h2>
        <span>{icon[task.status]}</span>
        <button onClick={handleDelete}>Apagar</button>
      </div>
      <p>{task.description}</p>
      {task.updates?.map((update) => (
        <blockquote key={update.id} className="ml-4">
          {">"} {update.description}
        </blockquote>
      ))}
    </div>
  );
};

export default memo(Task);
