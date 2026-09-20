"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FounderCardProps {
  name: string;
  role?: string;
  bio: string;
  imageUrl?: string;
  delay?: number;
  className?: string;
}

const PREVIEW_LENGTH = 220;

const FounderCard = ({ name, role, bio, imageUrl, delay = 0, className = "" }: FounderCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = bio.length > PREVIEW_LENGTH;
  const displayed = expanded || !isLong ? bio : `${bio.slice(0, PREVIEW_LENGTH).trimEnd()}…`;

  return (
    <motion.div
      className={"bg-white rounded-none shadow-md overflow-hidden border border-muted flex flex-col h-full " + className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <div className="aspect-[3/4] bg-muted flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="mt-2 text-sm">Add photo</span>
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-heading font-bold text-primary mb-1">{name}</h3>
        {role && (
          <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-3">{role}</p>
        )}
        <p className="text-sm text-muted-foreground leading-relaxed">{displayed}</p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 self-start text-sm font-semibold text-secondary uppercase tracking-wide hover:underline"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default FounderCard;
