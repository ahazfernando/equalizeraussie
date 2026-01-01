"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  // { label: "Our Caravans", href: "/caravans" },
  // { label: "Build Your RV", href: "/build" },
  { label: "Finance", href: "/finance" },
  { label: "Reviews", href: "/reviews" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const modelItems = [
  { label: "Cruzer", href: "/models/cruzer" },
  { label: "Rebel", href: "/models/rebel" },
  { label: "Rogue", href: "/models/rogue" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isModelPage = pathname?.startsWith("/models/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/mainlogo/EqualizerRV-1-2048x335.webp"
              alt="Equalizer RV"
              width={200}
              height={33}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`nav-link text-sm ${
                pathname === "/" ? "active text-foreground" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`nav-link text-sm ${
                pathname === "/about" ? "active text-foreground" : ""
              }`}
            >
              About
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className={`nav-link text-sm flex items-center gap-1 ${
                isModelPage ? "active text-foreground" : ""
              }`}>
                Models <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {modelItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className={pathname === item.href ? "bg-accent/10 text-accent" : ""}>
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {navItems.slice(2, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-sm ${
                  pathname === item.href ? "active text-foreground" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className="nav-link text-sm flex items-center gap-1">
                More <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {navItems.slice(6).map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Book a Viewing
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className={`px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/"
                    ? "bg-accent/10 text-accent font-medium"
                    : "hover:bg-secondary"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/about"
                    ? "bg-accent/10 text-accent font-medium"
                    : "hover:bg-secondary"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">Models</p>
                <div className="flex flex-col gap-1 ml-4">
                  {modelItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                        pathname === item.href
                          ? "bg-accent/10 text-accent font-medium"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              {navItems.slice(2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-accent/10 text-accent font-medium"
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 px-4 flex flex-col gap-2">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Book a Viewing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
