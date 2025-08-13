import { Footer } from '@/components/layout/Footer';
import { ApiDataSection, TodoListSection } from '@/components/sections';
import { toClassNames } from '@/utils/styles';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'todo' | 'api'>('todo');

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header with Navigation */}
      <div className="sticky top-0 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="items-center justify-between space-y-4 py-4 md:flex md:space-y-0">
            <div>
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                7Solutions Frontend Assignment
              </h1>
              <p className="text-sm text-gray-600">
                Next.js + TypeScript + Tailwind
              </p>
            </div>
            <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab('todo')}
                className={toClassNames(
                  'w-full rounded-md px-4 py-2 text-sm font-medium transition-colors md:w-fit',
                  activeTab === 'todo'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900',
                )}
              >
                1. Auto Delete Todo List
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={toClassNames(
                  'w-full rounded-md px-4 py-2 text-sm font-medium transition-colors md:w-fit',
                  activeTab === 'api'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900',
                )}
              >
                2. API Data Transform
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'todo' ? <TodoListSection /> : <ApiDataSection />}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
