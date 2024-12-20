import React from "react";

interface FadeInWrapperProps {
  children: React.ReactNode;
  className?: string;
  duration?: string;
}

function FadeInWrapper({
  children,
  className = "",
  duration = "150",
}: FadeInWrapperProps) {
  return (
    <div
      className={`animate-fade-in ${className}`}
      style={{
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default FadeInWrapper;
