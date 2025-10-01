export interface DoctorSignupData {
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

export interface PatientSignupData {
  fullName: string;
  mobileOrEmail: string;
  password: string;
  age: string;
  gender: string;
  address: string;
  userType: "patient";
}

export type SignupFormData = DoctorSignupData | PatientSignupData;

export interface DoctorFormData {
  fullName: string;
  emailOrMobile: string;
  password: string;
  specialty: string;
  clinicName: string;
  clinicAddress: string;
  workingHours: string;
  consultationDuration: string;
}

export interface PatientFormData {
  fullName: string;
  mobileOrEmail: string;
  password: string;
  age: string;
  gender: string;
  address: string;
}

export interface DoctorSignupFormProps {
  formData: DoctorFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled: boolean;
}

export interface PatientSignupFormProps {
  formData: PatientFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled: boolean;
}