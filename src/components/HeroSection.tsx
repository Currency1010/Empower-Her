"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import classroomBg from "@/assets/classroom.jpeg";
import childrenBg from "@/assets/children.jpeg";
import sewingBg from "@/assets/sewing.jpeg";

const slides = [
  {
    id: 1,
    image: classroomBg,
    tagline: "Educate · Empower · Elevate",
    title: "Give Hope.",
    subtitle: "Empower a Life.",
    description: "We are dedicated to breaking the cycle of poverty by providing education, scholarships, and vocational skills to out-of-school girls and vulnerable youth.",
  },
  {
    id: 2, 
    image: childrenBg,
    tagline: "Educational Access",
    title: "Bridge the",
    subtitle: "Educational Gap.",
    description: "Ensuring no child is left behind due to financial hardship through robust scholarship schemes and partnerships with top local schools.",
  },
  {
    id: 3,
    image: sewingBg,
    tagline: "Vocational Training",
    title: "Skills for",
    subtitle: "the Future.",
    description: "Providing practical training in tailoring, digital literacy, and modern trade skills to equip women and youth for the modern economy.",
  }
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative min-h-[99vh] flex items-center justify-center overflow-hidden bg-gray-900">
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="relative flex-[0_0_100%] h-full min-w-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-none">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pointer-events-auto"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-secondary" />
                <p className="text-secondary font-body font-bold tracking-widest uppercase text-sm">
                  {slides[selectedIndex].tagline}
                </p>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-white leading-[1.1] mb-8 tracking-tight">
                {slides[selectedIndex].title}{" "}
                <span className="text-secondary block mt-2">{slides[selectedIndex].subtitle}</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-12 font-body leading-relaxed">
                {slides[selectedIndex].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://paystack.shop/pay/ehyi-donation">
                  <Button
                    size="lg"
                    className="bg-secondary text-primary hover:bg-white transition-all duration-300 rounded-none px-8 py-6 font-bold tracking-wide uppercase text-sm w-full sm:w-auto"
                  >
                    Donate Now
                  </Button>
                </Link>
                <a href="#programs">
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 rounded-none px-8 py-6 font-bold tracking-wide uppercase text-sm w-full sm:w-auto"
              >
                    Our Programs
                  </Button>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "bg-secondary scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
