/*
 * Copyright (c) 2025 Ivan Ikonnikov.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import { useState, useEffect } from "react";
import { Task } from "@/components/TaskBoard";
import { toast } from "sonner";
import { saveTasksToLocalStorage, getTasksFromLocalStorage } from "@/utils/localStorage";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Разработка API",
    description: "Создание RESTful API для проекта",
    dueDate: "2024-03-20",
    priority: "high",
    status: "todo"
  },
  {
    id: "2",
    title: "Дизайн интерфейса",
    description: "Создание макетов в Figma",
    dueDate: "2024-03-25",
    priority: "medium",
    status: "in-progress"
  }
];

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const savedTasks = getTasksFromLocalStorage();
    if (savedTasks) {
      setTasks(savedTasks);
    } else {
      setTasks(initialTasks);
    }
  }, []);

  const handleCreateTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
    };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setIsCreateDialogOpen(false);
    toast.success("Задача создана");
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setIsEditDialogOpen(false);
    setSelectedTask(null);
    toast.success("Задача обновлена");
  };

  const handleTaskDelete = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    toast.success("Задача удалена");
  };

  const handleTaskEdit = (task: Task) => {
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks(tasks => {
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      });
      saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  };

  return {
    tasks,
    selectedTask,
    isCreateDialogOpen,
    isEditDialogOpen,
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    handleCreateTask,
    handleTaskUpdate,
    handleTaskDelete,
    handleTaskEdit,
    updateTaskStatus
  };
}
