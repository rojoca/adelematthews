import React, { useState, useEffect } from "react";
import Link from "next/link";
import MenuIcon from "./MenuIcon";
import { motion, AnimatePresence } from "framer-motion";

function NavItems() {
  return (
    <>
      <Link href="/">
        <a className="text-gray-600 hover:text-gray-900">Work</a>
      </Link>
      <Link href="/about">
        <a className="text-gray-600 hover:text-gray-900">About</a>
      </Link>
      <Link href="/enquiries">
        <a className="text-gray-600 hover:text-gray-900">Enquiries</a>
      </Link>
    </>
  );
}

export default function Layout({ children }) {
  const [state, setState] = useState("closed");
  const variants = {
    open: { x: 0, opacity: 1, transition: { duration: 3 } },
    closed: { x: "-100%", opacity: 0 },
  };

  useEffect(() => {
    setState("closed");
  }, [children]);

  return (
    <>
      <div className="font-body container mx-auto p-8">
        <div className="flex flex-row items-center justify-between mb-16">
          <Link href="/">
            <a>
              <img src="/logo.png" className="h-4" />
            </a>
          </Link>
          <nav className="hidden sm:block flex flex-row items-center justify-end uppercase text-sm space-x-4">
            <NavItems />
          </nav>
          <button
            type="button"
            className="border-none bg-transparent sm:hidden w-4"
            onClick={() => setState("open")}
          >
            <MenuIcon />
          </button>
        </div>
        <div className="min-h-80 mb-8">{children}</div>
        <div className="w-full text-gray-600 text-sm">
          &copy; Adele Matthews · Wellington, New Zealand
        </div>
      </div>
      <AnimatePresence>
        {state === "open" && (
          <motion.nav className="font-body" key="menu">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              key="backdrop"
              className="fixed inset-0 opacity-25 bg-gray-900 h-full z-10"
              onClick={() => setState("closed")}
            >
              &nbsp;
            </motion.div>
            <motion.div
              initial={{ x: "200%" }}
              animate={{ x: 0, transition: { type: "spring", damping: 1000 } }}
              exit={{ x: "200%" }}
              key="nav-items"
              className="w-1/3 bg-white h-full fixed inset-y-0 right-0 p-8 flex flex-col items-end text-right opacity-100 space-y-4 z-20"
            >
              <button
                onClick={() => setState("closed")}
                className="text-right pr-0 mr-0 w-4 p-2 -mt-2 text-gray-500"
              >
                <svg fill="currentColor" viewBox="0 0 20 20" class="w-4 h-4">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <NavItems />
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
