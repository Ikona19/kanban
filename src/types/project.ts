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
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "todo" | "in-progress" | "review" | "done";
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
}

export const COLUMN_IDS = ["todo", "in-progress", "review", "done"] as const;
export type ColumnId = typeof COLUMN_IDS[number];

export interface Column {
  id: ColumnId;
  title: string;
}

export const COLUMNS: Column[] = [
  { id: "todo", title: "К выполнению" },
  { id: "in-progress", title: "В процессе" },
  { id: "review", title: "На проверке" },
  { id: "done", title: "Завершено" }
];
