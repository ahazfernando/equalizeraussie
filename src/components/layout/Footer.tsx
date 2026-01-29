import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

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
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links, Support, and Contact grouped together */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-16">
            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold mb-4 tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                {["Build Your RV", "Finance Options", "Customer Reviews", "About Us", "Blog"].map((item) => {
                  // Handle special case for Blog link
                  const href = item === "Blog"
                    ? "/blog"
                    : `/${item.toLowerCase().replace(/\s+/g, "-")}`;

                  return (
                    <li key={item}>
                      <Link
                        href={href}
                        className="text-primary-foreground/90 hover:text-white transition-colors text-sm font-semibold"
                      >
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-heading font-semibold mb-4 tracking-wider">Support</h4>
              <ul className="space-y-3">
                {["Parts & Service", "Owner Resources", "FAQ", "Contact Us"].map((item) => (
                  <li key={item}>
                    <Link
                      href="/contact"
                      className="text-primary-foreground/90 hover:text-white transition-colors text-sm font-semibold"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-semibold mb-4 tracking-wider">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/90 text-sm font-semibold">
                    123 Caravan Way<br />
                    Melbourne, VIC 3000<br />
                    Australia
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white shrink-0" />
                  <a href="tel:1300000000" className="text-primary-foreground/90 hover:text-white transition-colors text-sm font-semibold">
                    1300 000 000
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white shrink-0" />
                  <a href="mailto:hello@equalizerrv.com.au" className="text-primary-foreground/90 hover:text-white transition-colors text-sm font-semibold">
                    hello@equalizerrv.com.au
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
