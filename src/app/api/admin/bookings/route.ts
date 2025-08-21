
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth"; 
import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET all bookings (Admin only)
// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user?.role !== "admin") {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//   }

//   const client = await clientPromise;
//   const db = client.db("InsureEaseDB");

//   const bookings = await db
//     .collection("bookings")
//     .find({})
//     .sort({ createdAt: -1 })
//     .toArray();

//   // summary
//   const total = bookings.length;

//   const statusCounts: Record<string, number> = {};
//   const typeCounts: Record<string, number> = {};

//   for (const booking of bookings) {
//     // Count by status
//     if (booking.status) {
//       statusCounts[booking.status] = (statusCounts[booking.status] || 0) + 1;
//     }

//     // Count by plan type (if your booking includes plan info)
//     if (booking.planType) {
//       typeCounts[booking.planType] = (typeCounts[booking.planType] || 0) + 1;
//     }
//   }

//   return NextResponse.json({
//     total,
//     statusCounts,
//     typeCounts,
//   });
// }

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const client = await clientPromise;
  const db = client.db("InsureEaseDB");

  const bookings = await db
    .collection("bookings")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(bookings);
}

// PATCH to update booking status
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
    }

    const validStatuses = ["pending", "accepted", "rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("InsureEaseDB");

    const result = await db.collection("bookings").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
