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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Calendar, CheckCircle2, Clock, Trash, Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ProjectStatus = "В процессе" | "Завершен";

interface Project {
  id: number;
  title: string;
  description: string;
  tasks: number;
  dueDate: string;
  status: ProjectStatus;
}

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Разработка веб-сайта",
      description: "Создание современного веб-сайта для колледжа",
      tasks: 5,
      dueDate: "2024-05-01",
      status: "В процессе"
    },
    {
      id: 2,
      title: "Мобильное приложение",
      description: "Разработка мобильного приложения для студентов",
      tasks: 3,
      dueDate: "2024-06-15",
      status: "Завершен"
    }
  ]);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<Omit<Project, "id">>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      tasks: 0,
      status: "В процессе"
    }
  });

  const handleCreateProject = (data: Omit<Project, "id">) => {
    const newProject = {
      ...data,
      id: projects.length + 1,
      tasks: Number(data.tasks)
    };
    setProjects([...projects, newProject]);
    form.reset();
    setIsDialogOpen(false);
    toast({
      title: "Проект создан",
      description: "Новый проект успешно добавлен"
    });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      description: project.description,
      dueDate: project.dueDate,
      tasks: project.tasks,
      status: project.status
    });
    setIsDialogOpen(true);
  };

  const handleUpdateProject = (data: Omit<Project, "id">) => {
    if (!editingProject) return;
    
    const updatedProjects = projects.map(p => 
      p.id === editingProject.id ? { ...data, id: editingProject.id, tasks: Number(data.tasks) } : p
    );
    setProjects(updatedProjects);
    setEditingProject(null);
    form.reset();
    setIsDialogOpen(false);
    toast({
      title: "Проект обновлен",
      description: "Изменения успешно сохранены"
    });
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({
      title: "Проект удален",
      description: "Проект успешно удален"
    });
  };

  const handleNewProject = () => {
    setEditingProject(null);
    form.reset({
      title: "",
      description: "",
      dueDate: "",
      tasks: 0,
      status: "В процессе"
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Мои проекты</h1>
            <p className="text-gray-600 mt-1">Управляйте своими проектами</p>
          </div>
          <Button onClick={handleNewProject} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
            <PlusCircle className="h-5 w-5" />
            Новый проект
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProject ? "Редактировать проект" : "Создать новый проект"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(editingProject ? handleUpdateProject : handleCreateProject)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tasks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Количество задач</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Дедлайн</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Статус</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="В процессе">В процессе</option>
                          <option value="Завершен">Завершен</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {editingProject ? "Сохранить изменения" : "Создать проект"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer border-gray-200"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-gray-900 flex justify-between items-start">
                  {project.title}
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProject(project);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project.id);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-gray-600">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    <span>{project.tasks} задач</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Дедлайн: {new Date(project.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className={project.status === "Завершен" ? "text-green-600" : "text-blue-600"}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;