import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  authService,
  AuthResponse,
  RegisterData,
  LoginData,
} from "@/services/auth.service";

export interface User {
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
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  // Actions
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      // Actions
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      clearError: () => set({ error: null }),

      login: async (data: LoginData) => {
        try {
          console.log("🔐 Starting login process...");
          set({ isLoading: true, error: null });

          const response: AuthResponse = await authService.login(data);

          console.log("✅ Login successful, updating store...");
          set({
            user: response.user,
            token: response.jwt,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          console.log("💾 Store updated after login:", {
            hasUser: !!response.user,
            hasToken: !!response.jwt,
            isAuthenticated: true,
          });
        } catch (error: unknown) {
          console.error("❌ Login failed:", error);
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Login failed",
          });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        try {
          console.log("📝 Starting registration process...");
          set({ isLoading: true, error: null });

          const response: AuthResponse = await authService.register(data);

          console.log("✅ Registration successful, updating store...");
          set({
            user: response.user,
            token: response.jwt,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          console.log("💾 Store updated after registration:", {
            hasUser: !!response.user,
            hasToken: !!response.jwt,
            isAuthenticated: true,
          });
        } catch (error: unknown) {
          console.error("❌ Registration failed:", error);
          set({
            isLoading: false,
            error:
              error instanceof Error ? error.message : "Registration failed",
          });
          throw error;
        }
      },

      logout: () => {
        console.log("🚪 Logging out, clearing store...");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });
        console.log("✅ Store cleared after logout");
      },

      initializeAuth: async () => {
        const { token, isAuthenticated } = get();

        console.log("🔄 Initializing auth:", {
          hasToken: !!token,
          isAuthenticated,
          willInitialize: !token || isAuthenticated ? false : true,
        });

        // Only initialize if we have a token and are not already authenticated
        if (!token || isAuthenticated) {
          return;
        }

        try {
          set({ isLoading: true });

          const user = await authService.getCurrentUser(token);

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          console.log("✅ Auth initialized successfully:", {
            hasUser: !!user,
            isAuthenticated: true,
          });
        } catch (error: unknown) {
          console.error("❌ Failed to initialize auth:", error);
          // If token is invalid, clear auth state
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      // Ensure the store is hydrated before rendering
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log("🔄 Auth store rehydrated:", {
            isAuthenticated: state.isAuthenticated,
            hasUser: !!state.user,
            hasToken: !!state.token,
          });
        }
      },
    }
  )
);
