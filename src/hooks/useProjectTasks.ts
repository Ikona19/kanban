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
import { Task } from "@/types/project";
import { toast } from "sonner";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Разработка дизайна",
    description: "Создание макетов интерфейса",
    dueDate: "2024-03-20",
    status: "todo",
    attachments: []
  },
  {
    id: "2",
    title: "Настройка базы данных",
    description: "Создание схемы и миграций",
    dueDate: "2024-03-25",
    status: "in-progress",
    attachments: []
  },
  {
    id: "3",
    title: "Тестирование API",
    description: "Проверка эндпоинтов",
    dueDate: "2024-03-22",
    status: "review",
    attachments: []
  }
];

export function useProjectTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        // Убедимся, что у каждой задачи есть массив attachments
        const tasksWithAttachments = parsedTasks.map((task: Task) => ({
          ...task,
          attachments: task.attachments || []
        }));
        setTasks(tasksWithAttachments);
      } catch (error) {
        console.error('Error parsing saved tasks:', error);
        setTasks(initialTasks);
      }
    } else {
      setTasks(initialTasks);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }, [tasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    const task = tasks.find(t => t.id === active.id);
    if (task) {
      setActiveColumn(task.status);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find(task => task.id === active.id);
    const overStatus = over.data.current?.status || over.id;

    if (activeTask && activeTask.status !== overStatus) {
      setTasks(tasks => {
        return tasks.map(task => {
          if (task.id === activeTask.id) {
            return { ...task, status: overStatus };
          }
          return task;
        });
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveColumn(null);
    
    if (!over) return;
    
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      const updatedTask = { ...tasks[oldIndex], status: over.data.current?.status };
      
      newTasks[newIndex] = updatedTask;
      setTasks(newTasks);
      toast.success("Задача перемещена");
    }
  };

  return {
    tasks,
    activeId,
    activeColumn,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    setTasks
  };
}
