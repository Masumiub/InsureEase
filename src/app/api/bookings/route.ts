// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "../../lib/mongodb";
import { z } from "zod";
import { authOptions } from "@/app/lib/auth";
//import { ObjectId } from "mongodb";

const bookingSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  age: z.number().int().min(18),
  income: z.number().min(0),
  carType: z.string().optional(),
  tripDate: z.string().optional(),
  notes: z.string().optional(),
  planId: z.string(),
  planTitle: z.string().optional(),
  planType: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.format() }, { status: 400 });
    }

    const booking = {
      ...parsed.data,
      userEmail: session.user.email,
      createdAt: new Date(),
      status: "pending",
    };

    const client = await clientPromise;
    const db = client.db("InsureEaseDB");
    const result = await db.collection("bookings").insertOne(booking);

    return NextResponse.json({ success: true, id: result.insertedId.toString() });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}



export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("user");

  const client = await clientPromise;
  const db = client.db("InsureEaseDB");
  const collection = db.collection("bookings");

  let query = {};
  if (session.user.role !== "admin") {
    query = { userEmail: userEmail ?? session.user.email };
  }

  const bookings = await collection.find(query).toArray();

  return NextResponse.json({ bookings });
}