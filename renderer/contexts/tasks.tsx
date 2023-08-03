import {
  PropsWithChildren,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ITasksContextProps {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  getTasks: () => void;
  createTask: (task: ITask) => void;
  deleteTaskById: (id: string) => void;
  deleteAllTasks: () => void;
  updateLocalTasks: (tasks: ITask[]) => void;
}

const TasksContext = createContext({} as ITasksContextProps);

const TasksContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const getTasks = useCallback(() => {
    const localItems = JSON.parse(localStorage.getItem("tasks")) ?? [];

    setTasks(localItems);
  }, [setTasks]);

  const createTask = useCallback(
    (task: ITask) => {
      setTasks((oldTasks) => [...oldTasks, task]);
    },
    [setTasks]
  );

  const updateLocalTasks = useCallback((tasks: ITask[]) => {
    const localItems = localStorage.getItem("tasks") ?? "{[]}";

    if (localItems !== JSON.stringify(tasks)) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, []);

  const deleteTaskById = useCallback(
    (id: string) => {
      setTasks((oldTasks) => oldTasks.filter((oldTask) => oldTask.id !== id));
    },
    [setTasks]
  );

  const deleteAllTasks = useCallback(() => {
    localStorage.removeItem("tasks");

    setTasks([]);
  }, [setTasks]);

  const contextValues = useMemo(
    () => ({
      tasks,
      setTasks,
      getTasks,
      createTask,
      updateLocalTasks,
      deleteTaskById,
      deleteAllTasks,
    }),
    [
      tasks,
      setTasks,
      getTasks,
      createTask,
      updateLocalTasks,
      deleteTaskById,
      deleteAllTasks,
    ]
  );

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    updateLocalTasks(tasks);
  }, [tasks]);

  return (
    <TasksContext.Provider value={contextValues}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);

export default memo(TasksContextProvider);
