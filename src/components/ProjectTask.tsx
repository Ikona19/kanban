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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Paperclip } from "lucide-react";
import { Task } from "@/types/project";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ProjectTaskProps {
  task: Task;
  onUpdate?: (updatedTask: Task) => void;
}

export function ProjectTask({ task, onUpdate }: ProjectTaskProps) {
  const [isUploading, setIsUploading] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      status: task.status
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверка размера файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Файл слишком большой. Максимальный размер: 5MB");
      return;
    }

    setIsUploading(true);
    
    try {
      // В реальном приложении здесь был бы код для загрузки файла на сервер
      // Сейчас мы просто симулируем загрузку
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const attachment = {
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
        size: file.size
      };

      const updatedTask = {
        ...task,
        attachments: [...(task.attachments || []), attachment]
      };

      // Обновляем состояние через родительский компонент
      if (onUpdate) {
        onUpdate(updatedTask);
      }

      toast.success("Файл успешно прикреплен");
    } catch (error) {
      toast.error("Ошибка при загрузке файла");
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200",
        isDragging && "scale-105 shadow-lg opacity-90 rotate-2",
        !isDragging && "hover:scale-[1.02]"
      )}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
        
        {/* Секция вложений */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <label 
              htmlFor={`file-upload-${task.id}`}
              className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 cursor-pointer"
            >
              <Paperclip className="h-3 w-3" />
              Прикрепить файл
            </label>
            <Input
              id={`file-upload-${task.id}`}
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </div>
          
          {task.attachments && task.attachments.length > 0 && (
            <div className="space-y-1">
              {task.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-1.5 rounded-md text-xs"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Paperclip className="h-3 w-3 text-gray-500" />
                    <span className="truncate">{file.name}</span>
                    <span className="text-gray-400">({formatFileSize(file.size)})</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
