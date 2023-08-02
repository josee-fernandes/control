import Task from "./Task";

const Tasks: React.FC<ITasksProps> = ({ tasks }) => {
  return (
    <div className="flex flex-col gap-6">
      {tasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Tasks;
