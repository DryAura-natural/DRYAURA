import { NextResponse } from "next/server";
import getCurrentUser from "@/app/api/currentUser";

export type User = {
  id: string;
  fullName: string;
  email: string;
} | null;

export async function GET() {
  const user = await getCurrentUser(); // Ensure this function returns a proper User object
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}
