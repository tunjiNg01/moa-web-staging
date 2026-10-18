import React from "react";

export interface MoaBrandProps extends React.HTMLAttributes<HTMLSpanElement> {
  withLtd?: boolean;
  className?: string;
  ampClassName?: string;
  ltdClassName?: string;
}

/**
 * Renders the official MO&A brand lockup using the Dutch 801 serif webfont.
 * Accurately mirrors the company logo styling where the ampersand (&) is styled
 * approximately one font size smaller (~0.8em) than the adjacent letters (MO and A).
 */
export function MoaBrand({
  withLtd = false,
  className = "",
  ampClassName = "",
  ltdClassName = "",
  ...props
}: MoaBrandProps) {
  return (
    <span
      className={`font-serif tracking-tight inline ${className}`}
      {...props}
    >
      MO<span
        className={`text-[0.8em] inline-block align-baseline mx-[0.015em] ${ampClassName}`}
        aria-hidden="true"
      >&amp;</span><span className="sr-only">&amp;</span>A{withLtd && <span className={`ml-1.5 ${ltdClassName}`}>Ltd</span>}
    </span>
  );
}
