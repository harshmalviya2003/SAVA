'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="text-center">
        <div className="animate-fade-in">
          <h1 className="text-6xl font-bold mb-4">Oops!</h1>
          <h2 className="text-2xl mb-6">Something went wrong</h2>
          <p className="text-gray-400 mb-8">
            We apologize for the inconvenience. Please try again.
          </p>
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
} 