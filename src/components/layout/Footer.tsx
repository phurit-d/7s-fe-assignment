import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center text-gray-600">
          <p>Frontend Assignment for 7Solutions</p>
          <p className="mt-2 text-sm">
            Made with ♥️ by{' '}
            <Link
              href="https://phurit.de"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              phurit.de
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
