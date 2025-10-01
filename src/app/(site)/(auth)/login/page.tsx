"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import DoctorLoginForm from "@/components/auth/DoctorLoginForm";
import PatientLoginForm from "@/components/auth/PatientLoginForm";
import { LoginFormData, BaseLoginFormData } from "@/components/auth/LoginFormTypes";

interface LoginComponentProps {
  onLogin?: (formData: LoginFormData) => void;
  onSignUp?: (userType: "doctor" | "patient") => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  onLogin,
  onSignUp,
}) => {
  const [userType, setUserType] = useState<"doctor" | "patient">("patient");
  const [formData, setFormData] = useState<BaseLoginFormData>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUserTypeToggle = (type: "doctor" | "patient") => {
    setUserType(type);
    // Reset form when switching user types
    setFormData({ username: "", password: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call the onLogin prop if provided
      if (onLogin) {
        await onLogin({
          ...formData,
          userType,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    if (onSignUp) {
      onSignUp(userType);
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
      className="min-h-screen flex items-center justify-center "
      style={{ backgroundColor: "var(--color-2)" }}
    >
      <div
        className="rounded-3xl p-8 shadow-2xl max-w-4xl w-full mx-4"
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
                        Skip the waiting room.
                      </p>
                      <p className="text-2xl">Log in to secure your spot.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-thin">
                        Your patients are waiting.
                      </p>
                      <p className="text-2xl">
                        Log in to manage your appointments.
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
                className="rounded-3xl p-8"
                style={{ backgroundColor: "#F0DCC7" }}
              >
                <h2
                  className="text-3xl font-thin mb-6 text-center"
                  style={{ color: "#005F73" }}
                >
                  Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {userType === "doctor" ? (
                    <DoctorLoginForm
                      formData={formData}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                  ) : (
                    <PatientLoginForm
                      formData={formData}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                  )}

                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !formData.username.trim() ||
                      !formData.password.trim()
                    }
                    className="w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "#005F73",
                    }}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>

                  <div className="text-center">
                    <Link href="/signup">
                    <button
                      type="button"
                      onClick={handleSignUpClick}
                      className="text-sm hover:underline transition-colors duration-200"
                      style={{ color: "#005F73" }}
                    >
                      Don&apos;t have an account? Sign up
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

export default LoginComponent;
