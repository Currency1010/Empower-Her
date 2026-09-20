import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image src={logo} alt="" width={90} height={90} className="bg-white rounded-full" />
              <span className="text-xl font-heading font-bold text-primary-foreground tracking-tight drop-shadow-sm">Educate. Empower. Elevate.</span>
            </Link>

            <div className="flex gap-4 pt-2">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={`Visit our ${Icon.displayName ?? "social"} page`}
                  title={`Visit our ${Icon.displayName ?? "social"} page`}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}

              <a
                href="https://wa.me/message/YEV5KCHIPRSBE1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.52 3.48A11.8 11.8 0 0012 0C5.373 0 .03 5.343.03 12c0 2.116.547 4.192 1.586 6.021L0 24l6.234-1.595A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12 0-3.206-1.253-6.218-3.48-8.52zM12 21.6c-1.191 0-2.357-.32-3.362-.92l-.242-.14-3.337.855.9-3.244-.157-.266A8.184 8.184 0 013.6 12c0-4.704 3.816-8.52 8.52-8.52 2.276 0 4.413.886 6.022 2.495A8.466 8.466 0 0120.52 12c0 4.704-3.816 8.52-8.52 8.52zM17.01 14.22c-.264-.132-1.56-.768-1.8-.856-.241-.088-.417-.132-.593.132-.176.264-.684.856-.838 1.032-.155.176-.31.198-.574.066-.264-.132-1.116-.412-2.125-1.314-.786-.704-1.317-1.574-1.472-1.838-.155-.264-.016-.407.116-.539.12-.12.264-.31.396-.465.132-.155.176-.264.264-.44.088-.176.044-.33-.022-.462-.066-.132-.593-1.432-.812-1.966-.214-.51-.431-.444-.593-.452l-.506-.009c-.176 0-.462.066-.704.33-.242.264-.924.903-.924 2.2 0 1.296.947 2.553 1.08 2.73.132.176 1.872 2.96 4.533 4.15 3.162 1.366 3.162.911 3.732.855.57-.055 1.86-.758 2.12-1.492.264-.734.264-1.362.184-1.492-.079-.132-.29-.198-.554-.33z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Gallery", path: "/gallery" },
                { label: "News", path: "/news" },
                { label: "Get in touch", path: "/donate" },
                { label: "Donate Now", path: "https://paystack.shop/pay/ehyi-donation" },
              ].map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="block text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          {/* <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">Our Mission</h4>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              To empower women and youth with the knowledge, skills, and opportunities to lead, excel, and create sustainable growth in their communities.
            </p>
            <h4 className="font-heading font-semibold text-lg pt-2">Our Vision</h4>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              To inspire and build a generation of self-reliant women and youth transforming communities through innovation, leadership, and positive social change.
            </p>
          </div> */}

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-secondary" />
                <span className="text-sm text-primary-foreground/70">
                  EDAD Plaza 1st Avenue Gwarinpa FCT Abuja, Nigeria
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-secondary" />
                <span className="text-sm text-primary-foreground/70">
                  +234 703 333 1623
                  <br />
                  +234 805 208 0870
                  <br />
                  +234 802 377 7677
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-secondary" />
                <span className="text-sm text-primary-foreground/70">empowerheryouthriseinitiative@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2026 Empower Her and Youthrise Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
