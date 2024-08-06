"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, View } from "lucide-react";
import Link from "next/link";
import { useCookies } from "react-cookie";

export default function Home() {
  const [cookies] = useCookies(["user"]);

  return (
    <div className="flex justify-between px-4 py-5 text-black">
      <div className="flex gap-10">
        <Card className="w-80 h-32 bg-black/10 shadow-md">
          <CardTitle className="px-2 py-3">
            <h1 className="text-2xl font-bold">Total Databases</h1>
          </CardTitle>
          <CardContent className="flex justify-between items-center py-5">
            <h1 className="text-2xl">6</h1>
            <Link href={"/databases"}>
              <Button>
                <ArrowDownLeft size={24} className=" rotate-180" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="w-80 h-32 bg-black/10 shadow-md">
          <CardTitle className="px-2 py-3">
            <h1 className="text-2xl font-bold">Total Tables</h1>
          </CardTitle>
          <CardContent className="flex justify-between items-center py-5">
            <h1 className="text-2xl">6</h1>
            <Link href={"/tables"}>
              <Button>
                <ArrowDownLeft size={24} className=" rotate-180" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-10">
        <Card className="w-80 bg-black/10 shadow-md">
          <CardTitle className="px-2 py-3">
            <h1 className="text-2xl font-bold">General Settings</h1>
          </CardTitle>
          <CardContent>
            <Link href={""}>
              <Button variant={"link"}>Change Password</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="w-80 bg-black/10 shadow-md">
          <CardTitle className="px-2 py-3">
            <h1 className="text-2xl font-bold">Database System</h1>
          </CardTitle>
          <CardContent>
            <li>Server: localhost</li>
            <li>Server Type: MySQL</li>
            <li>Port: 3307</li>
            <li>User: {cookies.user}@localhost</li>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
