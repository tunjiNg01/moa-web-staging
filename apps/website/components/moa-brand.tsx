import React from "react";

interface MoaBrandProps extends React.HTMLAttributes<HTMLSpanElement> {
  withLtd?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Renders the MO&A brand mark using the official Dutch 801 serif webfont.
 */
export function MoaBrand({
  withLtd = false,
  className = "",
  children,
  ...props
}: MoaBrandProps) {
  return (
    <span className={`font-serif tracking-tight ${className}`} {...props}>
      {children ? children : <>MO&amp;A{withLtd ? " Ltd" : ""}</>}
    </span>
  );
}
