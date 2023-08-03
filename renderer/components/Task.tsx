import { memo, useCallback, useState } from "react";
import { useTasks } from "../contexts/tasks";

const icon = {
  done: "✅",
  paused: "⏸️",
  working: "🛠️",
  dependent: "🟨",
  "not-started": "❌",
};

const Task: React.FC<ITaskProps> = ({ task }) => {
  const { deleteTaskById, updateTaskById } = useTasks();

  const [editing, setEditing] = useState(false);

  const handleToggleEditing = useCallback(() => {
    setEditing((oldEditing) => !oldEditing);
  }, [setEditing]);

  const handleUpdateTask = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (
        event.target.value === "done" ||
        event.target.value === "paused" ||
        event.target.value === "working" ||
        event.target.value === "dependent" ||
        event.target.value === "not-started"
      ) {
        updateTaskById({ ...task, status: event.target.value });

        handleToggleEditing();
      }
    },
    [updateTaskById, task]
  );

  const handleDelete = useCallback(() => {
    deleteTaskById(task.id);
  }, [deleteTaskById, task]);

  return (
    <div className="bg-zinc-950 p-4">
      <div className="flex gap-4 items-center justify-between">
        <h2 className="font-bold">
          {task.title} - {task.id}
        </h2>
        <div className="flex gap-4 items-center">
          {editing ? (
            <select
              className="text-zinc-800"
              value={task.status}
              onChange={handleUpdateTask}
            >
              <option value="done">✅ Finalizado</option>
              <option value="paused">⏸️ Pausado</option>
              <option value="working">🛠️ Trabalhando</option>
              <option value="dependent">🟨 Dependência</option>
              <option value="not-started">❌ Não iniciado</option>
            </select>
          ) : (
            <span>{icon[task.status]}</span>
          )}
          <button
            className={
              editing ? "bg-emerald-500 px-2 py-1" : "bg-blue-500 px-2 py-1"
            }
            onClick={handleToggleEditing}
          >
            {editing ? "Editando" : "Editar"}
          </button>
          <button className="bg-red-500 px-2 py-1" onClick={handleDelete}>
            Apagar
          </button>
        </div>
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
