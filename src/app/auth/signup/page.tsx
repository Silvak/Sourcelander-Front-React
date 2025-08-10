"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Mail,
  User,
  Lock,
  ArrowRight,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/authStore";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading, error, clearError } =
    useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile");
    }
  }, [isAuthenticated, router]);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Show error toast when there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate passwords when either field is modified
    if (name === "password" || name === "confirmPassword") {
      validatePasswords(
        name === "password" ? value : formData.password,
        name === "confirmPassword" ? value : formData.confirmPassword
      );
    }
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        setPasswordsMatch(true);
        setPasswordError("");
      } else {
        setPasswordsMatch(false);
        setPasswordError("Passwords do not match");
      }
    } else {
      setPasswordsMatch(null);
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that all fields are complete
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setPasswordError("Please complete all fields");
      return;
    }

    // Validate that passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Validate minimum password length
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    // Clear any previous errors
    setPasswordError("");

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created successfully!");
      router.push("/profile");
    } catch (error) {
      // Error is handled by the store and shown via toast
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FBFBFC]">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <Link
                href="/"
                className="cursor-pointer outline-none"
                prefetch={true}
                passHref
              >
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={220}
                  height={120}
                  style={{ height: "auto" }}
                  priority
                />
              </Link>
            </div>
            <p className="text-gray-600 text-lg">Create your account</p>
          </div>

          {/* Registration form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-12 h-12 text-base border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-12 h-12 text-base border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-12 h-12 text-base border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`pl-12 h-12 text-base border focus:ring-2 focus:ring-primary/20 ${
                    passwordsMatch === true
                      ? "border-green-500 focus:border-green-500"
                      : passwordsMatch === false
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-primary"
                  }`}
                  required
                  disabled={isLoading}
                />
                {passwordsMatch !== null && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {passwordsMatch ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {passwordError && (
                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
              )}
              {passwordsMatch === true && (
                <p className="text-sm text-green-500 mt-1">Passwords match</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-white transition-all duration-150 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Help links */}
          <div className="text-center space-y-3 pt-4 border-t border-gray-200">
            <Link
              href="/auth/login"
              className="block text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Already have an account? Sign in here
            </Link>
            <Link
              href="/contact"
              className="block text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Need help? Contact support
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Promotional message */}
      <div className="hidden lg:flex lg:w-1/2 justify-center relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')",
            filter: "contrast(1.2) brightness(0.85) saturate(1.3)",
          }}
        />
        {/* Film grain noise overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='filmGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23filmGrain)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Additional grain layer */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grainFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.3 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grainFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-16">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg mb-6">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-white">
            Join our community
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-md leading-relaxed">
            Connect with the best freelancers and verified professionals
          </p>
          <div className="flex items-center space-x-3 mb-8">
            <span className="text-white/80 text-sm">
              +10,000 users trust us
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
