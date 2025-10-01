import React from "react";
import { DoctorSignupFormProps } from "./SignupFormTypes";

const DoctorSignupForm: React.FC<DoctorSignupFormProps> = ({
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
          htmlFor="emailOrMobile"
          className="block text-sm font-medium mb-2"
          style={{ color: "#005F73" }}
        >
          Email / Mobile Number *
        </label>
        <input
          type="text"
          id="emailOrMobile"
          name="emailOrMobile"
          value={formData.emailOrMobile}
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

      {/* Doctor-specific fields */}
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
          onChange={onChange}
          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-select"
          style={{
            backgroundColor: "white",
            color: "#000000",
          }}
          required
          disabled={disabled}
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
          onChange={onChange}
          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
          style={{
            backgroundColor: "white",
            color: "#000000",
          }}
          disabled={disabled}
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
          onChange={onChange}
          placeholder="e.g., 9:00 AM - 6:00 PM"
          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-placeholder"
          style={{
            backgroundColor: "white",
            color: "#000000",
          }}
          disabled={disabled}
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
          onChange={onChange}
          className="w-full px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#005F73] transition-shadow duration-200 custom-select"
          style={{
            backgroundColor: "white",
            color: "#000000",
          }}
          disabled={disabled}
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
  );
};

export default DoctorSignupForm;