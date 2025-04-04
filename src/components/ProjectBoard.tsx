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
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { ProjectColumn } from "./ProjectColumn";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import { useDndConfig } from "./DndConfig";
import { COLUMNS } from "@/types/project";
import { Task } from "@/types/project";

export function ProjectBoard() {
  const {
    tasks,
    activeId,
    activeColumn,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    setTasks
  } = useProjectTasks();
  
  const sensors = useDndConfig();

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Доска проектов</h2>
      <DndContext 
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLUMNS.map((column) => {
            const columnTasks = tasks.filter((task) => task.status === column.id);
            return (
              <SortableContext key={column.id} items={columnTasks}>
                <ProjectColumn
                  title={column.title}
                  status={column.id}
                  tasks={columnTasks}
                  isActive={activeColumn === column.id}
                  isDraggingOver={activeId !== null}
                  onTaskUpdate={handleTaskUpdate}
                />
              </SortableContext>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}
