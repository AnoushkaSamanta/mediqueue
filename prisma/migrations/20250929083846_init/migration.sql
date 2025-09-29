CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CreateEnum
CREATE TYPE "public"."Specialty" AS ENUM ('General Physician', 'Dentist', 'Cardiologist', 'Dermatologist', 'Orthopedic', 'Pediatrician', 'Gynecologist', 'ENT Specialist', 'Ophthalmologist', 'Neurologist', 'Other');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('Male', 'Female', 'Other', 'Prefer not to say');

-- CreateEnum
CREATE TYPE "public"."TicketStatus" AS ENUM ('waiting', 'in_consultation', 'consulted', 'left', 'cancelled');

-- CreateEnum
CREATE TYPE "public"."StockStatus" AS ENUM ('in_stock', 'out_of_stock', 'low_stock');

-- CreateTable
CREATE TABLE "public"."doctors" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "mobile_number" VARCHAR(20),
    "password_hash" VARCHAR(255) NOT NULL,
    "specialty" "public"."Specialty" NOT NULL,
    "clinic_hospital_name" VARCHAR(255) NOT NULL,
    "clinic_address" TEXT NOT NULL,
    "working_hours" JSONB NOT NULL DEFAULT '{}',
    "consultation_duration" INTEGER NOT NULL,
    "contact_number" VARCHAR(20),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."patients" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "full_name" VARCHAR(255) NOT NULL,
    "mobile_number" VARCHAR(20),
    "email" VARCHAR(255),
    "password_hash" VARCHAR(255) NOT NULL,
    "age" INTEGER,
    "gender" "public"."Gender",
    "address" TEXT,
    "date_of_birth" DATE,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tickets" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "patient_id" UUID NOT NULL,
    "doctor_id" UUID NOT NULL,
    "ticket_number" VARCHAR(50) NOT NULL,
    "booking_time" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."TicketStatus" NOT NULL DEFAULT 'waiting',
    "estimated_wait_time" INTEGER,
    "queue_position" INTEGER,
    "actual_consultation_time" TIMESTAMPTZ(6),
    "consultation_duration" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."prescriptions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "ticket_id" UUID NOT NULL,
    "doctor_id" UUID NOT NULL,
    "patient_id" UUID NOT NULL,
    "diagnosis" TEXT,
    "symptoms" TEXT,
    "notes" TEXT,
    "follow_up_date" DATE,
    "prescription_file_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."medicines" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "prescription_id" UUID NOT NULL,
    "medicine_name" VARCHAR(255) NOT NULL,
    "dosage" VARCHAR(100) NOT NULL,
    "frequency" VARCHAR(100) NOT NULL,
    "duration" VARCHAR(100) NOT NULL,
    "instructions" TEXT,
    "quantity" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pharmacies" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "contact_number" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255),
    "location_coordinates" JSONB NOT NULL,
    "opening_hours" JSONB NOT NULL DEFAULT '{}',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "rating" DECIMAL(2,1),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pharmacies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."medicine_availability" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "medicine_id" UUID NOT NULL,
    "pharmacy_id" UUID NOT NULL,
    "stock_status" "public"."StockStatus" NOT NULL DEFAULT 'in_stock',
    "price" DECIMAL(10,2),
    "last_updated" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "medicine_availability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctors_email_key" ON "public"."doctors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_mobile_number_key" ON "public"."doctors"("mobile_number");

-- CreateIndex
CREATE INDEX "idx_doctors_specialty" ON "public"."doctors"("specialty");

-- CreateIndex
CREATE INDEX "idx_doctors_clinic_address" ON "public"."doctors"("clinic_address");

-- CreateIndex
CREATE INDEX "idx_doctors_email" ON "public"."doctors"("email");

-- CreateIndex
CREATE INDEX "idx_doctors_mobile" ON "public"."doctors"("mobile_number");

-- CreateIndex
CREATE INDEX "idx_doctors_active" ON "public"."doctors"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "patients_mobile_number_key" ON "public"."patients"("mobile_number");

-- CreateIndex
CREATE UNIQUE INDEX "patients_email_key" ON "public"."patients"("email");

-- CreateIndex
CREATE INDEX "idx_patients_mobile" ON "public"."patients"("mobile_number");

-- CreateIndex
CREATE INDEX "idx_patients_email" ON "public"."patients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_ticket_number_key" ON "public"."tickets"("ticket_number");

-- CreateIndex
CREATE INDEX "idx_tickets_patient" ON "public"."tickets"("patient_id");

-- CreateIndex
CREATE INDEX "idx_tickets_doctor" ON "public"."tickets"("doctor_id");

-- CreateIndex
CREATE INDEX "idx_tickets_status" ON "public"."tickets"("status");

-- CreateIndex
CREATE INDEX "idx_tickets_booking_time" ON "public"."tickets"("booking_time");

-- CreateIndex
CREATE INDEX "idx_tickets_doctor_status" ON "public"."tickets"("doctor_id", "status");

-- CreateIndex
CREATE INDEX "idx_tickets_number" ON "public"."tickets"("ticket_number");

-- CreateIndex
CREATE UNIQUE INDEX "prescriptions_ticket_id_key" ON "public"."prescriptions"("ticket_id");

-- CreateIndex
CREATE INDEX "idx_prescriptions_ticket" ON "public"."prescriptions"("ticket_id");

-- CreateIndex
CREATE INDEX "idx_prescriptions_patient" ON "public"."prescriptions"("patient_id");

-- CreateIndex
CREATE INDEX "idx_prescriptions_doctor" ON "public"."prescriptions"("doctor_id");

-- CreateIndex
CREATE INDEX "idx_medicines_prescription" ON "public"."medicines"("prescription_id");

-- CreateIndex
CREATE INDEX "idx_medicines_name" ON "public"."medicines"("medicine_name");

-- CreateIndex
CREATE INDEX "idx_pharmacies_location" ON "public"."pharmacies" USING GIN ("location_coordinates");

-- CreateIndex
CREATE INDEX "idx_pharmacies_active" ON "public"."pharmacies"("is_active");

-- CreateIndex
CREATE INDEX "idx_pharmacies_name" ON "public"."pharmacies"("name");

-- CreateIndex
CREATE INDEX "idx_medicine_availability_medicine" ON "public"."medicine_availability"("medicine_id");

-- CreateIndex
CREATE INDEX "idx_medicine_availability_pharmacy" ON "public"."medicine_availability"("pharmacy_id");

-- CreateIndex
CREATE INDEX "idx_medicine_availability_stock" ON "public"."medicine_availability"("stock_status");

-- CreateIndex
CREATE UNIQUE INDEX "medicine_availability_medicine_id_pharmacy_id_key" ON "public"."medicine_availability"("medicine_id", "pharmacy_id");

-- AddForeignKey
ALTER TABLE "public"."tickets" ADD CONSTRAINT "tickets_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tickets" ADD CONSTRAINT "tickets_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."prescriptions" ADD CONSTRAINT "prescriptions_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."prescriptions" ADD CONSTRAINT "prescriptions_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."prescriptions" ADD CONSTRAINT "prescriptions_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."medicines" ADD CONSTRAINT "medicines_prescription_id_fkey" FOREIGN KEY ("prescription_id") REFERENCES "public"."prescriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."medicine_availability" ADD CONSTRAINT "medicine_availability_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "public"."medicines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."medicine_availability" ADD CONSTRAINT "medicine_availability_pharmacy_id_fkey" FOREIGN KEY ("pharmacy_id") REFERENCES "public"."pharmacies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
