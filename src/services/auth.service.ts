import axios from "axios";

const API_BASE_URL = "http://localhost:1337/api";

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  identifier: string; // username or email
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface ApiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: unknown;
  };
}

interface StrapiErrorResponse {
  error?: {
    status: number;
    name: string;
    message: string;
    details?: unknown;
  };
  message?: string;
}

class AuthService {
  private baseURL = API_BASE_URL;

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      console.log("Attempting registration with:", {
        ...data,
        password: "[HIDDEN]",
      });

      const response = await axios.post(
        `${this.baseURL}/auth/local/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration successful:", response.data);
      return response.data;
    } catch (error: unknown) {
      console.error("Registration error:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(
          this.formatStrapiError(error.response.data as StrapiErrorResponse)
        );
      }
      throw new Error("Registration failed. Please try again.");
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      console.log("Attempting login with:", { ...data, password: "[HIDDEN]" });

      const response = await axios.post(`${this.baseURL}/auth/local`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login successful:", response.data);
      return response.data;
    } catch (error: unknown) {
      console.error("Login error:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(
          this.formatStrapiError(error.response.data as StrapiErrorResponse)
        );
      }
      throw new Error("Login failed. Please check your credentials.");
    }
  }

  async getCurrentUser(token: string): Promise<AuthResponse["user"]> {
    try {
      const response = await axios.get(`${this.baseURL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      console.error("Get current user error:", error);
      throw new Error("Failed to get user data.");
    }
  }

  private formatStrapiError(errorData: StrapiErrorResponse): string {
    console.log("Raw error data:", errorData);

    if (errorData.error?.message) {
      // Handle specific Strapi error messages
      const message = errorData.error.message;

      // Map common Strapi errors to user-friendly messages
      if (message.includes("Email already taken")) {
        return "This email is already registered. Please use a different email or try logging in.";
      }
      if (message.includes("Username already taken")) {
        return "This username is already taken. Please choose a different username.";
      }
      if (message.includes("Invalid identifier or password")) {
        return "Invalid email/username or password. Please check your credentials.";
      }
      if (message.includes("Invalid identifier")) {
        return "Invalid email/username or password. Please check your credentials.";
      }
      if (message.includes("Invalid password")) {
        return "Invalid email/username or password. Please check your credentials.";
      }

      return message;
    }

    // Handle other error formats
    if (errorData.message) {
      return errorData.message;
    }

    if (errorData.error) {
      return String(errorData.error);
    }

    return "An error occurred. Please try again.";
  }
}

export const authService = new AuthService();
