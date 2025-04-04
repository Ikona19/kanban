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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "./ui/card";
import { Task } from "./TaskBoard";
import { ColumnHeader } from "./ColumnHeader";
import { TaskList } from "./TaskList";

interface TaskColumnProps {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskEdit: (task: Task) => void;
  color: string;
  isOver: boolean;
}

export function TaskColumn({
  title,
  status,
  tasks,
  onTaskUpdate,
  onTaskDelete,
  onTaskEdit,
  color,
  isOver
}: TaskColumnProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: status,
    data: {
      type: "column",
      status
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${color} p-4 space-y-4 min-h-[calc(100vh-12rem)] transition-colors duration-200 ${
        isOver ? 'ring-2 ring-primary ring-opacity-50' : ''
      }`}
      {...attributes}
    >
      <ColumnHeader title={title} taskCount={tasks.length} />
      <TaskList
        tasks={tasks}
        onTaskUpdate={onTaskUpdate}
        onTaskDelete={onTaskDelete}
        onTaskEdit={onTaskEdit}
      />
    </Card>
  );
}
