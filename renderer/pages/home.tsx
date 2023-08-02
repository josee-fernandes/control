import React, { useEffect, useState } from "react";
import Head from "next/head";
import Tasks from "../components/Tasks";

import { randomUUID } from "node:crypto";

function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const getTasks = () => {
    const localItems = JSON.parse(localStorage.getItem("tasks")) ?? [];

    setTasks(localItems);
  };

  const createTask = (task: ITask) => {
    setTasks((oldTasks) => [...oldTasks, task]);
  };

  const deleteAllTasks = () => {
    setTasks([]);

    localStorage.removeItem("tasks");
  };

  const updateLocalTasks = (tasks: ITask[]) => {
    const localItems = localStorage.getItem("tasks") ?? "{[]}";

    if (localItems !== JSON.stringify(tasks)) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  const handleAddTask = async () => {
    const task: ITask = {
      id: randomUUID(),
      title: "Test",
      description: "Description test",
      status: "not-started",
      updates: [
        {
          id: randomUUID(),
          description: "Update test",
        },
        {
          id: randomUUID(),
          description: "Update test",
        },
        {
          id: randomUUID(),
          description: "Update test",
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      createTask(task);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      deleteAllTasks();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (tasks?.length > 0) {
      updateLocalTasks(tasks);
    }
  }, [tasks]);

  return (
    <React.Fragment>
      <Head>
        <title>Control</title>
      </Head>
      <div>
        <div className="flex flex-col gap-4">
          <h1>Tarefas</h1>
          <button className="bg-emerald-500" onClick={handleAddTask}>
            Adicionar tarefa
          </button>
          <button className="bg-red-500" onClick={handleDeleteAllTasks}>
            Apagar todas as tarefas
          </button>
        </div>

        <Tasks tasks={tasks} />
      </div>
    </React.Fragment>
  );
}

export default Home;
