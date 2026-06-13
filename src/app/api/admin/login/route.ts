import { NextResponse } from "next/server";
import { createHash } from "crypto";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "Gngbsnss828638!!!";

    if (password === adminPassword) {
      // Create a stateless session token based on password hash
      const sessionToken = createHash("sha256")
        .update(adminPassword + "markera-session-salt-2026")
        .digest("hex");

      const response = NextResponse.json({ success: true });
      
      // Set httpOnly cookie for security (inaccessible to client JS)
      response.cookies.set("admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Incorrect password. Access denied." },
      { status: 401 }
    );
  } catch (err: any) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}
