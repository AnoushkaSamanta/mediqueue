// app/api/auth/signup/patient/route.ts
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, mobileOrEmail, password, age, gender, address } = body;

    // Basic validation
    if (!fullName || !mobileOrEmail || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if patient already exists
    const existingPatient = await prisma.patient.findFirst({
      where: { OR: [{ email: mobileOrEmail }, { mobileNumber: mobileOrEmail }] },
    });

    if (existingPatient) {
      return NextResponse.json({ error: "Patient already exists" }, { status: 400 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create patient
    const patient = await prisma.patient.create({
      data: {
        fullName,
        email: mobileOrEmail.includes("@") ? mobileOrEmail : null,
        mobileNumber: !mobileOrEmail.includes("@") ? mobileOrEmail : null,
        passwordHash,
        age: age ? parseInt(age) : null,
        gender,
        address,
      },
    });

    return NextResponse.json({ patient });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
