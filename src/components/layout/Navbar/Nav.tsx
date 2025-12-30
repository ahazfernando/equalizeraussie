"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
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
import { Button } from "@/components/ui/button";
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
          logo: "/header/cruzerlogo.png",
          heroImage: "/caravan/CruzerCaravan.png",
          description: "Experience ultimate luxury and comfort on the open road with our flagship Cruzer series.",
        },
        {
          name: "Rebel",
          href: "/models/rebel",
          logo: "/header/rebelloogo.png",
          heroImage: "/caravan/RebelCaravan.png",
          description: "Built for the bold. The Rebel is designed for off-road adventures and rugged terrains.",
        },
        {
          name: "Rogue",
          href: "/models/rogue",
          logo: "/header/rogurelogo.png",
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
        { name: "Sale", href: "/sale", icon: Tag, description: "Special offers & deals" },
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
        { name: "Manuals", href: "/manuals", icon: Book, description: "Download manuals" },
        { name: "FAQ", href: "/faqs", icon: HelpCircle, description: "Common questions" },
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
        { name: "Great Aussie Lifestyle", href: "/lifestyle", icon: Sparkles, description: "The caravan life" },
        { name: "Blog", href: "/blog", icon: BookOpen, description: "Latest insights & tips" },
        { name: "Reviews", href: "/reviews", icon: Building2, description: "Tour our facility" },
      ],
      description: "Discover more about Great Aussie Caravans.",
    },
  },
];

interface NavProps {
  openNav: () => void;
}

export function Nav({ openNav }: NavProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const checkActive = (item: any) => {
    if (item.href && item.href !== "/") return pathname.startsWith(item.href);
    if (item.href === "/" && pathname === "/") return true;
    if (item.hasSubmenu && item.submenu) {
      return item.submenu.categories.some((cat: any) => pathname.startsWith(cat.href));
    }
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4" aria-label="Global">
        <div className="flex items-center justify-between py-4">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                src="/mainlogo/EqualizerRVLogo.png"
                alt="Equalizer RV"
                width={200}
                height={70}
                className="h-12 w-50 object-contain"
                priority
              />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button onClick={openNav} className="p-2.5 text-foreground">
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => {
              const active = checkActive(item);

              if (item.hasSubmenu && item.submenu) {
                const isModels = item.name === "Our Models";

                return (
                  <DropdownMenu key={item.name} onOpenChange={(open) => setOpenDropdown(open ? item.name : null)}>
                    <DropdownMenuTrigger
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium outline-none",
                        active ? "text-accent" : "text-foreground hover:text-accent"
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", openDropdown === item.name && "rotate-180")} />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="start"
                      sideOffset={20}
                      className={cn(
                        "w-screen bg-background border-t-2 border-border shadow-2xl rounded-b-2xl overflow-hidden p-0 mx-auto",
                        isModels ? "min-h-[60vh]" : ""
                      )}
                    >
                      {isModels ? (
                        <div className="flex h-full flex-col md:flex-row">
                          <div className="w-full md:w-1/4 border-r border-accent/50 bg-background p-8">
                            <div className="flex items-center justify-between p-4 bg-accent/10 text-accent rounded-xl mb-4">
                              <span className="font-semibold text-accent">Caravan Models</span>
                              <ChevronRight className="h-5 w-5" />
                            </div>
                          </div>

                          <div className="flex-1 overflow-y-auto p-5">
                            <div className="grid grid-cols-1 gap-3">
                              {item.submenu.categories.map((category) => (
                                <div
                                  key={category.name}
                                  className="group grid grid-cols-1 md:grid-cols-9 gap-1 items-center border-b border-accent/40 pb-5 last:border-0 last:pb-0" 
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

                                  <div className="md:col-span-5 flex flex-col justify-center space-y-8">
                                    <div>
                                      <h3 className="text-2xl text-foreground font-bold mb-3">{category.name}</h3>
                                      <p className="text-muted-foreground leading-relaxed">
                                        {category.description}
                                      </p>
                                    </div>
                                    <Button asChild className="w-fit bg-accent text-foreground hover:bg-accent/90 rounded-full px-6">
                                      <Link href={category.href} onClick={() => setOpenDropdown(null)}>
                                        Discover More <ArrowRight className="ml-2 h-4 w-4" />
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="container mx-auto px-8 py-8">
                          <div className="grid grid-cols-4 gap-8">
                            <div className="col-span-3 grid grid-cols-2 gap-4">
                              {item.submenu.categories.map((category) => {
                                const Icon = category.icon;
                                return (
                                  <Link
                                    key={category.name}
                                    href={category.href || "#"}
                                    className="group flex items-start gap-4 p-4 rounded-xl border border-transparent hover:bg-accent/10 hover:border-accent/20 transition-all"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
                                      {Icon && <Icon className="h-5 w-5 text-accent" />}
                                    </div>
                                    <div>
                                      <div className="font-semibold text-foreground group-hover:text-accent">{category.name}</div>
                                      <div className="text-sm text-muted-foreground">{category.description}</div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                            <div className="col-span-1 bg-accent/10 rounded-2xl p-6 border border-accent/20 flex flex-col justify-between">
                              <div>
                                <h3 className="font-bold text-xl text-foreground mb-3">{item.name}</h3>
                                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{item.submenu.description}</p>
                              </div>
                              <Link href={item.href || "#"} className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:gap-3 transition-all">
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
                    "text-sm font-medium transition-colors hover:text-accent",
                    active ? "text-accent" : "text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-foreground rounded-full px-8" asChild>
              <Link href="/contact">Contact Now</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}