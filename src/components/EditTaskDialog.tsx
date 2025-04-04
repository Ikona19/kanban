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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Task } from "./TaskBoard";
import { TaskForm } from "./TaskForm";

interface EditTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
  onTaskUpdate: (task: Task) => void;
}

export function EditTaskDialog({
  open,
  onOpenChange,
  task,
  onTaskUpdate,
}: EditTaskDialogProps) {
  if (!open) return null;
  
  const handleSubmit = (values: Omit<Task, "id">) => {
    onTaskUpdate({ ...values, id: task.id });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать задачу</DialogTitle>
        </DialogHeader>
        <TaskForm 
          onSubmit={handleSubmit}
          defaultValues={task}
          submitLabel="Сохранить"
        />
      </DialogContent>
    </Dialog>
  );
}
