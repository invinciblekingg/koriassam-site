"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Handle hover states for interactive elements
    const handleElementHover = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor="pointer"], input, textarea, select'
      );
      const viewElements = document.querySelectorAll('[data-cursor="view"]');
      const exploreElements = document.querySelectorAll('[data-cursor="explore"]');

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          gsap.to(cursor, {
            scale: 1.5,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
          gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      viewElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setCursorText("View");
          gsap.to(cursor, {
            scale: 3,
            duration: 0.4,
            ease: "power2.out",
          });
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
          gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      exploreElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setCursorText("Explore");
          gsap.to(cursor, {
            scale: 3.5,
            duration: 0.4,
            ease: "power2.out",
          });
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
          gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    handleElementHover();

    // Re-run hover handlers when DOM changes
    const observer = new MutationObserver(() => {
      handleElementHover();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
            isHovering
              ? "border-foreground bg-foreground"
              : "border-foreground/50 bg-transparent"
          }`}
        >
          <span
            ref={cursorTextRef}
            className={`text-[10px] font-medium uppercase tracking-wider text-background transition-opacity duration-200 ${
              cursorText ? "opacity-100" : "opacity-0"
            }`}
          >
            {cursorText}
          </span>
        </div>
      </div>
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-difference transition-opacity duration-300 ${
          isVisible && !isHovering ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      />
      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
