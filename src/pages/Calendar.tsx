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
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { addDays, format } from "date-fns";
import { ru } from "date-fns/locale";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const upcomingTasks = [
    {
      id: 1,
      title: "Встреча с командой",
      date: addDays(new Date(), 1),
      type: "meeting"
    },
    {
      id: 2,
      title: "Дедлайн проекта",
      date: addDays(new Date(), 3),
      type: "deadline"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Календарь</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 col-span-2">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={ru}
            className="rounded-md border"
          />
        </Card>
        
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Предстоящие события</h2>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600">
                  {format(task.date, "d MMMM", { locale: ru })}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;