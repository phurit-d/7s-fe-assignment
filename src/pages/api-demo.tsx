import { DepartmentCard, Loading } from '@/components/ui';
import { useDebounce, useUserData } from '@/hooks';
import { formatJSON, getDataSummary } from '@/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function ApiDemoPage() {
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);

  const debouncedSkip = useDebounce(skip, 500);

  const { data, loading, error, refetch } = useUserData({
    limit,
    skip: debouncedSkip,
  });

  const summary = data ? getDataSummary(data) : null;

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

  const handleSkipChange = (newSkip: number) => {
    setSkip(newSkip);
  };

  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loading />
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-md">
          <div className="mb-4 text-5xl text-red-500">⚠️</div>
          <h2 className="mb-2 text-xl font-bold text-red-600">Error</h2>
          <p className="mb-4 text-gray-600">{error}</p>
          <button
            onClick={refetch}
            className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-block rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            User Data API Transformation
          </h1>
          <p className="mb-4 text-gray-600">
            Data fetched from{' '}
            <code className="rounded bg-gray-100 px-2 py-1">
              https://dummyjson.com/users
            </code>{' '}
            and transformed by department
          </p>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Limit:
              </label>
              <select
                value={limit}
                onChange={(e) => handleLimitChange(Number(e.target.value))}
                className="rounded border border-gray-300 px-3 py-1 text-sm"
              >
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Skip:</label>
              <input
                type="number"
                value={skip}
                onChange={(e) => handleSkipChange(Number(e.target.value))}
                min="0"
                className="w-20 rounded border border-gray-300 px-3 py-1 text-sm"
              />
            </div>

            <button
              onClick={refetch}
              className="rounded bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        {summary && (
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              📊 Summary Statistics
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {summary.totalDepartments}
                </div>
                <div className="text-sm text-gray-600">Departments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {summary.totalUsers}
                </div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {summary.totalMales}
                </div>
                <div className="text-sm text-gray-600">Males</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-500">
                  {summary.totalFemales}
                </div>
                <div className="text-sm text-gray-600">Females</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {summary.uniqueHairColors}
                </div>
                <div className="text-sm text-gray-600">Hair Colors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {summary.departments.length}
                </div>
                <div className="text-sm text-gray-600">Unique Depts</div>
              </div>
            </div>
          </div>
        )}

        {/* Department Data */}
        {data && (
          <div className="space-y-6">
            {Object.entries(data).map(([department, deptData]) => (
              <DepartmentCard
                key={department}
                department={department}
                data={deptData}
              />
            ))}
          </div>
        )}

        {/* Raw JSON Output */}
        {data && (
          <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              📄 Raw JSON Output
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-green-400">
              <pre className="text-sm">{formatJSON(data)}</pre>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={handleGoTop}
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
            aria-label="Go to top"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
