import React from "react";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="font-body container mx-auto p-8">
      <div className="flex flex-row items-center justify-between mb-16">
        <img src="/logo.png" className="h-4 sm:h-6 md:h-8" />
        <nav className="hidden sm:block flex flex-row items-center justify-end uppercase text-sm">
          <Link href="/">
            <a className="text-gray-600 hover:text-gray-900">Work</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-600 hover:text-gray-900 ml-8">About</a>
          </Link>
          <Link href="/contact">
            <a className="text-gray-600 hover:text-gray-900 ml-8">Contact</a>
          </Link>
        </nav>
      </div>
      <div className="min-h-80 mb-8">{children}</div>
      <div className="w-full text-gray-600 text-sm">
        Adele Matthews · Wellington, New Zealand
      </div>
    </div>
  );
}
