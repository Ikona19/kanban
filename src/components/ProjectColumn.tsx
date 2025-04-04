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
import { Task } from "@/types/project";
import { ProjectTask } from "./ProjectTask";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

interface ProjectColumnProps {
  title: string;
  status: Task["status"];
  tasks: Task[];
  isActive: boolean;
  isDraggingOver: boolean;
  onTaskUpdate?: (updatedTask: Task) => void;
}

export function ProjectColumn({ 
  title, 
  status, 
  tasks,
  isActive,
  isDraggingOver,
  onTaskUpdate
}: ProjectColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      status,
      type: "column"
    }
  });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "bg-gray-50 p-4 rounded-lg transition-all duration-200 min-h-[calc(100vh-12rem)]",
        (isDraggingOver || isOver) && "ring-2 ring-primary ring-opacity-50 bg-gray-100",
        isActive && "bg-gray-100 scale-[1.02]"
      )}
      data-status={status}
    >
      <h3 className="font-semibold text-lg mb-4 text-gray-700">{title}</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <ProjectTask 
            key={task.id} 
            task={task}
            onUpdate={onTaskUpdate}
          />
        ))}
      </div>
    </div>
  );
}
