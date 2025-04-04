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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Users, Calendar, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Управление проектами",
    description: "Создавайте проекты, управляйте задачами и отслеживайте прогресс",
    icon: LayoutDashboard,
    link: "/projects"
  },
  {
    title: "Командная работа",
    description: "Эффективно взаимодействуйте с членами команды",
    icon: Users,
    link: "/team"
  },
  {
    title: "Календарное планирование",
    description: "Планируйте задачи и встречи в удобном календаре",
    icon: Calendar,
    link: "/calendar"
  },
  {
    title: "Гибкая настройка",
    description: "Настройте систему под свои потребности",
    icon: Settings,
    link: "/settings"
  }
];

const Home = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Task Manager</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {features.map((feature) => (
          <Card key={feature.title} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>{feature.description}</CardDescription>
              <Button asChild variant="ghost" className="group-hover:translate-x-1 transition-transform">
                <Link to={feature.link}>
                  Подробнее <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;