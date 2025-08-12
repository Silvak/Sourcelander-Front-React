"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { ChevronRight, User, LogOut } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { useAuthStore } from "@/store/auth/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CartButton from "@/components/cart/CartButton";

// Tipos para la navegación
interface NavigationItem {
  name: string;
  href: string;
  submenu?: NavigationItem[];
  primary?: boolean;
}

// Configuración de navegación
const navigationConfig: {
  mainMenu: NavigationItem[];
  authMenu: NavigationItem[];
} = {
  mainMenu: [
    //{
    //  name: "Home",
    //  href: "/",
    //},
    {
      name: "Freelancers",
      href: "/freelancer",
    },
    {
      name: "Top Talent",
      href: "/talent/management",
      submenu: [
        {
          name: "Management",
          href: "/talent/management",
        },
      ],
    },
    {
      name: "Contact",
      href: "/contact",
      submenu: [
        {
          name: "Support",
          href: "/contact/support",
        },
      ],
    },
  ],
  authMenu: [
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Log in",
      href: "/auth/login",
    },
    {
      name: "Sign up",
      href: "/auth/signup",
      primary: true,
    },
  ],
};

export default function Navbar() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenSubmenus({});
  };

  const toggleSubmenu = (menuName: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Asegurar que el overflow esté correcto al montar el componente
  useEffect(() => {
    // Reset del overflow al montar
    document.body.style.overflow = "";

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <header className="bg-[#FBFBFC] w-full px-4 sm:px-8 md:px-12 border-b h-[75px] sticky relative top-0 left-0 right-0 z-50">
      <div className="bg-white border-x max-w-[900px] xl:max-w-[1120px] mx-auto h-full px-4 sm:px-8 grid grid-cols-2 items-center gap-4  pl-4">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="cursor-pointer outline-none"
              prefetch={true}
              passHref
            >
              <Image
                src="/logo.png"
                alt="logo"
                width={170}
                height={70}
                style={{ height: "auto" }}
                priority
              />
            </Link>
          </div>
        </div>

        {/* menú */}
        <div className="flex items-center justify-end">
          <div className="hidden lg:block">
            <ul className="flex items-center gap-2 mr-8">
              {navigationConfig.mainMenu.map((item) => (
                <li key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="text-nowrap flex items-center h-[40px] text-sm px-4 py-2 border border-transparent hover:border-gray-200 cursor-pointer transition-all duration-100 ease-in-out"
                  >
                    {item.name}
                  </Link>

                  {/* Submenú desktop */}
                  {item.submenu && (
                    <div className="absolute top-[53px] left-0 mt-1 w-48 bg-white border-t border-x border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <ul className="">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name} className="relative group/sub">
                            <Link
                              href={subItem.href}
                              className="flex items-center border-b h-[60px] justify-between p-4 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              {subItem.name}
                              {subItem.submenu ? (
                                <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover/sub:rotate-90" />
                              ) : (
                                <span className="ml-1 h-3 w-3"></span>
                              )}
                            </Link>

                            {/* Submenú anidado desktop */}
                            {subItem.submenu && (
                              <div className="absolute left-full top-0 ml-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
                                <ul className="py-2">
                                  {subItem.submenu.map((nestedItem) => (
                                    <li key={nestedItem.name}>
                                      <Link
                                        href={nestedItem.href}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                      >
                                        {nestedItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex">
            {isAuthenticated && user ? (
              // User is authenticated - show user menu
              <div className="flex items-center space-x-4">
                <CartButton />

                <Link href="/contact">
                  <Button variant="outline" className="h-[40px]">
                    Contact
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-[40px] px-3 flex items-center space-x-2"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="" alt={user.username} />
                        <AvatarFallback className="text-xs">
                          {getInitials(user.username)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {user.username}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 p-0">
                    <DropdownMenuItem asChild className="border-b h-[56px]">
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className=" h-[56px] text-red-600"
                    >
                      <LogOut className="mr-2 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              // User is not authenticated - show auth buttons
              navigationConfig.authMenu.map((item, index) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={item.primary ? "default" : "outline"}
                    className={`h-[40px] ${
                      index === 0
                        ? "rounded-l-md"
                        : index === navigationConfig.authMenu.length - 1
                        ? "rounded-r-md"
                        : "rounded-none"
                    } ${index > 0 ? "-ml-px" : ""} relative z-10 hover:z-30 ${
                      item.primary ? "border border-primary" : ""
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))
            )}
          </div>

          {/* mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <CartButton />
            <Button
              variant="outline"
              className="h-[40px] p-2 min-w-[40px] hover:border-black"
              onClick={toggleMobileMenu}
            >
              <div className="flex flex-col justify-center items-center w-5 h-5 space-y-1">
                <span
                  className={`block w-4 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out transform origin-center ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-4 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? "opacity-0 scale-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-4 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out transform origin-center ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        openSubmenus={openSubmenus}
        onToggleSubmenu={toggleSubmenu}
        mainMenu={navigationConfig.mainMenu}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
}
