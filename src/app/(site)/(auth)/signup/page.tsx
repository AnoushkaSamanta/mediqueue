"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface DoctorSignupData {
  fullName: string;
  emailOrMobile: string;
  password: string;
  specialty: string;
  clinicName: string;
  clinicAddress: string;
  workingHours: string;
  consultationDuration: string;
  userType: "doctor";
}

interface PatientSignupData {
  fullName: string;
  mobileOrEmail: string;
  password: string;
  age: string;
  gender: string;
  address: string;
  userType: "patient";
}

type SignupFormData = DoctorSignupData | PatientSignupData;

interface SignupComponentProps {
  onSignup?: (formData: SignupFormData) => void;
  onLogin?: (userType: "doctor" | "patient") => void;
}

const SignupComponent: React.FC<SignupComponentProps> = ({
  onSignup,
  onLogin,
}) => {
  const [userType, setUserType] = useState<"doctor" | "patient">("patient");
  const [formData, setFormData] = useState({
    fullName: "",
    emailOrMobile: "",
    mobileOrEmail: "",
    password: "",
    specialty: "",
    clinicName: "",
    clinicAddress: "",
    workingHours: "",
    consultationDuration: "",
    age: "",
    gender: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUserTypeToggle = (type: "doctor" | "patient") => {
    setUserType(type);
    // Reset form when switching user types
    setFormData({
      fullName: "",
      emailOrMobile: "",
      mobileOrEmail: "",
      password: "",
      specialty: "",
      clinicName: "",
      clinicAddress: "",
      workingHours: "",
      consultationDuration: "",
      age: "",
      gender: "",
      address: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName.trim() || !formData.password.trim()) {
      return;
    }

    if (userType === "doctor" && (!formData.emailOrMobile.trim() || !formData.specialty.trim() || !formData.clinicName.trim())) {
      return;
    }

    if (userType === "patient" && !formData.mobileOrEmail.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      if (onSignup) {
        if (userType === "doctor") {
          await onSignup({
            fullName: formData.fullName,
            emailOrMobile: formData.emailOrMobile,
            password: formData.password,
            specialty: formData.specialty,
            clinicName: formData.clinicName,
            clinicAddress: formData.clinicAddress,
            workingHours: formData.workingHours,
            consultationDuration: formData.consultationDuration,
            userType: "doctor",
          });
        } else {
          await onSignup({
            fullName: formData.fullName,
            mobileOrEmail: formData.mobileOrEmail,
            password: formData.password,
            age: formData.age,
            gender: formData.gender,
            address: formData.address,
            userType: "patient",
          });
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    if (onLogin) {
      onLogin(userType);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8"
      style={{ backgroundColor: "var(--color-2)" }}
    >
      <style jsx global>{`
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #005F73;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #004a59;
        }
        
        /* Custom placeholder styles */
        .custom-placeholder::placeholder {
          color: #000000 !important;
          opacity: 0.7;
        }
        
        /* Custom select option styles */
        .custom-select option {
          color: #000000 !important;
          background-color: white !important;
        }
      `}</style>
      
      <div
        className="rounded-3xl p-8 shadow-2xl max-w-5xl w-full mx-4"
        style={{ backgroundColor: "var(--color-1)" }}
      >
        {/* User Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-[var(--color-2)] rounded-full p-1 flex relative">
            <button
              onClick={() => handleUserTypeToggle("doctor")}
              className={`px-6 py-3 rounded-full transition-colors duration-300 ease-in-out font-medium relative z-10 ${
                userType === "doctor"
                  ? "text-[var(--color-2)]"
                  : "text-[var(--color-1)]"
              }`}
            >
              Doctor
            </button>
            <button
              onClick={() => handleUserTypeToggle("patient")}
              className={`px-6 py-3 rounded-full transition-colors duration-300 ease-in-out font-medium relative z-10 ${
                userType === "patient"
                  ? "text-[var(--color-2)]"
                  : "text-[var(--color-1)]"
              }`}
            >
              Patient
            </button>
            <motion.div
              className="absolute top-1 h-12 bg-[var(--color-1)] rounded-full shadow-md"
              layoutId="underline"
              style={{
                width: userType === "doctor" ? "90px" : "95px",
                left: userType === "doctor" ? "4px" : "calc(100% - 99px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={userType}
              className={`text-center flex justify-center items-center ${
                userType === "doctor" ? "md:order-2" : "md:order-1"
              }`}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-xs ">
                <h1 className="text-[var(--color-2)] text-5xl font-thin mb-4">
                  MediQueue
                </h1>

                <div
                  className="rounded-2xl mb-6 mx-auto max-w-xs"
                  style={{ backgroundColor: "var(--color-2)" }}
                >
                  <div className="w-70 h-70 mx-auto mb-2 relative ">
                    <Image
                      src={
                        userType === "patient"
                          ? "/Patient-login.png"
                          : "/Doctor-login.png"
                      }
                      alt={`${
                        userType.charAt(0).toUpperCase() + userType.slice(1)
                      } illustration`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="text-[var(--color-2)] text-left ">
                  {userType === "patient" ? (
                    <>
                      <p className="text-2xl font-thin">
                        Join thousands of patients.
                      </p>
                      <p className="text-2xl">
                        Sign up to book appointments.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-thin">
                        Connect with patients.
                      </p>
                      <p className="text-2xl">
                        Sign up to start your practice.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={userType}
              className={`${
                userType === "doctor" ? "md:order-1" : "md:order-2"
              }`}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div
                className="rounded-3xl p-8 max-h-[80vh] overflow-y-auto custom-scrollbar"
                style={{ backgroundColor: "#F0DCC7" }}
              >
                <h2
                  className="text-3xl font-thin mb-6 text-center"
                  style={{ color: "#005F73" }}
                >
                  Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Common Fields */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#005F73" }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
                      style={{
                        backgroundColor: "white",
                      }}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={userType === "doctor" ? "emailOrMobile" : "mobileOrEmail"}
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#005F73" }}
                    >
                      {userType === "doctor" ? "Email / Mobile Number *" : "Mobile Number / Email *"}
                    </label>
                    <input
                      type="text"
                      id={userType === "doctor" ? "emailOrMobile" : "mobileOrEmail"}
                      name={userType === "doctor" ? "emailOrMobile" : "mobileOrEmail"}
                      value={userType === "doctor" ? formData.emailOrMobile : formData.mobileOrEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
                      style={{
                        backgroundColor: "white",
                      }}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#005F73" }}
                    >
                      Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
                      style={{
                        backgroundColor: "white",
                      }}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Doctor-specific fields */}
                  {userType === "doctor" && (
                    <>
                      <div>
                        <label
                          htmlFor="specialty"
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#005F73" }}
                        >
                          Specialty *
                        </label>
                        <select
                          id="specialty"
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-select"
                          style={{
                            backgroundColor: "white",
                            color: "#000000",
                          }}
                          required
                          disabled={isLoading}
                        >
                          <option value="">Select Specialty</option>
                          <option value="General Physician">General Physician</option>
                          <option value="Dentist">Dentist</option>
                          <option value="Cardiologist">Cardiologist</option>
                          <option value="Dermatologist">Dermatologist</option>
                          <option value="Orthopedic">Orthopedic</option>
                          <option value="Pediatrician">Pediatrician</option>
                          <option value="Gynecologist">Gynecologist</option>
                          <option value="ENT Specialist">ENT Specialist</option>
                          <option value="Ophthalmologist">Ophthalmologist</option>
                          <option value="Neurologist">Neurologist</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="clinicName"
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#005F73" }}
                        >
                          Clinic/Hospital Name *
                        </label>
                        <input
                          type="text"
                          id="clinicName"
                          name="clinicName"
                          value={formData.clinicName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
                          style={{
                            backgroundColor: "white",
                          }}
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="clinicAddress"
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#005F73" }}
                        >
                          Clinic Address / Locality
                        </label>
                        <input
                          type="text"
                          id="clinicAddress"
                          name="clinicAddress"
                          value={formData.clinicAddress}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
                          style={{
                            backgroundColor: "white",
                          }}
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="workingHours"
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#005F73" }}
                        >
                          Working Hours
                        </label>
                        <input
                          type="text"
                          id="workingHours"
                          name="workingHours"
                          value={formData.workingHours}
                          onChange={handleInputChange}
                          placeholder="e.g., 9:00 AM - 6:00 PM"
                          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
                          style={{
                            backgroundColor: "white",
                          }}
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="consultationDuration"
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#005F73" }}
                        >
                          Consultation Duration (avg. per patient)
                        </label>
                        <select
                          id="consultationDuration"
                          name="consultationDuration"
                          value={formData.consultationDuration}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-select"
                          style={{
                            backgroundColor: "white",
                            color: "#000000",
                          }}
                          disabled={isLoading}
                        >
                          <option value="">Select Duration</option>
                          <option value="15">15 minutes</option>
                          <option value="20">20 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="45">45 minutes</option>
                          <option value="60">60 minutes</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Patient-specific fields */}
                  {userType === "patient" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="age"
                            className="block text-sm font-medium mb-2"
                            style={{ color: "#005F73" }}
                          >
                            Age
                          </label>
                          <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
                            style={{
                              backgroundColor: "white",
                            }}
                            disabled={isLoading}
                            min="1"
                            max="120"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="gender"
                            className="block text-sm font-medium mb-2"
                            style={{ color: "#005F73" }}
                          >
                            Gender
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-select"
                            style={{
                              backgroundColor: "white",
                              color: "#000000",
                            }}
                            disabled={isLoading}
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#005F73" }}
                        >
                          Address / Locality
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
                          style={{
                            backgroundColor: "white",
                          }}
                          disabled={isLoading}
                          placeholder="For finding nearby doctors & pharmacies"
                        />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                   disabled={
                      isLoading ||
                      !formData.fullName.trim() ||
                      !formData.password.trim() ||
                      (userType === "doctor" && (!formData.emailOrMobile.trim() || !formData.specialty.trim() || !formData.clinicName.trim())) ||
                      (userType === "patient" && !formData.mobileOrEmail.trim())
                    }
                    className="w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                    style={{
                      backgroundColor: "#005F73",
                    }}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </button>

                  <div className="text-center">
                    <Link href="/login">
                    <button
                      type="button"
                      onClick={handleLoginClick}
                      className="text-sm hover:underline transition-colors duration-200"
                      style={{ color: "#005F73" }}
                    >
                      Already have an account? Log in
                    </button>
                    </Link>
                  </div>
                </form>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;