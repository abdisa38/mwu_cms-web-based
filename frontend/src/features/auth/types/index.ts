export interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  studentId?: string;
  department?: string;
  isVerified?: boolean;
}

export interface LoginRequest {
  emailOrStudentId: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  department: string;
  program: string;
  password: string;
  passwordConfirm: string;
}

export interface RegisterResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  passwordConfirm: string;
}

export interface VerifyEmailRequest {
  token: string;
}
