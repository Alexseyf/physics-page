'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginPage() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form action={dispatch} className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Admin Login</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded border border-gray-300 p-2 text-black"
            id="email"
            type="email"
            name="email"
            placeholder="admin@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className="w-full rounded border border-gray-300 p-2 text-black"
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
          />
        </div>

        <button
          className="w-full rounded bg-blue-600 py-2 font-bold text-white hover:bg-blue-700"
          type="submit"
        >
          Log in
        </button>

        {errorMessage && (
          <div className="mt-4 text-sm text-red-500">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}
