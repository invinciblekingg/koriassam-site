"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Private Dining",
    description:
      "Intimate spaces designed for special moments—from corporate gatherings to family celebrations.",
    number: "01",
  },
  {
    title: "Chef's Table",
    description:
      "An exclusive culinary journey with personalized courses prepared before your eyes.",
    number: "02",
  },
  {
    title: "Korean BBQ",
    description:
      "Interactive tableside grilling with premium cuts and traditional accompaniments.",
    number: "03",
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax reveal
      const imageTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      imageTl
        .from(imageRef.current, {
          clipPath: "inset(0% 100% 0% 0%)",
          duration: 1.5,
          ease: "power4.inOut",
        })
        .from(
          imageRef.current?.querySelector("img"),
          {
            scale: 1.3,
            duration: 2,
            ease: "power3.out",
          },
          "-=1"
        );

      // Content animation
      gsap.from(contentRef.current?.children || [], {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Progress bar animation
      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-cycle through experiences
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % experiences.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden bg-background"
    >
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* Left - Image */}
        <div
          ref={imageRef}
          className="relative h-[50vh] overflow-hidden lg:h-auto"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          <Image
            src="/images/restaurant-ambiance.jpg"
            alt="Restaurant ambiance"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />

          {/* Floating label */}
          <div className="absolute bottom-8 left-8 z-10">
            <span className="bg-primary px-4 py-2 text-xs tracking-widest text-primary-foreground">
              SINCE 2018
            </span>
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex flex-col justify-center px-6 py-20 lg:px-16 lg:py-32">
          <div ref={contentRef}>
            {/* Header */}
            <div className="mb-12">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-sm tracking-[0.3em] text-primary">
                  THE EXPERIENCE
                </span>
              </div>
              <h2 className="text-4xl font-light leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                More Than a Meal,
                <br />
                <span className="text-primary">A Memory</span>
              </h2>
            </div>

            {/* Experience Items */}
            <div className="space-y-0">
              {experiences.map((exp, index) => (
                <ExperienceItem
                  key={exp.title}
                  {...exp}
                  index={index}
                  isActive={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>

            {/* Progress indicator */}
            <div className="mt-12 flex items-center gap-3">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-1 w-12 overflow-hidden rounded-full transition-all ${
                    index === activeIndex ? "bg-primary/30" : "bg-border"
                  }`}
                >
                  {index === activeIndex && (
                    <span className="absolute inset-0 origin-left animate-[progress_4s_linear] bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for progress animation */}
      <style jsx>{`
        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
}

function ExperienceItem({
  title,
  description,
  number,
  index,
  isActive,
  onClick,
}: {
  title: string;
  description: string;
  number: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.4 + index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [index]);

  // Animate content visibility
  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isActive ? "auto" : 0,
        opacity: isActive ? 1 : 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [isActive]);

  return (
    <div
      ref={itemRef}
      onClick={onClick}
      className={`group cursor-pointer border-t border-border py-6 transition-all ${
        isActive ? "border-primary" : "hover:border-primary/50"
      }`}
      data-cursor="pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-6">
          <span
            className={`text-sm transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {number}
          </span>
          <h3
            className={`text-xl font-light tracking-wide transition-colors md:text-2xl ${
              isActive
                ? "text-foreground"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          >
            {title}
          </h3>
        </div>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
            isActive
              ? "border-primary bg-primary"
              : "border-border group-hover:border-primary"
          }`}
        >
          <span
            className={`text-lg transition-all ${
              isActive
                ? "rotate-45 text-primary-foreground"
                : "text-muted-foreground group-hover:text-primary"
            }`}
          >
            +
          </span>
        </div>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="ml-12 mt-4 max-w-md text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
