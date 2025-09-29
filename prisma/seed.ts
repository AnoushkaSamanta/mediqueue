import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Doctors
  const doctor1 = await prisma.doctor.create({
    data: {
      fullName: "Dr. Arjun Mehta",
      email: "arjun.mehta@example.com",
      mobileNumber: "9876543210",
      passwordHash: "hashed_password_123",
      specialty: "Cardiologist",
      clinicHospitalName: "Heart Care Clinic",
      clinicAddress: "Mumbai, Maharashtra",
      workingHours: { start: "09:00", end: "17:00" },
      consultationDuration: 30,
      contactNumber: "02212345678"
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      fullName: "Dr. Priya Sharma",
      email: "priya.sharma@example.com",
      mobileNumber: "9876501234",
      passwordHash: "hashed_password_456",
      specialty: "Dermatologist",
      clinicHospitalName: "Skin Glow Clinic",
      clinicAddress: "Delhi",
      workingHours: { start: "10:00", end: "18:00" },
      consultationDuration: 20,
      contactNumber: "01112345678"
    },
  });

  // Seed Patients
  const patient1 = await prisma.patient.create({
    data: {
      fullName: "Rohit Singh",
      mobileNumber: "9123456780",
      email: "rohit.singh@example.com",
      passwordHash: "hashed_password_patient1",
      age: 29,
      gender: "Male",
      address: "Pune, Maharashtra",
      dateOfBirth: new Date("1996-04-12")
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      fullName: "Anjali Verma",
      mobileNumber: "9123498765",
      email: "anjali.verma@example.com",
      passwordHash: "hashed_password_patient2",
      age: 34,
      gender: "Female",
      address: "Bangalore, Karnataka",
      dateOfBirth: new Date("1991-02-20")
    },
  });

  // Seed Ticket
  const ticket1 = await prisma.ticket.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      ticketNumber: "TCKT1001",
      status: "waiting",
      estimatedWaitTime: 15,
      queuePosition: 1,
    },
  });

  // Seed Prescription
  const prescription1 = await prisma.prescription.create({
    data: {
      ticketId: ticket1.id,
      doctorId: doctor1.id,
      patientId: patient1.id,
      diagnosis: "High Blood Pressure",
      symptoms: "Headache, Dizziness",
      notes: "Monitor BP regularly",
      followUpDate: new Date("2025-10-15"),
    },
  });

  // Seed Medicines
  const medicine1 = await prisma.medicine.create({
    data: {
      prescriptionId: prescription1.id,
      medicineName: "Amlodipine",
      dosage: "5mg",
      frequency: "Once daily",
      duration: "30 days",
      instructions: "Take after breakfast",
      quantity: 30,
    },
  });

  const medicine2 = await prisma.medicine.create({
    data: {
      prescriptionId: prescription1.id,
      medicineName: "Paracetamol",
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "5 days",
      instructions: "Take after meals",
      quantity: 10,
    },
  });

  // Seed Pharmacy
  const pharmacy1 = await prisma.pharmacy.create({
    data: {
      name: "HealthPlus Pharmacy",
      address: "Andheri West, Mumbai",
      contactNumber: "0229876543",
      email: "contact@healthplus.com",
      locationCoordinates: { lat: 19.1197, lng: 72.8468 },
      openingHours: { start: "08:00", end: "22:00" },
      rating: 4.5,
    },
  });

  // Seed MedicineAvailability
  await prisma.medicineAvailability.create({
    data: {
      medicineId: medicine1.id,
      pharmacyId: pharmacy1.id,
      stockStatus: "in_stock",
      price: 120.50,
    },
  });

  await prisma.medicineAvailability.create({
    data: {
      medicineId: medicine2.id,
      pharmacyId: pharmacy1.id,
      stockStatus: "low_stock",
      price: 35.00,
    },
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
