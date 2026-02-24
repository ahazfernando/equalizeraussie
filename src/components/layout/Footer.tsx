import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand */}
          <div className="space-y-4 lg:max-w-xs">
            <div className="flex items-center gap-3">
              <Image
                src="/logo/whitelogoWQ.png"
                alt="Equalizer RV"
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
            <p className="text-primary-foreground/90 text-sm leading-relaxed font-semibold">
              Proudly Australian designed and engineered caravans, built for
              adventure and crafted for comfort.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links, Support, and Contact grouped together */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-16">
            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold mb-4 tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Cruzer", href: "/models/cruzer" },
                  { label: "Rebel", href: "/models/rebel" },
                  { label: "Rogue", href: "/models/rogue" },
                  { label: "About Us", href: "/about" },
                  { label: "Blog", href: "/blog" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-primary-foreground/90 hover:text-white transition-colors text-sm font-semibold"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-heading font-semibold mb-4 tracking-wider">Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/warranty"
                    className="text-primary-foreground/90 hover:text-white transition-colors text-sm font-semibold"
                  >
                    Warranty Information
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-primary-foreground/90 hover:text-white transition-colors text-sm font-semibold"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-semibold mb-4 tracking-wider">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/90 text-sm font-semibold">
                    Unit 5/220-230 Barry Rd<br />
                    Campbellfield VIC 3061<br />
                    Australia
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white shrink-0" />
                  <a href="tel:0391238370" className="text-primary-foreground/90 hover:text-white transition-colors text-sm font-semibold">
                    (03) 9123 8370
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white shrink-0" />
                  <a href="mailto:admin@eqializerrv.com.au" className="text-primary-foreground/90 hover:text-white transition-colors text-sm font-semibold">
                    admin@eqializerrv.com.au
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/70 text-sm font-semibold">
              © {new Date().getFullYear()} Equalizer RV. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-primary-foreground/70 hover:text-white transition-colors text-sm font-semibold">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-foreground/70 hover:text-white transition-colors text-sm font-semibold">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
