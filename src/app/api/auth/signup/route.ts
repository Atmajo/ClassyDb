import client from "@/mysql/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

client.connect();

interface Insert {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password }: { username: string; password: string } = body;
  if (!username || !password) {
    return NextResponse.json({
      status: 400,
      message: "Username and password are required",
    });
  }

  try {
    const query = "SHOW TABLES LIKE 'users'";
    const connection = await new Promise<any[]>((resolve, reject) => {
      client.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
    const tableExists = connection.length > 0;

    if (tableExists) {
      // Table exists, continue with your logic
      let query = "SELECT * FROM users WHERE username = ?";
      const res: any = await new Promise<any>((resolve, reject) => {
        client.query(query, [username], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results[0]);
        });
      });

      if (res) {
        return NextResponse.json({
          status: 400,
          message: "User already exists",
        });
      }
      
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(password, salt);

      query = "INSERT INTO users (username, password) VALUES (?, ?)";
      const values = [username, hashed];
      const result: Insert = await new Promise<Insert>((resolve, reject) => {
        client.query(query, values, (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });

      if (result.affectedRows > 0) {
        return NextResponse.json({
          status: 200,
          message: "User created successfully",
        });
      }
    } else {
      // Table does not exist, handle the error or return an appropriate response
      let query =
        "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), type VARCHAR(10), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
      
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(password, salt);

      const res: any = await new Promise<any>((resolve, reject) => {
        client.query(query, (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });

      query = "INSERT INTO users (username, password) VALUES (?, ?)";
      const values = [username, hashed];
      const result: Insert = await new Promise<Insert>((resolve, reject) => {
        client.query(query, values, (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });

      if (result.affectedRows > 0) {
        return NextResponse.json({
          status: 200,
          message: "User created successfully",
        });
      }

      return NextResponse.json({
        status: 500,
        message: "User could not be created",
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
