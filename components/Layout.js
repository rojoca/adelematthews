import React from "react";
import Link from "next/link";
import { Machine } from "xstate";
import { useMachine } from "@xstate/react";
import MenuIcon from "./MenuIcon";
import { motion } from "framer-motion";

const MenuMachine = Machine({
  id: "menu",
  initial: "closed",
  states: {
    closed: {
      on: { TOGGLE: "open" },
    },
    open: {
      on: { TOGGLE: "closed" },
    },
  },
});

function NavItems() {
  return (
    <>
      <Link href="/">
        <a className="text-gray-600 hover:text-gray-900">Work</a>
      </Link>
      <Link href="/about">
        <a className="text-gray-600 hover:text-gray-900 ml-8">About</a>
      </Link>
      <Link href="/enquiries">
        <a className="text-gray-600 hover:text-gray-900 ml-8">Enquiries</a>
      </Link>
    </>
  );
}

export default function Layout({ children }) {
  const [current, send] = useMachine(MenuMachine);
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <div className="font-body container mx-auto p-8">
      <div className="flex flex-row items-center justify-between mb-16">
        <Link href="/">
          <a>
            <img src="/logo.png" className="h-4" />
          </a>
        </Link>
        <nav className="hidden sm:block flex flex-row items-center justify-end uppercase text-sm">
          <NavItems />
        </nav>
        <motion.nav className="sm:hidden fixed" initial={false} animate={current.state}>
          <button
            type="button"
            className="border-none bg-transparent sm:hidden w-4"
            onClick={() => send("TOGGLE")}
          >
            <MenuIcon />
          </button>
        </motion.nav>
      </div>
      <div className="min-h-80 mb-8">{children}</div>
      <div className="w-full text-gray-600 text-sm">
        &copy; Adele Matthews · Wellington, New Zealand
      </div>
    </div>
  );
}
