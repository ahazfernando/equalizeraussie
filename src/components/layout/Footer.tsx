import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand */}
          <div className="space-y-4 lg:max-w-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-bold text-xl">E</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-tight">
                  Equalizer RV
                </span>
                <span className="text-xs text-primary-foreground/60 leading-tight">
                  Australian Caravans
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Proudly Australian designed and engineered caravans, built for 
              adventure and crafted for comfort.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links, Support, and Contact grouped together */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-16">
            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
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
                        className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
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
              <h4 className="font-heading font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                {["Parts & Service", "Owner Resources", "FAQ", "Contact Us"].map((item) => (
                  <li key={item}>
                    <Link
                      href="/contact"
                      className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/70 text-sm">
                    123 Caravan Way<br />
                    Melbourne, VIC 3000<br />
                    Australia
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <a href="tel:1300000000" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                    1300 000 000
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <a href="mailto:hello@equalizerrv.com.au" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
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
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} Equalizer RV. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-primary-foreground/50 hover:text-accent transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-foreground/50 hover:text-accent transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
