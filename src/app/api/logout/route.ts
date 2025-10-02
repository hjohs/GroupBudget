import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  console.log("WE HERE IN LOGOUT ROUTE");
  const cookieStore = await cookies();
  cookieStore.set("session", "", { maxAge: 0 });

  return NextResponse.json({ success: true });
}