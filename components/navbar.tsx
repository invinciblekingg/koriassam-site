"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 });

      tl.from(logoRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        linksRef.current?.children || [],
        {
          y: -20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (menuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          menuRef.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.5,
            ease: "power3.out",
          }
        );
        gsap.from(menuRef.current.querySelectorAll("a"), {
          y: 30,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          delay: 0.2,
          ease: "power3.out",
        });
      }
    }
  }, [isOpen]);

  const navLinks = [
    { href: "#about", label: "Our Story" },
    { href: "#menu", label: "Menu" },
    { href: "#experience", label: "Experience" },
    { href: "#reservations", label: "Reservations" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-lg"
            : "bg-gradient-to-b from-background/50 to-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between lg:h-24">
            {/* Logo */}
            <Link
              ref={logoRef}
              href="/"
              className="group relative text-2xl font-light tracking-[0.3em] text-foreground lg:text-3xl"
            >
              <span className="relative">
                {"KORI'S"}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div
              ref={linksRef}
              className="hidden items-center gap-8 lg:flex xl:gap-12"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <Link
                href="#reservations"
                className="group relative ml-4 overflow-hidden border border-primary px-7 py-3 text-sm tracking-wider text-primary transition-all"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary-foreground">
                  Book a Table
                </span>
                <span className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-300 ease-out group-hover:translate-y-0" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label="Toggle menu"
            >
              <span
                className={`h-px w-6 bg-foreground transition-all duration-300 ${
                  isOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-foreground transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-foreground transition-all duration-300 ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Full Screen */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background lg:hidden"
          style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        >
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-light tracking-wider text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#reservations"
              onClick={() => setIsOpen(false)}
              className="mt-6 border border-primary bg-primary px-10 py-4 text-sm tracking-widest text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
            >
              BOOK A TABLE
            </Link>
          </div>

          {/* Contact info at bottom */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2 text-center">
            <span className="text-sm text-muted-foreground">
              123 Gangnam Street, Seoul District
            </span>
            <span className="text-sm text-primary">+1 (555) 123-4567</span>
          </div>
        </div>
      )}
    </>
  );
}
