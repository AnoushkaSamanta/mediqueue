export interface LoginFormData {
  username: string;
  password: string;
  userType: "doctor" | "patient";
}

export interface BaseLoginFormData {
  username: string;
  password: string;
}

export interface LoginFormProps {
  formData: BaseLoginFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export interface DoctorLoginFormProps extends LoginFormProps {}

export interface PatientLoginFormProps extends LoginFormProps {}