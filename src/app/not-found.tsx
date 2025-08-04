"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-75px)] flex items-center justify-center p-4 ">
      <div className="text-center max-w-2xl mx-auto border p-4 lg:p-12 bg-white">
        {/* Icono de error */}
        <div className="">
          <div className="w-22 h-22 mx-auto bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-16 h-16 text-black/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
          404
        </h1>

        {/* Subtítulo */}
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          Oops! Page not found
        </h2>

        {/* Descripción */}
        <p className="text-base text-gray-600 mb-6 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          <br />
          Use the buttons below to navigate.
        </p>

        {/* Botón principal */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3 rounded-md hover:from-primary/90 hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium text-sm cursor-pointer inline-block"
          >
            Go to homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="bg-white text-gray-700 px-6 py-3 rounded-md border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 font-medium text-sm cursor-pointer"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
