"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const headingWordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation with mask
      const imageTl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      imageTl
        .from(imageRef.current, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.out",
        })
        .from(
          imageInnerRef.current,
          {
            scale: 1.4,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1"
        );

      // Heading words animation
      gsap.from(headingWordsRef.current, {
        y: 60,
        opacity: 0,
        rotateX: -45,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Content paragraphs
      const paragraphs = contentRef.current?.querySelectorAll("p");
      gsap.from(paragraphs || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll(".stat-number");
      statNumbers?.forEach((stat) => {
        const endValue = stat.getAttribute("data-value");
        if (endValue) {
          gsap.from(stat, {
            textContent: 0,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // Stats fade in
      gsap.from(statsRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Parallax on image
      gsap.to(imageInnerRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = "Where Tradition Meets Innovation";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-card px-6 py-32 lg:py-40"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-primary blur-[200px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Image with reveal animation */}
        <div
          ref={imageRef}
          className="relative aspect-[3/4] overflow-hidden lg:aspect-[4/5]"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          <div ref={imageInnerRef} className="absolute inset-0 scale-100">
            <Image
              src="/images/chef.jpg"
              alt="Our head chef preparing dishes"
              fill
              className="object-cover"
            />
          </div>
          {/* Floating badge */}
          <div className="absolute bottom-6 left-6 bg-background/90 px-6 py-4 backdrop-blur-sm">
            <span className="block text-3xl font-light text-primary">15+</span>
            <span className="text-xs tracking-widest text-muted-foreground">
              YEARS EXPERIENCE
            </span>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex flex-col justify-center lg:py-12">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm tracking-[0.3em] text-primary">
              OUR STORY
            </span>
          </div>

          <h2
            className="mb-10 text-4xl font-light leading-tight tracking-tight text-card-foreground md:text-5xl lg:text-6xl"
            style={{ perspective: "1000px" }}
          >
            {headingText.split(" ").map((word, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) headingWordsRef.current[i] = el;
                }}
                className="mr-3 inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word}
              </span>
            ))}
          </h2>

          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            {`Founded in 2018, Kori's was born from a deep passion for Korean
            cuisine and a desire to share its rich flavors with the world. Our
            name, meaning "Korea" in Korean, represents our commitment to
            authenticity while embracing modern culinary techniques.`}
          </p>

          <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
            Every dish tells a story from the careful selection of traditional
            ingredients sourced directly from Korean farms to the artful
            presentation that honors centuries of culinary heritage.
          </p>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-8 border-t border-border pt-10"
          >
            <div className="text-center lg:text-left">
              <span
                className="stat-number block text-4xl font-light text-primary md:text-5xl"
                data-value="6"
              >
                6
              </span>
              <span className="mt-2 block text-xs tracking-widest text-muted-foreground">
                YEARS OF
                <br />
                EXCELLENCE
              </span>
            </div>
            <div className="text-center lg:text-left">
              <span
                className="stat-number block text-4xl font-light text-primary md:text-5xl"
                data-value="50"
              >
                50
              </span>
              <span className="mt-2 block text-xs tracking-widest text-muted-foreground">
                SIGNATURE
                <br />
                DISHES
              </span>
            </div>
            <div className="text-center lg:text-left">
              <span className="block text-4xl font-light text-primary md:text-5xl">
                4.9
              </span>
              <span className="mt-2 block text-xs tracking-widest text-muted-foreground">
                GUEST
                <br />
                RATING
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
