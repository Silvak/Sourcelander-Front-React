"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronRight, User, LogOut, Settings } from "lucide-react";
import { User as UserType } from "@/store/auth/authStore";

// Tipos para la navegación
interface NavigationItem {
  name: string;
  href: string;
  submenu?: NavigationItem[];
  primary?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  openSubmenus: { [key: string]: boolean };
  onToggleSubmenu: (menuName: string) => void;
  mainMenu: NavigationItem[];
  isAuthenticated?: boolean;
  user?: UserType | null;
  onLogout?: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  openSubmenus,
  onToggleSubmenu,
  mainMenu,
  isAuthenticated = false,
  user,
  onLogout,
}: MobileMenuProps) {
  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    onClose();
  };

  return (
    <div
      className={`lg:hidden absolute top-[75px] left-0 w-full h-[calc(100vh-75px)] z-10 bg-[#FBFBFC]/80 backdrop-blur-sm px-4 sm:px-8 md:px-12 border-b transition-all duration-300 ease-in-out transform ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex flex-col justify-between border-x max-w-[1120px] mx-auto h-full gap-4">
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex flex-col">
            <ul className="flex flex-col">
              {mainMenu.map((item) => (
                <li key={item.name} className="border-b bg-white">
                  {item.submenu ? (
                    <div>
                      <button
                        className="flex items-center justify-between p-4 w-full h-full hover:bg-gray-100 transition-colors"
                        onClick={() => onToggleSubmenu(item.name)}
                      >
                        <span>{item.name}</span>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            openSubmenus[item.name] ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {/* Submenú acordeón móvil */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openSubmenus[item.name] ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <ul className="bg-gray-50">
                          {item.submenu.map((subItem) => (
                            <li
                              key={subItem.name}
                              className="border-t border-gray-200"
                            >
                              {subItem.submenu ? (
                                <div>
                                  <button
                                    className="flex items-center justify-between p-4 pl-8 w-full h-full hover:bg-gray-100 transition-colors"
                                    onClick={() =>
                                      onToggleSubmenu(
                                        `${item.name}-${subItem.name}`
                                      )
                                    }
                                  >
                                    <span>{subItem.name}</span>
                                    <ChevronRight
                                      className={`h-4 w-4 transition-transform ${
                                        openSubmenus[
                                          `${item.name}-${subItem.name}`
                                        ]
                                          ? "rotate-90"
                                          : ""
                                      }`}
                                    />
                                  </button>

                                  {/* Submenú anidado acordeón móvil */}
                                  <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                      openSubmenus[
                                        `${item.name}-${subItem.name}`
                                      ]
                                        ? "max-h-96"
                                        : "max-h-0"
                                    }`}
                                  >
                                    <ul className="bg-gray-100">
                                      {subItem.submenu.map((nestedItem) => (
                                        <li
                                          key={nestedItem.name}
                                          className="border-b border-gray-200"
                                        >
                                          <Link
                                            href={nestedItem.href}
                                            className="flex p-4 pl-12 w-full h-full hover:bg-gray-200 transition-colors"
                                            onClick={onClose}
                                          >
                                            {nestedItem.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              ) : (
                                <Link
                                  href={subItem.href}
                                  className="flex p-4 pl-8 w-full h-full hover:bg-gray-100 transition-colors"
                                  onClick={onClose}
                                >
                                  {subItem.name}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex p-4 w-full h-full hover:bg-gray-100 transition-colors"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col w-full gap-4 px-4 sm:px-8 py-6 border-t bg-white">
          {isAuthenticated && user ? (
            // User is authenticated - show user info and logout
            <div className="space-y-4">
              {/* User Info */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt={user.username} />
                  <AvatarFallback className="text-sm">
                    {getInitials(user.username)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* User Actions */}
              <div className="space-y-2">
                <Link href="/profile" className="w-full" onClick={onClose}>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Link href="/profile" className="w-full" onClick={onClose}>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            // User is not authenticated - show auth buttons
            <div className="flex w-full gap-4">
              {/* Contact button */}
              <Link href="/contact" className="w-full" onClick={onClose}>
                <Button variant="outline" className="h-[40px] relative w-full">
                  Contact
                </Button>
              </Link>

              {/* Sign up button */}
              <Link href="/auth/signup" className="w-full" onClick={onClose}>
                <Button
                  variant="default"
                  className="h-[40px] relative w-full border border-primary"
                >
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
