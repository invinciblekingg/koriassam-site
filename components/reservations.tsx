"use client";

import React from "react"

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Reservations() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    occasion: "",
    notes: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="reservations"
      className="bg-card px-6 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <span className="mb-4 block text-sm tracking-widest text-primary">
            JOIN US
          </span>
          <h2 className="mb-6 text-4xl font-light tracking-wide text-card-foreground md:text-5xl lg:text-6xl">
            Reserve Your Table
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            We invite you to join us for an unforgettable dining experience.
            Please fill out the form below, and our team will confirm your
            reservation shortly.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm tracking-wider text-muted-foreground"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm tracking-wider text-muted-foreground"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm tracking-wider text-muted-foreground"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                placeholder="+1 (234) 567-890"
              />
            </div>
            <div>
              <label
                htmlFor="guests"
                className="mb-2 block text-sm tracking-wider text-muted-foreground"
              >
                Number of Guests
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none border border-border bg-background px-4 py-3 pl-12 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="">Select guests</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                  <option value="9+">9+ Guests (Private Dining)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm tracking-wider text-muted-foreground"
              >
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full border border-border bg-background px-4 py-3 pl-12 text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="time"
                className="mb-2 block text-sm tracking-wider text-muted-foreground"
              >
                Preferred Time
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none border border-border bg-background px-4 py-3 pl-12 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="">Select time</option>
                  {[
                    "5:00 PM",
                    "5:30 PM",
                    "6:00 PM",
                    "6:30 PM",
                    "7:00 PM",
                    "7:30 PM",
                    "8:00 PM",
                    "8:30 PM",
                    "9:00 PM",
                    "9:30 PM",
                  ].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="occasion"
              className="mb-2 block text-sm tracking-wider text-muted-foreground"
            >
              Special Occasion (Optional)
            </label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              className="w-full appearance-none border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
            >
              <option value="">None</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="business">Business Dinner</option>
              <option value="date">Date Night</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="mb-2 block text-sm tracking-wider text-muted-foreground"
            >
              Special Requests (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
              placeholder="Dietary restrictions, seating preferences, or any special requests..."
            />
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              className="w-full border border-primary bg-primary px-10 py-4 text-sm tracking-widest text-primary-foreground transition-all hover:bg-transparent hover:text-primary md:w-auto"
            >
              REQUEST RESERVATION
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
