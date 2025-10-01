import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@/generated/prisma";
import { validateEnvVars } from "@/lib/env";

// Create Prisma client instance
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        // Validate environment variables
        if (!validateEnvVars()) {
            return NextResponse.json({
                error: "Server configuration error. Missing environment variables."
            }, { status: 500 });
        }
        // Ensure we can parse the request body
        let body;
        try {
            body = await req.json();
        } catch (parseError) {
            console.error("JSON parsing error:", parseError);
            return NextResponse.json({ 
                error: "Invalid JSON in request body" 
            }, { status: 400 });
        }

        const { fullName, mobileOrEmail, password, age, gender, address } = body;

        // Validate required fields
        if (!fullName || !mobileOrEmail || !password) {
            return NextResponse.json({ 
                error: "Missing required fields" 
            }, { status: 400 });
        }

        // Validate email format if it contains @
        const isEmail = mobileOrEmail.includes("@");
        
        // For testing, let's use the actual email instead of temp email
        const email = isEmail ? mobileOrEmail : `${mobileOrEmail}@mediqueue.temp`;

        // Create Supabase client
        let supabase;
        try {
            supabase = await createClient();
        } catch (supabaseError) {
            console.error("Supabase client creation error:", supabaseError);
            return NextResponse.json({ 
                error: "Authentication service unavailable" 
            }, { status: 500 });
        }

        // Check if patient already exists in our database
        try {
            const existingPatient = await prisma.patient.findFirst({
                where: { 
                    OR: [
                        { email: isEmail ? mobileOrEmail : null },
                        { mobileNumber: !isEmail ? mobileOrEmail : null }
                    ]
                },
            });

            if (existingPatient) {
                return NextResponse.json({ 
                    error: "Patient already exists with this email/mobile" 
                }, { status: 400 });
            }
        } catch (dbError) {
            console.error("Database check error:", dbError);
            return NextResponse.json({ 
                error: "Database error while checking existing user" 
            }, { status: 500 });
        }

        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    user_type: 'patient',
                    mobile_number: !isEmail ? mobileOrEmail : null,
                    actual_email: isEmail ? mobileOrEmail : null,
                    age: age ? parseInt(age) : null,
                    gender: gender || null,
                }
            }
        });

        if (authError) {
            console.error("Supabase auth error:", authError);
            return NextResponse.json({ 
                error: authError.message || "Failed to create user account" 
            }, { status: 400 });
        }

        if (!authData.user) {
            return NextResponse.json({ 
                error: "Failed to create user account" 
            }, { status: 400 });
        }

        // Create patient record in Prisma
        try {
            const patient = await prisma.patient.create({
                data: {
                    id: authData.user.id, // Use Supabase user ID
                    fullName,
                    email: isEmail ? mobileOrEmail : null,
                    mobileNumber: !isEmail ? mobileOrEmail : null,
                    passwordHash: "", // Not needed since we're using Supabase auth
                    age: age ? parseInt(age) : null,
                    gender: gender || null,
                    address: address || null,
                },
            });

            // Return success response (excluding sensitive data)
            const { passwordHash, ...patientResponse } = patient;
            
            return NextResponse.json({
                success: true,
                message: "Patient account created successfully",
                patient: patientResponse,
                user: {
                    id: authData.user.id,
                    email: authData.user.email,
                    email_confirmed_at: authData.user.email_confirmed_at,
                }
            }, { status: 201 });
        } catch (dbCreateError) {
            console.error("Database creation error:", dbCreateError);
            return NextResponse.json({ 
                error: "Failed to create patient profile" 
            }, { status: 500 });
        }

    } catch (error) {
        console.error("Patient signup error:", error);
        
        return NextResponse.json({
            error: "Internal server error during patient registration"
        }, { status: 500 });
    }
}
