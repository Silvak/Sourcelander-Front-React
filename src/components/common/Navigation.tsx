"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="absolute top-0 left-0 right-0 bg-white h-[72px] border-b border-gray-200 z-100">
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Sourcelander
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Inicio
            </Link>
            <Link
              href="/auth/login"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contacto
            </Link>
            <Link
              href="/freelancer"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Freelancer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
