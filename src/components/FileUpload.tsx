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
import { Input } from "./ui/input";
import { Paperclip } from "lucide-react";
import { toast } from "sonner";
import { Task } from "./TaskBoard";

interface FileUploadProps {
  attachments: Task["attachments"];
  onAttachmentsChange: (attachments: Task["attachments"]) => void;
}

export function FileUpload({ attachments = [], onAttachmentsChange }: FileUploadProps) {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Файл слишком большой. Максимальный размер: 5MB");
      return;
    }

    const attachment = {
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      size: file.size
    };

    onAttachmentsChange([...(attachments || []), attachment]);
    toast.success("Файл прикреплен");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Прикрепить файл</label>
      <div>
        <label 
          htmlFor="file-upload"
          className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 cursor-pointer"
        >
          <Paperclip className="h-4 w-4" />
          Выбрать файл
        </label>
        <Input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
      {attachments && attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-md text-sm"
            >
              <div className="flex items-center gap-2 truncate">
                <Paperclip className="h-4 w-4 text-gray-500" />
                <span className="truncate">{file.name}</span>
                <span className="text-gray-400">({formatFileSize(file.size)})</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
