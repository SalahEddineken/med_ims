import type React from "react"

export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-foreground)' }} {...props}>
      {/* Background container with subtle grid */}
      <rect
        x="2"
        y="8"
        width="116"
        height="34"
        rx="4"
        fill="rgba(0, 0, 0, 0.05)"
        stroke="var(--color-primary)"
        strokeOpacity="0.3"
        strokeWidth="1"
      />

      {/* Grid pattern suggesting data */}
      <line x1="40" y1="8" x2="40" y2="42" stroke="var(--color-primary)" strokeOpacity="0.1" strokeWidth="1" />
      <line x1="78" y1="8" x2="78" y2="42" stroke="var(--color-primary)" strokeOpacity="0.1" strokeWidth="1" />

      {/* S letter with integrated bar chart */}
      <text x="12" y="33" fill="currentColor" fontSize="28" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">
        S
      </text>

      {/* Mini bar chart integrated into design */}
      <rect x="32" y="28" width="3" height="8" fill="var(--color-primary)" opacity="0.8" />
      <rect x="36" y="24" width="3" height="12" fill="var(--color-primary)" opacity="0.9" />
      <rect x="40" y="20" width="3" height="16" fill="var(--color-primary)" />

      {/* Divider line */}
      <line x1="48" y1="15" x2="48" y2="35" stroke="var(--color-primary)" strokeWidth="2" />

      {/* K letter */}
      <text x="54" y="33" fill="currentColor" fontSize="28" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">
        K
      </text>

      {/* Data points and trend line */}
      <circle cx="84" cy="30" r="2" fill="var(--color-primary)" />
      <circle cx="92" cy="24" r="2" fill="var(--color-primary)" />
      <circle cx="100" cy="20" r="2" fill="var(--color-primary)" />
      <circle cx="108" cy="18" r="2" fill="var(--color-primary)" />

      {/* Connecting trend line */}
      <path
        d="M 84 30 L 92 24 L 100 20 L 108 18"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Subtle "DATA ANALYST" label */}
      <text
        x="60"
        y="10"
        fill="currentColor"
        fillOpacity="0.5"
        fontSize="5"
        fontWeight="500"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="1"
      >
        DATA ANALYST
      </text>
    </svg>
  )
}
