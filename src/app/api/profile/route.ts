import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newProfile = await db.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(newProfile);
  } catch (error) {
    console.log("[PROFILE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
