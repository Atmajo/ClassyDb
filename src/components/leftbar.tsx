"use client";

import Link from "next/link";
import React from "react";
import Profile from "./profile";
import leftbardata from "@/constants/leftbardata";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const LeftBar = () => {
  const active = usePathname();

  return (
    <aside className="md:flex w-[300px] border-r h-screen hidden text-black bg-gray-300">
      <div className="flex flex-1 flex-col space-y-10 py-5 pl-2">
        <div className="flex justify-center items-center mx-10">
          <Link href="/home">
            <h2 className="font-bold text-3xl">Classy DBMS</h2>
          </Link>
        </div>
        <nav>
          <ul className="space-y-4">
            {leftbardata.map((item, index) => (
              <li
                key={index}
                className={cn("py-4 px-5 cursor-pointer hover:bg-gray-200", active === item.href && "border-l-8 border-black bg-gradient-to-r from-gray-100 to-black/20")}
              >
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-1 flex-col justify-end pr-2">
          <Profile />
        </div>
      </div>
    </aside>
  );
};

export default LeftBar;
