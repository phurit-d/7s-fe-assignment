import type { DepartmentData } from '@/types/user';
import { useState } from 'react';

interface DepartmentCardProps {
  department: string;
  data: DepartmentData;
}

export const DepartmentCard = ({ department, data }: DepartmentCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const totalUsers = data.male + data.female;
  const malePercentage =
    totalUsers > 0 ? Math.round((data.male / totalUsers) * 100) : 0;
  const femalePercentage =
    totalUsers > 0 ? Math.round((data.female / totalUsers) * 100) : 0;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div
        className="cursor-pointer p-6 transition-colors hover:bg-gray-50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{department}</h3>
            <p className="text-gray-600">
              {totalUsers} users • Age range: {data.ageRange} •
              {Object.keys(data.hair).length} hair colors
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Gender Split</div>
              <div className="text-sm">
                <span className="text-blue-600">♂ {data.male}</span> /
                <span className="text-pink-600">♀ {data.female}</span>
              </div>
            </div>
            <div className="transform transition-transform">
              {expanded ? '▼' : '▶'}
            </div>
          </div>
        </div>

        {/* Gender bar */}
        <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="bg-blue-500"
            style={{ width: `${malePercentage}%` }}
          ></div>
          <div
            className="bg-pink-500"
            style={{ width: `${femalePercentage}%` }}
          ></div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Hair Colors */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-800">
                🎨 Hair Colors
              </h4>
              <div className="space-y-2">
                {Object.entries(data.hair).map(([color, count]) => (
                  <div
                    key={color}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-700 capitalize">{color}</span>
                    <span className="rounded bg-gray-200 px-2 py-1 text-sm">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Users */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-800">
                📍 User Addresses
              </h4>
              <div className="max-h-48 space-y-1 overflow-y-auto">
                {Object.entries(data.addressUser).map(([name, postalCode]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="truncate text-gray-700">{name}</span>
                    <span className="ml-2 text-gray-500">{postalCode}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
