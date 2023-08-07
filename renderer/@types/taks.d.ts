interface ITaskUpdate {
  id: string;
  description: string;
}

type TTaskStatus = "done" | "paused" | "working" | "dependent" | "not-started";

interface ITask {
  id: string;
  title: string;
  description: string;
  status: TTaskStatus;
  updates: ITaskUpdate[];
  createdAt: string;
  updatedAt: string;
}

interface ITaskProps {
  task: ITask;
  column?: boolean;
}

interface ITasksProps {}
