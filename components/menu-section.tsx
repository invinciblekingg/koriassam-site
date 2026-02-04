"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    id: 1,
    name: "Dolsot Bibimbap",
    description:
      "Sizzling stone pot rice with seasonal vegetables, gochujang, and farm-fresh egg",
    price: "$24",
    image: "/images/dish-bibimbap.jpg",
    category: "signatures",
    number: "01",
  },
  {
    id: 2,
    name: "Premium Bulgogi",
    description:
      "Marinated prime beef, caramelized to perfection, served with traditional banchan",
    price: "$38",
    image: "/images/dish-bbq.jpg",
    category: "signatures",
    number: "02",
  },
  {
    id: 3,
    name: "Kimchi Jjigae",
    description:
      "Aged kimchi stew with heritage pork and silken tofu in rich, fermented broth",
    price: "$22",
    image: "/images/dish-jjigae.jpg",
    category: "signatures",
    number: "03",
  },
];

const categories = [
  { id: "signatures", label: "Signatures" },
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Main Courses" },
  { id: "desserts", label: "Desserts" },
];

export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("signatures");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation with split text effect
      gsap.from(headingRef.current?.children || [], {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative bg-background px-6 py-32 lg:py-40"
    >
      {/* Floating image reveal on hover */}
      <div
        ref={imageRevealRef}
        className="pointer-events-none fixed right-[10%] top-1/2 z-50 hidden h-[400px] w-[300px] -translate-y-1/2 overflow-hidden lg:block"
        style={{ opacity: 0 }}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              hoveredItem === item.id ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headingRef} className="mb-20 lg:mb-28">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm tracking-[0.3em] text-primary">
              CULINARY ARTISTRY
            </span>
          </div>
          <h2 className="mb-8 text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-8xl">
            Our Menu
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Each dish is crafted with precision and passion, honoring the
            traditions of Korean cuisine while embracing contemporary techniques.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-16 flex flex-wrap gap-3 lg:gap-4">
          {categories.map((category, index) => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              index={index}
            />
          ))}
        </div>

        {/* Menu Items - Horizontal List Style */}
        <div className="space-y-0">
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.id}
              item={item}
              index={index}
              onHover={() => {
                setHoveredItem(item.id);
                if (imageRevealRef.current) {
                  gsap.to(imageRevealRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "power3.out",
                  });
                }
              }}
              onLeave={() => {
                setHoveredItem(null);
                if (imageRevealRef.current) {
                  gsap.to(imageRevealRef.current, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.4,
                    ease: "power3.out",
                  });
                }
              }}
            />
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="mt-20 flex justify-center lg:justify-start">
          <a
            href="#"
            className="group relative inline-flex items-center gap-4 overflow-hidden"
            data-cursor="explore"
          >
            <span className="relative z-10 text-lg tracking-wide text-foreground transition-colors group-hover:text-primary">
              View Full Menu
            </span>
            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-foreground/30 transition-all group-hover:border-primary group-hover:bg-primary">
              <svg
                className="h-4 w-4 text-foreground transition-all group-hover:-rotate-45 group-hover:text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function CategoryButton({
  category,
  isActive,
  onClick,
  index,
}: {
  category: { id: string; label: string };
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.from(buttonRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.5 + index * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: buttonRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }, [index]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-full px-6 py-3 text-sm tracking-wider transition-all duration-500 ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
    >
      <span className="relative z-10">{category.label}</span>
      {!isActive && (
        <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 ease-out group-hover:translate-x-0" />
      )}
    </button>
  );
}

function MenuItem({
  item,
  index,
  onHover,
  onLeave,
}: {
  item: (typeof menuItems)[0];
  index: number;
  onHover: () => void;
  onLeave: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate line and content
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(contentRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: index * 0.2 + 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [index]);

  const handleMouseEnter = () => {
    onHover();
    gsap.to(contentRef.current, {
      x: 20,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    onLeave();
    gsap.to(contentRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={itemRef}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
    >
      {/* Top border line */}
      <div
        ref={lineRef}
        className="absolute left-0 right-0 top-0 h-px origin-left bg-border transition-colors duration-300 group-hover:bg-primary"
      />

      <div
        ref={contentRef}
        className="flex cursor-pointer items-center justify-between py-8 lg:py-12"
      >
        {/* Left side - Number and Name */}
        <div className="flex items-baseline gap-6 lg:gap-12">
          <span className="text-sm text-muted-foreground">{item.number}</span>
          <div>
            <h3 className="text-2xl font-light tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary md:text-3xl lg:text-4xl">
              {item.name}
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground opacity-0 transition-all duration-500 lg:opacity-100">
              {item.description}
            </p>
          </div>
        </div>

        {/* Right side - Price and Arrow */}
        <div className="flex items-center gap-6 lg:gap-12">
          <span className="text-xl font-light text-foreground lg:text-2xl">
            {item.price}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-primary group-hover:bg-primary lg:h-12 lg:w-12">
            <svg
              className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-rotate-45 group-hover:text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile image preview */}
      <div className="mb-6 overflow-hidden lg:hidden">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Bottom border for last item */}
      {index === menuItems.length - 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      )}
    </div>
  );
}
