import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sourcelander - Autenticación",
  description: "Inicia sesión o regístrate en Sourcelander",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
