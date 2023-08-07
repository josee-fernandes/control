import { useMemo } from "react";
import { useTasks } from "../contexts/tasks";
import Task from "./Task";

interface IFilteredTasks {}

// const icon = {
//   done: "✅",
//   paused: "⏸️",
//   working: "🛠️",
//   dependent: "🟨",
//   "not-started": "❌",
// };

const FilteredTasks: React.FC = () => {
  const { tasks } = useTasks();

  const done = useMemo(
    () => tasks.filter((task) => task.status === "done") ?? [],
    [tasks]
  );
  const paused = useMemo(
    () => tasks.filter((task) => task.status === "paused") ?? [],
    [tasks]
  );
  const working = useMemo(
    () => tasks.filter((task) => task.status === "working") ?? [],
    [tasks]
  );
  const dependent = useMemo(
    () => tasks.filter((task) => task.status === "dependent") ?? [],
    [tasks]
  );
  const notStarted = useMemo(
    () => tasks.filter((task) => task.status === "not-started") ?? [],
    [tasks]
  );

  return (
    <div className="flex gap-2 w-full max-h-[500px]">
      <div className="flex flex-col gap-2">
        <div className="font-extrabold">Finalizado ✅</div>
        <div className="flex flex-col gap-2">
          {done?.map((task) => (
            <Task key={task.id} task={task} column />
          ))}
        </div>
      </div>

      <div className="bg-red-700 w-2 h-full" />

      <div className="flex flex-col gap-2">
        <div className="font-extrabold">Pausado ⏸️</div>
        <div className="flex flex-col gap-2">
          {paused?.map((task) => (
            <Task key={task.id} task={task} column />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-extrabold">Trabalhando 🛠️</div>
        <div className="flex flex-col gap-2">
          {working?.map((task) => (
            <Task key={task.id} task={task} column />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-extrabold">Dependente 🟨</div>
        <div className="flex flex-col gap-2">
          {dependent?.map((task) => (
            <Task key={task.id} task={task} column />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-extrabold">Não iniciado ❌</div>
        <div className="flex flex-col gap-2">
          {notStarted?.map((task) => (
            <Task key={task.id} task={task} column />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilteredTasks;
