const icon = {
  done: "✅",
  paused: "⏸️",
  working: "🛠️",
  dependent: "🟨",
  "not-started": "❌",
};

const Task: React.FC<ITaskProps> = ({ task }) => {
  return (
    <div className="">
      <h2 className="font-bold">
        {task.title} - {icon[task.status]}
      </h2>
      <p>{task.description}</p>
      {task.updates?.map((update) => (
        <blockquote key={update.id} className="ml-4">
          {">"} {update.description}
        </blockquote>
      ))}
    </div>
  );
};

export default Task;
