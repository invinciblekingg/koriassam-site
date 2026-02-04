"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Initial overlay reveal
      tl.from(overlayRef.current, {
        scaleY: 1.5,
        duration: 1.5,
        ease: "power4.inOut",
      })
        // Image zoom effect
        .from(
          imageRef.current,
          {
            scale: 1.3,
            duration: 2,
            ease: "power3.out",
          },
          "-=1.2"
        )
        // Title letter by letter reveal
        .from(
          titleCharsRef.current,
          {
            y: 120,
            rotateX: -90,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=1"
        )
        // Decorative line
        .from(
          decorRef.current,
          {
            scaleX: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        // Subtitle
        .from(
          subtitleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        // CTA buttons stagger
        .from(
          ctaRef.current?.children || [],
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5"
        )
        // Scroll indicator
        .from(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: -20,
            duration: 0.6,
          },
          "-=0.2"
        );

      // Continuous scroll indicator animation
      gsap.to(scrollIndicatorRef.current?.querySelector(".scroll-line"), {
        scaleY: 0,
        transformOrigin: "top",
        repeat: -1,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
      });

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleText = "kori's";

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with parallax */}
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-interior.jpg"
          alt="Kori's restaurant interior"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background"
      />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Decorative top element */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px w-8 bg-primary/50" />
          <span className="text-xs tracking-[0.4em] text-muted-foreground">
            KOREAN CUISINE
          </span>
          <div className="h-px w-8 bg-primary/50" />
        </div>

        {/* Main title with character animation */}
        <h1
          ref={titleRef}
          className="relative mb-4 overflow-hidden text-7xl font-light leading-none tracking-wider text-foreground md:text-9xl lg:text-[12rem]"
          style={{ perspective: "1000px" }}
        >
          {titleText.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) titleCharsRef.current[i] = el;
              }}
              className="inline-block"
              style={{ transformStyle: "preserve-3d" }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Decorative line under title */}
        <div
          ref={decorRef}
          className="mb-8 h-px w-24 origin-center bg-primary"
        />

        <p
          ref={subtitleRef}
          className="mb-12 max-w-xl text-base font-light leading-relaxed tracking-wide text-muted-foreground md:text-lg"
        >
          A modern celebration of Korean culinary heritage. Traditional flavors,
          reimagined for the contemporary palate.
        </p>

        <div ref={ctaRef} className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            href="#menu"
            className="group relative overflow-hidden border border-primary bg-primary px-10 py-4 text-sm tracking-widest text-primary-foreground transition-all"
          >
            <span className="relative z-10">EXPLORE MENU</span>
            <span className="absolute inset-0 -translate-x-full bg-background transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="absolute inset-0 z-[5] flex items-center justify-center text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              EXPLORE MENU
            </span>
          </Link>
          <Link
            href="#reservations"
            className="group relative overflow-hidden border border-foreground/30 bg-transparent px-10 py-4 text-sm tracking-widest text-foreground transition-all hover:border-foreground"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-background">
              RESERVE A TABLE
            </span>
            <span className="absolute inset-0 -translate-y-full bg-foreground transition-transform duration-500 ease-out group-hover:translate-y-0" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] text-muted-foreground">
          SCROLL
        </span>
        <div className="relative h-12 w-px overflow-hidden">
          <div className="scroll-line absolute inset-0 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col gap-3">
          <div className="h-16 w-px bg-border" />
          <span className="origin-center -rotate-90 whitespace-nowrap text-[10px] tracking-widest text-muted-foreground">
            EST. 2018
          </span>
        </div>
      </div>

      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col items-center gap-3">
          <span className="origin-center rotate-90 whitespace-nowrap text-[10px] tracking-widest text-muted-foreground">
            SEOUL INSPIRED
          </span>
          <div className="h-16 w-px bg-border" />
        </div>
      </div>
    </section>
  );
}
