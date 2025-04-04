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
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, Users, Settings, ClipboardList } from "lucide-react";

const MainNav = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Дашборд", icon: LayoutDashboard },
    { path: "/projects", label: "Проекты", icon: ClipboardList },
    { path: "/calendar", label: "Календарь", icon: Calendar },
    { path: "/team", label: "Команда", icon: Users },
    { path: "/settings", label: "Настройки", icon: Settings },
  ];

  return (
    <nav className="border-b bg-purple-50/80 backdrop-blur-md fixed w-full z-50 top-0 shadow-sm">
      <div className="container mx-auto px-6">
        <NavigationMenu>
          <NavigationMenuList className="space-x-2">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-purple-100 hover:text-purple-900 focus:bg-purple-100 focus:text-purple-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-purple-100/50 data-[state=open]:bg-purple-100/50",
                    location.pathname === item.path && "bg-purple-100 text-purple-900"
                  )}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default MainNav;