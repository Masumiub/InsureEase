// import { NextResponse, NextRequest } from "next/server";
// import clientPromise from "../../../../app/lib/mongodb";
// import { ObjectId } from "mongodb";

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;
//   if (!ObjectId.isValid(id)) {
//     return NextResponse.json({ error: "Invalid id" }, { status: 400 });
//   }

//   const client = await clientPromise;
//   const db = client.db("InsureEaseDB");

//   const plan = await db.collection("insurancePlans").findOne({ _id: new ObjectId(id) });
//   if (!plan) {
//     return NextResponse.json({ error: "Plan not found" }, { status: 404 });
//   }

  
//   const planForResponse = {
//     ...plan,
//     _id: plan._id.toString(),
//   };

//   return NextResponse.json({ plan: planForResponse });
// }


import { NextResponse, NextRequest } from "next/server";
import clientPromise from "../../../../app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  // Extract `id` param from URL pathname
  const url = new URL(req.url);
  const pathParts = url.pathname.split("/"); // e.g., ['', 'api', 'insurance-plans', '12345']
  const id = pathParts[pathParts.length - 1]; // last part is id

  if (!id || Array.isArray(id)) {
    return NextResponse.json({ error: "Missing or invalid id" }, { status: 400 });
  }

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("InsureEaseDB");

  const plan = await db.collection("insurancePlans").findOne({ _id: new ObjectId(id) });
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  const planForResponse = {
    ...plan,
    _id: plan._id.toString(),
  };

  return NextResponse.json({ plan: planForResponse });
}

