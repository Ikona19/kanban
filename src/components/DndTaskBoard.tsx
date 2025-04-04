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
import { useState } from "react";
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskColumn } from "./TaskColumn";
import { Task } from "./TaskBoard";
import { toast } from "sonner";

interface DndTaskBoardProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskEdit: (task: Task) => void;
  onStatusChange: (taskId: string, status: Task["status"]) => void;
}

export const columns = [
  { id: "todo", title: "К выполнению", color: "bg-[#D3E4FD]" },
  { id: "in-progress", title: "В процессе", color: "bg-[#FEF7CD]" },
  { id: "completed", title: "Выполнено", color: "bg-[#F2FCE2]" },
  { id: "review", title: "На проверке", color: "bg-[#FEC6A1]" },
  { id: "done", title: "Завершено", color: "bg-[#FFDEE2]" }
];

export function DndTaskBoard({ tasks, onTaskUpdate, onTaskDelete, onTaskEdit, onStatusChange }: DndTaskBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overStatus = over.data.current?.sortable?.status || over.data.current?.status;

    if (activeTask && overStatus && activeTask.status !== overStatus) {
      onStatusChange(activeTask.id, overStatus);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overStatus = over.data.current?.sortable?.status || over.data.current?.status;
    
    if (activeTask && overStatus && activeTask.status !== overStatus) {
      toast.success("Задача перемещена");
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-5 gap-4">
        {columns.map((column) => (
          <SortableContext
            key={column.id}
            items={tasks.filter((task) => task.status === column.id)}
            strategy={horizontalListSortingStrategy}
          >
            <TaskColumn
              title={column.title}
              status={column.id as Task["status"]}
              tasks={tasks.filter((task) => task.status === column.id)}
              onTaskUpdate={onTaskUpdate}
              onTaskDelete={onTaskDelete}
              onTaskEdit={onTaskEdit}
              color={column.color}
              isOver={activeId !== null}
            />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
