import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get("file");

  if (!file || !fs.existsSync(file)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const buffer = fs.readFileSync(file);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": 'attachment; filename="subtitled.mp4"',
    },
  });
}