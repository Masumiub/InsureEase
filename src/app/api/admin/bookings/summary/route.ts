import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { authOptions } from "@/app/lib/auth";
import clientPromise from "@/app/lib/mongodb";


export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const client = await clientPromise;
  const db = client.db("InsureEaseDB");

  const bookings = await db.collection("bookings").find({}).toArray();

  const total = bookings.length;
  const statusCounts: Record<string, number> = {};
  const typeCounts: Record<string, number> = {};

  for (const booking of bookings) {
    if (booking.status) {
      statusCounts[booking.status] = (statusCounts[booking.status] || 0) + 1;
    }
    if (booking.planType) {
      typeCounts[booking.planType] = (typeCounts[booking.planType] || 0) + 1;
    }
  }

  return NextResponse.json({ total, statusCounts, typeCounts });
}

