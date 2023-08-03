import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Tasks from "../components/Tasks";

import { randomUUID } from "node:crypto";

import TasksContextProvider, { useTasks } from "../contexts/tasks";
import { NextPage } from "next";
import { IHomeProps } from "../@types/page";

const Home: NextPage<IHomeProps> = () => {
  const { createTask, deleteAllTasks } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TTaskStatus>("not-started");

  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setStatus("not-started");
  }, [setTitle, setDescription, setStatus]);

  const handleAddTask = useCallback(async () => {
    const task: ITask = {
      id: randomUUID(),
      title,
      description,
      status,
      updates: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      createTask(task);
    } catch (error) {
      console.error(error);
    } finally {
      resetForm();
    }
  }, [title, description, status, createTask]);

  const handleDeleteAllTasks = useCallback(async () => {
    try {
      deleteAllTasks();
    } catch (error) {
      console.error(error);
    } finally {
    }
  }, [deleteAllTasks]);

  return (
    <React.Fragment>
      <Head>
        <title>Control</title>
      </Head>
      <div>
        <div className="flex flex-col gap-4">
          <h1>Tarefas</h1>
          <form
            className="flex flex-col gap-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex gap-4">
              <label htmlFor="title">Title</label>
              <input
                className="text-zinc-800"
                type="text"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="description">Description</label>
              <input
                className="text-zinc-800"
                type="text"
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="status">Status</label>
              <select
                className="text-zinc-800"
                id="status"
                defaultValue="not-started"
                value={status}
                onChange={(event) => {
                  if (
                    event.target.value === "done" ||
                    event.target.value === "paused" ||
                    event.target.value === "working" ||
                    event.target.value === "dependent" ||
                    event.target.value === "not-started"
                  )
                    setStatus(event.target.value);
                }}
              >
                <option value="done">✅ Finalizado</option>
                <option value="paused">⏸️ Pausado</option>
                <option value="working">🛠️ Trabalhando</option>
                <option value="dependent">🟨 Dependência</option>
                <option value="not-started">❌ Não iniciado</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-emerald-500 px-2 py-1"
                onClick={handleAddTask}
              >
                Adicionar tarefa
              </button>
              <button
                className="bg-red-500 px-2 py-1"
                onClick={handleDeleteAllTasks}
              >
                Apagar todas as tarefas
              </button>
            </div>
          </form>
        </div>

        <Tasks />
      </div>
    </React.Fragment>
  );
};

const HomeWithContexts: NextPage<IHomeProps> = (props) => {
  return (
    <TasksContextProvider>
      <Home {...props} />
    </TasksContextProvider>
  );
};

export default HomeWithContexts;
