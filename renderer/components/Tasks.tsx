import { useTasks } from "../contexts/tasks";
import Task from "./Task";

const Tasks: React.FC<ITasksProps> = () => {
  const { tasks } = useTasks();

  return (
    <div className="flex flex-col gap-6">
      {tasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Tasks;
