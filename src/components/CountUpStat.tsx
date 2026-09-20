"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpStatProps {
  endValue: number;
  suffix?: string;
  label: string;
}

export default function CountUpStat({ endValue, suffix = "", label }: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 50, damping: 20, duration: 2 });

  useEffect(() => {
    if (isInView) {
      count.set(endValue);
    }
  }, [count, endValue, isInView]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [rounded]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-2">
        {displayValue}
        {suffix}
      </p>
      <p className="text-sm text-gray-400 font-semibold tracking-widest uppercase">{label}</p>
    </div>
  );
}
