"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Grid3x3,
  Store,
  Tag,
  FileText,
  Download,
  Shield,
  MessageSquare,
  Book,
  HelpCircle,
  Sparkles,
  BookOpen,
  Building2,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", hasSubmenu: false },
  { name: "About Us", href: "/about", hasSubmenu: false },
  {
    name: "Our Models",
    hasSubmenu: true,
    submenu: {
      categories: [
        {
          name: "Cruzer",
          href: "/models/cruzer",
          logo: "/newlogos/Cruzer_New.png",
          heroImage: "/caravan/CruzerCaravan.png",
          description: "Experience ultimate luxury and comfort on the open road with our flagship Cruzer series.",
        },
        {
          name: "Rebel",
          href: "/models/rebel",
          logo: "/newlogos/Rebel_New.png",
          heroImage: "/caravan/RebelCaravan.png",
          description: "Built for the bold. The Rebel is designed for off-road adventures and rugged terrains.",
        },
        {
          name: "Rogue",
          href: "/models/rogue",
          logo: "/newlogos/Rogue_New.png",
          heroImage: "/caravan/RogueCaravan.png",
          description: "Versatile, compact, and ready for anything. The Rogue is your perfect travel companion.",
        },
      ],
    },
  },
  {
    name: "Buy",
    href: "/caravans",
    hasSubmenu: true,
    submenu: {
      categories: [
        { name: "Dealers", href: "/dealers", icon: Store, description: "Find a dealer near you" },
        // { name: "Sale", href: "/sale", icon: Tag, description: "Special offers & deals" },
        { name: "Get a Quote", href: "/quote", icon: FileText, description: "Request pricing information" },
        { name: "Request a Brochure", href: "/brochure", icon: Download, description: "Download our catalog" },
      ],
      description: "Find the perfect caravan for your Australian adventure.",
    },
  },
  {
    name: "Support and Services",
    href: "/faqs",
    hasSubmenu: true,
    submenu: {
      categories: [
        { name: "Warranty Information", href: "/warranty", icon: Shield, description: "Comprehensive coverage" },
        { name: "Contact Support", href: "/contact", icon: MessageSquare, description: "Get in touch" },
        // { name: "Manuals", href: "/manuals", icon: Book, description: "Download manuals" },
        // { name: "FAQ", href: "/faqs", icon: HelpCircle, description: "Common questions" },
      ],
      description: "We're here to support you every step of the way.",
    },
  },
  {
    name: "Explore",
    href: "/blog",
    hasSubmenu: true,
    submenu: {
      categories: [

        { name: "Blog", href: "/blog", icon: BookOpen, description: "Latest insights & tips" },
        // { name: "Reviews", href: "/reviews", icon: Building2, description: "Tour our facility" },
      ],
      description: "Discover more about Great Aussie Caravans.",
    },
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const checkActive = (item: typeof navigation[0]) => {
    if (item.href && item.href !== "/") {
      if (pathname.startsWith(item.href)) return true;
    }
    if (item.href === "/" && pathname === "/") return true;
    if (item.hasSubmenu && item.submenu) {
      return item.submenu.categories.some((cat) => pathname.startsWith(cat.href));
    }
    return false;
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[98%] max-w-[1400px]">
      <div className="bg-white/95 backdrop-blur-xl rounded-full border border-gray-200 shadow-lg px-1 md:px-2">
        <div className="flex items-center h-16 relative">
          {/* Logo - Left Section */}
          <div className="flex-1 flex items-center pl-4 md:pl-6">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image
                src="/newlogos/EqualizerBlackLogo 1.png"
                alt="Equalizer RV"
                width={300}
                height={100}
                className="h-6 md:h-8 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Pill Style - Centered */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100/50 rounded-full p-1 absolute left-[65%] -translate-x-1/2">
            {navigation.map((item) => {
              const active = checkActive(item);

              if (item.hasSubmenu && item.submenu) {
                const isModels = item.name === "Our Models";

                return (
                  <DropdownMenu
                    key={item.name}
                    onOpenChange={(open) => setOpenDropdown(open ? item.name : null)}
                  >
                    <DropdownMenuTrigger
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 outline-none whitespace-nowrap",
                        active
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openDropdown === item.name && "rotate-180"
                        )}
                      />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="start"
                      sideOffset={20}
                      className={cn(
                        "w-screen bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden p-0 mx-auto",
                        isModels ? "min-h-[60vh]" : ""
                      )}
                    >
                      {isModels ? (
                        <div className="flex h-full flex-col md:flex-row">
                          <div className="w-full md:w-1/4 border-r border-gray-200 bg-gray-50 p-8">
                            <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-xl mb-4">
                              <span className="font-semibold">Caravan Models</span>
                              <ChevronRight className="h-5 w-5" />
                            </div>
                            <div className="relative w-full max-w-md h-[500px] rounded-3xl overflow-hidden group">
                              {/* Background Image */}
                              <Image
                                src="/header/nighttie.jpg"
                                alt="Construction"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />

                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                              {/* Content */}
                              <div className="absolute bottom-0 left-0 right-0 p-8 pb-10">
                                <h2 className="text-2xl md:text-3xl font-black italic text-white leading-tight mb-4 tracking-wider">
                                  Unwind, Build, and Perfect Your Journey
                                </h2>

                                <p className="text-white/70 text-base mb-8">
                                  A construction experience unlike any other. Where strength meets precision in every weld.
                                </p>

                                <Link href="/dealers">
                                  <button className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
                                    Discover
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 overflow-y-auto p-5">
                            <div className="grid grid-cols-1 gap-3">
                              {item.submenu.categories.map((category) => (
                                <div
                                  key={category.name}
                                  className="group grid grid-cols-1 md:grid-cols-9 gap-1 items-center border-b border-gray-200 pb-5 last:border-0 last:pb-0"
                                >
                                  <div className="md:col-span-3">
                                    <Image
                                      src={category.logo}
                                      alt={category.name}
                                      width={120}
                                      height={60}
                                      className="object-contain h-12 w-24"
                                    />
                                    <div className="relative w-60 aspect-[16/9] overflow-hidden rounded-2xl">
                                      <Image
                                        src={category.heroImage}
                                        alt={category.name}
                                        fill
                                        className="object-contain transition-transform duration-700 group-hover:scale-105"
                                      />
                                    </div>
                                  </div>

                                  <div className="md:col-span-5 flex flex-col justify-center space-y-4">
                                    <div>
                                      <h3 className="text-2xl text-gray-900 font-bold mb-3 tracking-wider">
                                        {category.name}
                                      </h3>
                                      <p className="text-gray-600 leading-relaxed">
                                        {category.description}
                                      </p>
                                    </div>
                                    <Link
                                      href={category.href}
                                      onClick={() => setOpenDropdown(null)}
                                      className="w-fit bg-gray-900 text-white hover:bg-gray-800 rounded-full px-6 py-2 text-sm font-medium inline-flex items-center gap-2"
                                    >
                                      Discover More <ArrowRight className="h-4 w-4" />
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="container mx-auto px-8 py-8">
                          <div className="flex gap-12 items-stretch">
                            {item.name !== "Explore" && (
                              <div className={cn("grid gap-4 w-full", item.name === "Support and Services" ? "grid-cols-1 max-w-3xl" : "grid-cols-2 max-w-3xl")}>
                                {item.submenu.categories.map((category) => {
                                  const Icon = category.icon;
                                  return (
                                    <Link
                                      key={category.name}
                                      href={category.href || "#"}
                                      className="group flex items-start gap-4 p-4 rounded-xl border border-transparent hover:bg-gray-50 hover:border-gray-200 transition-all"
                                      onClick={() => setOpenDropdown(null)}
                                    >
                                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100">
                                        {Icon && <Icon className="h-5 w-5 text-gray-900" />}
                                      </div>
                                      <div>
                                        <div className="font-semibold text-gray-900 group-hover:text-gray-900">
                                          {category.name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                          {category.description}
                                        </div>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                            {item.name === "Explore" && (
                              <Link
                                href="/blog"
                                onClick={() => setOpenDropdown(null)}
                                className="flex-1 min-w-0 relative rounded-2xl overflow-hidden group"
                              >
                                <div className="absolute inset-0 z-0">
                                  <Image
                                    src="/mainlogo/Image_fx-5.png"
                                    alt=""
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-black/50" />
                                </div>
                                <div className="relative z-10 h-full min-h-[140px] flex flex-col justify-end p-6">
                                  <h3 className="font-heading text-4xl md:text-5xl font-normal text-white mb-2 tracking-wider uppercase">
                                    Blog
                                  </h3>
                                  <p className="text-sm text-white/90 mb-3">
                                    Latest insights & tips for your next adventure.
                                  </p>
                                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                                    Explore blog <ArrowRight className="h-4 w-4" />
                                  </span>
                                </div>
                              </Link>
                            )}
                            <div className="w-80 bg-gray-50 rounded-2xl p-5 border border-gray-200 flex flex-col gap-4 h-fit self-start shrink-0">
                              <div>
                                <h3 className="font-bold text-xl text-gray-900 mb-3">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {item.submenu.description}
                                </p>
                              </div>
                              <Link
                                href={item.href || "#"}
                                className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:gap-3 transition-all"
                              >
                                View All <ArrowRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href || "#"}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    active
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Button - Right Section */}
          <div className="flex-1 flex items-center justify-end pr-4 md:pr-6">
            <Link
              href="/contact"
              className="hidden md:block bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-900"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navigation.map((item) => {
                const active = checkActive(item);

                if (item.hasSubmenu && item.submenu) {
                  return (
                    <div key={item.name} className="space-y-2">
                      <button
                        onClick={() =>
                          setMobileOpenDropdown(
                            mobileOpenDropdown === item.name ? null : item.name
                          )
                        }
                        className={cn(
                          "flex w-full justify-between items-center py-3 px-4 rounded-xl text-base font-medium transition-colors",
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform",
                            mobileOpenDropdown === item.name && "rotate-180"
                          )}
                        />
                      </button>
                      {mobileOpenDropdown === item.name && (
                        <div className="pl-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                          {item.submenu.categories.map((cat) => (
                            <Link
                              key={cat.name}
                              href={cat.href || "#"}
                              className={cn(
                                "block py-2 px-4 rounded-lg text-sm",
                                pathname.startsWith(cat.href)
                                  ? "bg-gray-100 text-gray-900 font-medium"
                                  : "text-gray-600 hover:bg-gray-50"
                              )}
                              onClick={() => {
                                setIsOpen(false);
                                setMobileOpenDropdown(null);
                              }}
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block py-3 px-4 rounded-xl text-base font-medium transition-colors",
                      active
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block bg-gray-900 text-white text-center py-3 px-4 rounded-xl font-medium mt-4"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
