"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { LogOut, User2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { NextRequest } from "next/server";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const Profile = () => {
  const router = useRouter();

  const [cookies] = useCookies(["user", "type"]);
  const [user, setUser] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    setUser(cookies.user || "User");
    setType(cookies.type || "User");
  }, [cookies]);
  
  const handleLogout = async () => {
    await axios.post("/api/auth/logout").catch((err) => console.error(err));

    router.push("/sign-in");
  };

  return (
    <div className="flex justify-start items-center bg-white rounded-lg py-2 px-4 space-x-5 shadow-md">
      <Avatar className="flex justify-center items-center">
        <User2Icon />
      </Avatar>
      <div>
        <h1 className="font-semibold capitalize">{user}</h1>
        <p className="capitalize">{type}</p>
      </div>
      <div className="flex flex-1 items-end justify-end">
        <Button onClick={handleLogout}>
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default Profile;
