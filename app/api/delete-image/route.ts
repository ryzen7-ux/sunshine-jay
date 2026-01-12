//@ts-nocheck
import sql from "@/app/lib/db";
import { Storage } from "@google-cloud/storage";

import { type NextRequest, NextResponse } from "next/server";

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64!, "base64").toString()
);
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials,
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: { url: string } }
) {
  try {
    const body = await request.json();
    const imgUrl1 = String(body?.imageUrl).split(
      `${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}/`
    );
    const itemId = body?.itemId;
    const type = body?.type;
    const userType = body?.userType;

    const bucketName: any = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;

    await storage.bucket(bucketName).file(imgUrl1[1]).delete();

    if (userType === "member") {
      if (type === "passport") {
        await sql`UPDATE members SET passport=${null} WHERE id=${itemId}`;
      }

      if (type === "front") {
        await sql`UPDATE members SET id_front=${null} WHERE id=${itemId}`;
      }

      if (type === "back") {
        await sql`UPDATE members SET id_back=${null} WHERE id=${itemId}`;
      }

      if (type === "form") {
        await sql`UPDATE members SET doc=${null} WHERE id=${itemId}`;
      }
    } else {
      if (type === "passport") {
        await sql`UPDATE individuals SET passport=${null} WHERE id=${itemId}`;
      }

      if (type === "front") {
        await sql`UPDATE individuals SET id_front=${null} WHERE id=${itemId}`;
      }

      if (type === "back") {
        await sql`UPDATE individuals SET id_back=${null} WHERE id=${itemId}`;
      }

      if (type === "form") {
        await sql`UPDATE individuals SET doc=${null} WHERE id=${itemId}`;
      }
    }

    NextResponse.json({ message: `deleted.` });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
