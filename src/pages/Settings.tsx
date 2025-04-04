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
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Настройки</h1>
        <SettingsIcon className="w-8 h-8 text-purple-500" />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">Настройки находятся в разработке...</p>
      </div>
    </div>
  );
};

export default Settings;