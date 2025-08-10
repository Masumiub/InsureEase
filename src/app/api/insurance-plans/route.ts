import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { Session } from "next-auth";
import { ObjectId } from "mongodb";


type InsurancePlan = {
  type: "health" | "car" | "travel" | "life";
  title: string;
  coverage: string;
  premium: number;
  term: string;
  bannerUrl: string;
};

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { type, title, coverage, premium, term, bannerUrl } = body;

  if (!type || !title || !coverage || !premium || !term || !bannerUrl) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

const client = await clientPromise;
  const db = client.db("InsureEaseDB");
  const insurancePlan = {
    type,
    title,
    coverage,
    premium,
    term,
    bannerUrl,
    createdAt: new Date(),
  };

  const result = await db.collection("insurancePlans").insertOne(insurancePlan);

  return NextResponse.json({ success: true, id: result.insertedId });
}



export async function GET() {
  const client = await clientPromise;
  const db = client.db("InsureEaseDB");
  const plans = await db.collection("insurancePlans")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(plans);
}


export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { id, type, title, coverage, premium, term, bannerUrl } = body;

  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db("InsureEaseDB");

  // Build update doc dynamically so partial update is possible
  const updateDoc: Partial<InsurancePlan> = {};
  if (type) updateDoc.type = type;
  if (title) updateDoc.title = title;
  if (coverage) updateDoc.coverage = coverage;
  if (premium) updateDoc.premium = premium;
  if (term) updateDoc.term = term;
  if (bannerUrl) updateDoc.bannerUrl = bannerUrl;

  if (Object.keys(updateDoc).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const result = await db.collection("insurancePlans").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateDoc }
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("InsureEaseDB");

  const result = await db.collection("insurancePlans").deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
