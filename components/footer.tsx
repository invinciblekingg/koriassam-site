"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="bg-background px-6 py-16 lg:py-24"
    >
      <div ref={contentRef} className="mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="mb-16 grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="mb-6 block text-3xl font-light tracking-widest text-foreground"
            >
              {"KORI'S"}
            </Link>
            <p className="mb-6 text-muted-foreground">
              Where traditional Korean flavors meet contemporary dining elegance.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-sm tracking-widest text-foreground">
              EXPLORE
            </h4>
            <ul className="space-y-3">
              {["Our Story", "Menu", "Experience", "Private Events", "Gift Cards"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-sm tracking-widest text-foreground">
              CONTACT
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-primary" />
                <span className="text-muted-foreground">
                  123 Gastronomic Avenue
                  <br />
                  New York, NY 10012
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span className="text-muted-foreground">+1 (212) 555-0199</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span className="text-muted-foreground">hello@koris.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-6 text-sm tracking-widest text-foreground">
              HOURS
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-1 text-primary" />
                <div className="text-muted-foreground">
                  <p className="mb-1">Monday - Thursday</p>
                  <p className="text-foreground">5:00 PM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 pl-7">
                <div className="text-muted-foreground">
                  <p className="mb-1">Friday - Saturday</p>
                  <p className="text-foreground">5:00 PM - 11:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 pl-7">
                <div className="text-muted-foreground">
                  <p className="mb-1">Sunday</p>
                  <p className="text-foreground">4:00 PM - 9:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 {"Kori's"}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
