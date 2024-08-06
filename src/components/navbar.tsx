"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";

const Navbar = () => {
  const active = usePathname().split("/")[1];

  return (
    <nav className="px-4 py-5 bg-gray-800">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold capitalize">{active}</h1>
        <div>
          <Input placeholder="Search" className="text-black px-2 w-72" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
