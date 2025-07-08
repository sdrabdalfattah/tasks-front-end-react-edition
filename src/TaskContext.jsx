
import { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [reloadTasks, setReloadTasks] = useState(false);
  const [reloadCompleted, setReloadCompleted] = useState(false);

  const triggerReloadTasks = () => setReloadTasks(prev => !prev);
  const triggerReloadCompleted = () => setReloadCompleted(prev => !prev);

  return (
    <TaskContext.Provider value={{
      reloadTasks,
      reloadCompleted,
      triggerReloadTasks,
      triggerReloadCompleted
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
