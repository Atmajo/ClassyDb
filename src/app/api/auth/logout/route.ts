import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  req.cookies?.delete("user");

  return NextResponse.json({
    status: 200,
    message: "Logged out",
  });
}
