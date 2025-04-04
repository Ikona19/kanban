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
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { EditTaskDialog } from "./EditTaskDialog";
import { DndTaskBoard } from "./DndTaskBoard";
import { useTaskManager } from "@/hooks/useTaskManager";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assignee?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed" | "review" | "done";
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
}

export function TaskBoard() {
  const {
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
  } = useTaskManager();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Задачи</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2" />
          Создать задачу
        </Button>
      </div>

      <DndTaskBoard
        tasks={tasks}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
        onTaskEdit={handleTaskEdit}
        onStatusChange={updateTaskStatus}
      />

      <CreateTaskDialog 
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onTaskCreate={handleCreateTask}
      />

      {selectedTask && (
        <EditTaskDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          task={selectedTask}
          onTaskUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
}
