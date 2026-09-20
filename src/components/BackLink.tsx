"use client";

import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  label: string;
  className?: string;
}

const BackLink = ({ label, className }: BackLinkProps) => {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
        return;
      }
    }
    // Fallback: if no history, just go to home.
    window.location.href = "/";
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className ?? "inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"}
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
};

export default BackLink;

