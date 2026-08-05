import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "scanpro-website",
    timestamp: new Date().toISOString(),
  });
}
