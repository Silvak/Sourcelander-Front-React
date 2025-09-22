import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BiWorld } from "react-icons/bi";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <>
      <section className="w-full px-4 sm:px-8 md:px-12 h-min border-y -mt-[1px] ">
        <div
          className={cn(
            "relative border-x max-w-[900px] xl:max-w-[1120px] mx-auto min-h-[400px] px-4 sm:px-8 flex flex-col gap-8 md:gap-8 py-4 md:py-8 pl-4",
            className
          )}
        >
          {/* Top Row - Logo and Social Media */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-2">
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
            <div className="flex">
              <Link
                href="https://www.facebook.com/people/Sourcelander/61557886704554/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-[40px] rounded-l-md -mr-px relative z-10 hover:z-30 border border-gray-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Button>
              </Link>
              <Link
                href="https://www.linkedin.com/company/source-lander/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-[40px] rounded-r-md relative z-10 hover:z-30 border border-gray-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Content - Navigation, Company Info, Policies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Navigation</h3>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/freelancer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Freelancers
                </Link>
                <Link
                  href="/contact"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Solutions
                </Link>
              </div>
            </div>

            {/* Company Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Company Info</h3>
              <div className="space-y-2">
                <Link
                  href="/contact"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/contact"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </div>
            </div>

            {/* Policies */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Policies</h3>
              <div className="space-y-2">
                <Link
                  href="/policies/privacy"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/policies/cookies"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookies Policy
                </Link>
                <Link
                  href="/policies/terms"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Supported By Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 ">
            <div>
              <h3 className="font-semibold text-lg mb-2">Supported by</h3>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <Link
                  href="https://sinergy-alliance.com/"
                  className="cursor-pointer outline-none"
                  prefetch={true}
                  passHref
                >
                  <Image
                    src="/logoSinergy.png"
                    alt="logo"
                    width={80}
                    height={70}
                    style={{ height: "auto" }}
                    priority
                    className="ml-4"
                  />
                </Link>

                <Link
                  href="https://www.koolinart.com"
                  className="cursor-pointer outline-none"
                  prefetch={true}
                  passHref
                >
                  <Image
                    src="/koolinartlogo.svg"
                    alt="logo"
                    width={120}
                    height={70}
                    style={{ height: "auto" }}
                    priority
                    className="ml-4"
                  />
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg text-muted-foreground">
                  <BiWorld />
                </span>
              </div>
              <span className="text-muted-foreground">Global Partners</span>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-8 md:px-12 h-min ">
        <div
          className={cn(
            "relative border-x text-sm text-gray-400 max-w-[900px] xl:max-w-[1120px] mx-auto min-h-[52px] px-4 sm:px-8 flex flex-wrap items-center justify-between gap-1 md:gap-4 py-4",
            className
          )}
        >
          <p>© {new Date().getFullYear()} Sourcelander. All rights reserved</p>
          <p>Sourcelander is a registered trademark.</p>
        </div>
      </section>
    </>
  );
}
