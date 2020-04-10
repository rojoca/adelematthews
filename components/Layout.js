import React from "react";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div class="container">
      <div class="flex flex-row align-center justify-between">
        <div>
          <img src="/public/logo.png" />
          Adele Matthews
        </div>
        <nav class="flex flex-row align-center justify-end">
          <Link href="/">
            <a>Work</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </nav>
      </div>
      {children}

      <div class="w-full">Adele Matthews · Wellington, New Zealand</div>
    </div>
  );
}
