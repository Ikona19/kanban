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
import { TaskCounter } from "./TaskCounter";

interface ColumnHeaderProps {
  title: string;
  taskCount: number;
}

export function ColumnHeader({ title, taskCount }: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-medium">{title}</h3>
      <TaskCounter count={taskCount} />
    </div>
  );
}
