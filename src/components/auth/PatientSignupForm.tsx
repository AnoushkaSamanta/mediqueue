import React from "react";
import { PatientSignupFormProps } from "./SignupFormTypes";

const PatientSignupForm: React.FC<PatientSignupFormProps> = ({
  formData,
  onChange,
  disabled,
}) => {
  return (
    <>
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
          onChange={onChange}
          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
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
          htmlFor="mobileOrEmail"
          className="block text-sm font-medium mb-2"
          style={{ color: "#005F73" }}
        >
          Mobile Number / Email *
        </label>
        <input
          type="text"
          id="mobileOrEmail"
          name="mobileOrEmail"
          value={formData.mobileOrEmail}
          onChange={onChange}
          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
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
          Password *
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
          style={{
            backgroundColor: "white",
            color: "#000000",
          }}
          required
          disabled={disabled}
        />
      </div>

      {/* Patient-specific fields */}
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
            onChange={onChange}
            className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
            style={{
              backgroundColor: "white",
              color: "#000000",
            }}
            disabled={disabled}
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
            onChange={onChange}
            className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-select"
            style={{
              backgroundColor: "white",
              color: "#000000",
            }}
            disabled={disabled}
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
          onChange={onChange}
          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
          style={{
            backgroundColor: "white",
            color: "#000000",
          }}
          disabled={disabled}
          placeholder="For finding nearby doctors & pharmacies"
        />
      </div>
    </>
  );
};

export default PatientSignupForm;