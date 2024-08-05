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
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function SignInPage() {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });
  const [cookies, setCookie] = useCookies(["user", "type"]);

  const router = useRouter();

  async function handleSubmit() {
    try {
      const res = await axios.post("/api/auth/signin", form);
      if (res.data.message === "Logged In") {
        toast.success("Logged In");
        setCookie("user", res.data.user);
        setCookie("type", res.data.type);
        
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }

      if (
        res.data.message === "Incorrect username or password" ||
        res.data.message === "Username and password are required"
      ) {
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
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Log in to your account</CardDescription>
        </CardHeader>
        <CardContent className="">
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
          <Button onClick={handleSubmit}>Sign In</Button>
          <Link href="sign-up">
            <Button variant={"link"}>Don't have an account?</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
