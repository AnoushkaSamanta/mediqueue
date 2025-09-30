import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            fullName,
            emailOrMobile,
            password,
            specialty,
            clinicName,
            clinicAddress,
            workingHours,
            consultationDuration,
        } = body;
        if (!fullName || !emailOrMobile || !password || !specialty || !clinicName) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        const existingDoctor = await prisma.doctor.findFirst({
            where: { OR: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }] },
        })
        if (existingDoctor) {
            return NextResponse.json({ error: "Doctor already exists" }, { status: 400 });
        }

        //hash password
        const passwordHash = await bcrypt.hash(password, 10);

        //create doctor
        const doctor = await prisma.doctor.create({
            data: {
                fullName,
                email: emailOrMobile.includes("@") ? emailOrMobile : null,
                mobileNumber: !emailOrMobile.includes("@") ? emailOrMobile : null,
                passwordHash,
                specialty,
                clinicHospitalName: clinicName,
                clinicAddress,
                workingHours,
                consultationDuration: consultationDuration ? parseInt(consultationDuration) : 15,
            },
        });
        return NextResponse.json({doctor});
    } catch (error) {
          console.error(error);
          return NextResponse.json({error:"Error in server in doctor creation"},{status:500})
    }
}