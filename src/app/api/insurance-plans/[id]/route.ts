import { NextResponse, NextRequest } from "next/server";
import clientPromise from "../../../../app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("InsureEaseDB");

  const plan = await db.collection("insurancePlans").findOne({ _id: new ObjectId(id) });
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  // Return a new object with _id as string
  const planForResponse = {
    ...plan,
    _id: plan._id.toString(),
  };

  return NextResponse.json({ plan: planForResponse });
}
