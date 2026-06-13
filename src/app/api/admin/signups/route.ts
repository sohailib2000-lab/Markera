import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHash } from "crypto";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session")?.value;
    const adminPassword = process.env.ADMIN_PASSWORD || "Gngbsnss828638!!!";

    // Recompute the expected session token to verify authenticity
    const expectedToken = createHash("sha256")
      .update(adminPassword + "markera-session-salt-2026")
      .digest("hex");

    if (!adminSession || adminSession !== expectedToken) {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in." },
        { status: 401 }
      );
    }

    // Fetch all sign-ups from Supabase sorted by newest first
    const { data: signups, error } = await supabase
      .from("signups")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json(
        { error: `Failed to fetch data from database: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, signups });
  } catch (err: any) {
    console.error("Signups fetch error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while retrieving signups." },
      { status: 500 }
    );
  }
}
