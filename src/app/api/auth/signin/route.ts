import client from "@/mysql/connect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password }: { username: string; password: string } = body;
  console.log(body);
  if (!username || !password) {
    return NextResponse.json({
      status: 400,
      message: "Username and password are required",
    });
  }

  try {
    const query = `SELECT * FROM users WHERE username = ?`;
    const values = [username];

    const results = await new Promise<any[]>((resolve, reject) => {
      client.query(query, values, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });

    if (results.length === 0) {
      return NextResponse.json({
        status: 404,
        body: {
          message: "User not found",
        },
      });
    }

    const user = results[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({
        status: 401,
        message: "Incorrect username or password",
      });
    } else {
      req.cookies.set("user", user.username);
      
      return NextResponse.json({
        status: 200,
        message: "Logged In",
        user: user.username,
        type: user.type,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: {
        message: "Internal Server Error",
      },
    });
  }
}
