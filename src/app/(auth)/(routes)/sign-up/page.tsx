"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

export default function SignUpPage() {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  async function handleSubmit() {
    try {
      const res = await axios.post("/api/auth/signup", form);
      if (res.data.message === "User created successfully") {
        toast.success("User created successfully", {
          action: {
            label: "Okay",
            onClick: () => toast.dismiss(),
          },
        });
      }
      
      if (res.data.status !== 200) {
        toast.error(res.data.message, {
          action: {
            label: "Okay",
            onClick: () => toast.dismiss(),
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e: any) {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  }

  return (
    <div className="relative flex justify-center items-center h-screen z-20">
      <Card className="w-[350px] bg-background/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your database user account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="John"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="****"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSubmit}>Sign Up</Button>
          <Link href="sign-in">
            <Button variant={"link"}>Already have an account?</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
