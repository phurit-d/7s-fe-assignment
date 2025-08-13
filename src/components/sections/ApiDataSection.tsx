import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';

export const ApiDataSection = () => {
  return (
    <section>
      <div className="mb-8">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          2. API Data Transformation
        </h2>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* API Implementation */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-xl font-bold text-gray-800">
            🚀 API Implementation
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                GET /api/users
              </code>
              <p className="mt-1 text-gray-600">
                Fetches and transforms user data from DummyJSON
              </p>
            </div>
            <div>
              <span className="font-semibold">Source:</span>
              <code className="ml-2 rounded bg-gray-100 px-2 py-1 text-xs">
                <Link
                  href="https://dummyjson.com/docs/users"
                  target="_blank"
                  className="transition-colors hover:text-blue-600"
                >
                  https://dummyjson.com/users
                </Link>
              </code>
            </div>
            <div>
              <span className="font-semibold">Parameters:</span>
              <ul className="ml-2 list-inside list-disc text-gray-600">
                <li>
                  <code>limit</code> - Number of users to fetch
                </li>
                <li>
                  <code>skip</code> - Number of users to skip
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sample Output */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-xl font-bold text-gray-800">
            📊 Sample Output
          </h3>
          <div className="overflow-x-auto rounded bg-gray-900 p-3 text-xs text-green-400">
            <pre>{`{
  "Engineering": {
    "male": 15,
    "female": 8,
    "ageRange": "22-45",
    "hair": {
      "Brown": 12,
      "Blond": 6,
      "Black": 5
    },
    "addressUser": {
      "JohnDoe": "12345",
      "JaneSmith": "67890"
    }
  }
}`}</pre>
          </div>
        </div>
      </div>

      {/* Interactive Demo Link */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-bold text-gray-800">
          🎮 Interactive Demo
        </h3>
        <p className="mb-4 text-gray-600">
          Experience the full API data transformation with real data from
          DummyJSON API. The demo includes live data fetching and comprehensive
          UI.
        </p>
        <Link
          href="/api-demo"
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          <span>Launch API Demo</span>
          <LuArrowRight />
        </Link>
      </div>

      {/* Technical Details */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h4 className="mb-3 font-bold text-gray-800">🎯 Performance</h4>
          <ul className="list-disc space-y-2 pl-6 text-sm text-gray-600">
            <li>Single-pass O(n) algorithm</li>
            <li>Map-based aggregation</li>
            <li>Memory efficient processing</li>
            <li>Response caching</li>
          </ul>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h4 className="mb-3 font-bold text-gray-800">🔧 TypeScript</h4>
          <ul className="list-disc space-y-2 pl-6 text-sm text-gray-600">
            <li>Strong type definitions</li>
            <li>Interface segregation</li>
            <li>Generic utility types</li>
            <li>Runtime type safety</li>
          </ul>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h4 className="mb-3 font-bold text-gray-800">🧪 Testing</h4>
          <ul className="list-disc space-y-2 pl-6 text-sm text-gray-600">
            <li>Unit tests for transformations</li>
            <li>Edge case handling</li>
            <li>Performance benchmarks</li>
            <li>Mock data scenarios</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
