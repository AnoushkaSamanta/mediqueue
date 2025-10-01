"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import DoctorSignupForm from "@/components/auth/DoctorSignupForm";
import PatientSignupForm from "@/components/auth/PatientSignupForm";
import Toast from "@/components/ui/Toast";
import { 
  DoctorSignupData, 
  PatientSignupData, 
  SignupFormData,
  DoctorFormData,
  PatientFormData
} from "@/components/auth/SignupFormTypes";

interface SignupComponentProps {
  onSignup?: (formData: SignupFormData) => void;
  onLogin?: (userType: "doctor" | "patient") => void;
}

const SignupComponent: React.FC<SignupComponentProps> = ({
  onSignup,
  onLogin,
}) => {
  const [userType, setUserType] = useState<"doctor" | "patient">("patient");
  const [doctorFormData, setDoctorFormData] = useState<DoctorFormData>({
    fullName: "",
    emailOrMobile: "",
    password: "",
    specialty: "",
    clinicName: "",
    clinicAddress: "",
    workingHours: "",
    consultationDuration: "",
  });
  const [patientFormData, setPatientFormData] = useState<PatientFormData>({
    fullName: "",
    mobileOrEmail: "",
    password: "",
    age: "",
    gender: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const handleUserTypeToggle = (type: "doctor" | "patient") => {
    setUserType(type);
    // Reset forms when switching user types
    setDoctorFormData({
      fullName: "",
      emailOrMobile: "",
      password: "",
      specialty: "",
      clinicName: "",
      clinicAddress: "",
      workingHours: "",
      consultationDuration: "",
    });
    setPatientFormData({
      fullName: "",
      mobileOrEmail: "",
      password: "",
      age: "",
      gender: "",
      address: "",
    });
  };

  const handleDoctorInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDoctorFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePatientInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatientFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const currentFormData = userType === "doctor" ? doctorFormData : patientFormData;

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!currentFormData.fullName.trim() || !currentFormData.password.trim()) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    if (userType === "doctor") {
      const doctorData = currentFormData as DoctorFormData;
      if (!doctorData.emailOrMobile.trim() || !doctorData.specialty.trim() || !doctorData.clinicName.trim()) {
        showToast("Please fill in all required fields for doctor registration", "error");
        return;
      }
    }

    if (userType === "patient") {
      const patientData = currentFormData as PatientFormData;
      if (!patientData.mobileOrEmail.trim()) {
        showToast("Please fill in all required fields for patient registration", "error");
        return;
      }
    }

    setIsLoading(true);

    try {
      let response;
      
      // Add debugging logs
      console.log('Starting signup process for:', userType);
      console.log('Form data:', userType === "doctor" ? doctorFormData : patientFormData);
      
      if (userType === "doctor") {
        const requestData = {
          fullName: doctorFormData.fullName,
          emailOrMobile: doctorFormData.emailOrMobile,
          password: doctorFormData.password,
          specialty: doctorFormData.specialty,
          clinicName: doctorFormData.clinicName,
          clinicAddress: doctorFormData.clinicAddress,
          workingHours: doctorFormData.workingHours,
          consultationDuration: doctorFormData.consultationDuration,
        };
        
        console.log('Sending doctor signup request:', requestData);
        
        response = await fetch("/api/auth/signup/doctor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
      } else {
        const requestData = {
          fullName: patientFormData.fullName,
          mobileOrEmail: patientFormData.mobileOrEmail,
          password: patientFormData.password,
          age: patientFormData.age,
          gender: patientFormData.gender,
          address: patientFormData.address,
        };
        
        console.log('Sending patient signup request:', requestData);
        
        response = await fetch("/api/auth/signup/patient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
      }

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if response is actually JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse);
        throw new Error("Server returned non-JSON response. Check server logs for details.");
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Success handling
      showToast(
        `${userType.charAt(0).toUpperCase() + userType.slice(1)} account created successfully! Please check your email for verification.`,
        "success"
      );
      
      // Reset forms
      if (userType === "doctor") {
        setDoctorFormData({
          fullName: "",
          emailOrMobile: "",
          password: "",
          specialty: "",
          clinicName: "",
          clinicAddress: "",
          workingHours: "",
          consultationDuration: "",
        });
      } else {
        setPatientFormData({
          fullName: "",
          mobileOrEmail: "",
          password: "",
          age: "",
          gender: "",
          address: "",
        });
      }

      // Call onSignup prop if provided (for external handling)
      if (onSignup) {
        if (userType === "doctor") {
          await onSignup({
            fullName: doctorFormData.fullName,
            emailOrMobile: doctorFormData.emailOrMobile,
            password: doctorFormData.password,
            specialty: doctorFormData.specialty,
            clinicName: doctorFormData.clinicName,
            clinicAddress: doctorFormData.clinicAddress,
            workingHours: doctorFormData.workingHours,
            consultationDuration: doctorFormData.consultationDuration,
            userType: "doctor",
          });
        } else {
          await onSignup({
            fullName: patientFormData.fullName,
            mobileOrEmail: patientFormData.mobileOrEmail,
            password: patientFormData.password,
            age: patientFormData.age,
            gender: patientFormData.gender,
            address: patientFormData.address,
            userType: "patient",
          });
        }
      }

    } catch (error) {
      console.error("Signup error:", error);
      showToast(
        error instanceof Error ? error.message : "An error occurred during registration",
        "error"
      );
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
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      <div
        className="min-h-screen flex items-center justify-center py-10 "
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
        
        /* Hidden scrollbar for doctor signup */
        .hidden-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hidden-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
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
                className={`rounded-3xl p-8 max-h-[80vh] overflow-y-auto ${
                  userType === "doctor" ? "hidden-scrollbar" : "custom-scrollbar"
                }`}
                style={{ backgroundColor: "#F0DCC7" }}
              >
                <h2
                  className="text-3xl font-thin mb-6 text-center"
                  style={{ color: "#005F73" }}
                >
                  Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {userType === "doctor" ? (
                    <DoctorSignupForm
                      formData={doctorFormData}
                      onChange={handleDoctorInputChange}
                      disabled={isLoading}
                    />
                  ) : (
                    <PatientSignupForm
                      formData={patientFormData}
                      onChange={handlePatientInputChange}
                      disabled={isLoading}
                    />
                  )}

                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !currentFormData.fullName.trim() ||
                      !currentFormData.password.trim() ||
                      (userType === "doctor" && (
                        !(currentFormData as DoctorFormData).emailOrMobile.trim() || 
                        !(currentFormData as DoctorFormData).specialty.trim() || 
                        !(currentFormData as DoctorFormData).clinicName.trim()
                      )) ||
                      (userType === "patient" && !(currentFormData as PatientFormData).mobileOrEmail.trim())
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
    </>
  );
};

export default SignupComponent;