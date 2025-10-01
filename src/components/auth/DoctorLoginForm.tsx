import React from "react";
import { DoctorLoginFormProps } from "./LoginFormTypes";

const DoctorLoginForm: React.FC<DoctorLoginFormProps> = ({
  formData,
  onChange,
  disabled,
}) => {
  return (
    <>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium mb-2"
          style={{ color: "#005F73" }}
        >
          Email / Mobile Number
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={onChange}
          placeholder="Enter your email or mobile number"
          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200"
          style={{
            backgroundColor: "white",
            color: "#000000",
          }}
          required
          disabled={disabled}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium mb-2"
          style={{ color: "#005F73" }}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Enter your password"
          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200"
          style={{
            backgroundColor: "white",
            color: "#000000",
          }}
          required
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default DoctorLoginForm;