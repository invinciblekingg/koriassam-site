"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const items = [
  "AUTHENTIC KOREAN",
  "PREMIUM INGREDIENTS", 
  "TRADITIONAL RECIPES",
  "MODERN TECHNIQUES",
  "CRAFT COCKTAILS",
  "WARM HOSPITALITY",
  "SEOUL INSPIRED",
  "FARM TO TABLE",
];

export function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // First marquee - left to right
      gsap.to(contentRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "linear",
      });

      // Second marquee - right to left (reverse)
      gsap.fromTo(
        contentRef2.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          repeat: -1,
          duration: 30,
          ease: "linear",
        }
      );
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={marqueeRef}
      className="overflow-hidden bg-secondary py-8 lg:py-10"
    >
      {/* First row */}
      <div className="mb-4 flex">
        <div ref={contentRef} className="flex w-fit">
          {[...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center gap-8 px-6 lg:px-10">
              <span className="whitespace-nowrap text-base font-light tracking-[0.2em] text-muted-foreground lg:text-lg">
                {item}
              </span>
              <span className="text-xs text-primary">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Second row - reverse direction */}
      <div className="flex">
        <div ref={contentRef2} className="flex w-fit">
          {[...items, ...items].reverse().map((item, index) => (
            <div key={index} className="flex items-center gap-8 px-6 lg:px-10">
              <span className="whitespace-nowrap text-base font-light tracking-[0.2em] text-foreground/30 lg:text-lg">
                {item}
              </span>
              <span className="text-xs text-primary/50">◆</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
