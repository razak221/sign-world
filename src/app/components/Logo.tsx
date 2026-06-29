interface LogoProps {
  className?: string;
}

export function LogoIcon({ className = "h-10 w-10" }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Rich Metallic Gold Gradient */}
        <linearGradient id="logo-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff6d1" /> {/* Shine */}
          <stop offset="35%" stopColor="#d4af37" /> {/* Gold */}
          <stop offset="70%" stopColor="#aa7c11" /> {/* Dark shadow */}
          <stop offset="100%" stopColor="#d4af37" /> {/* Gold reflection */}
        </linearGradient>
        
        {/* Soft Glowing Gold Drop Shadow */}
        <filter id="logo-gold-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Diamond Shield (representing structure and panels) */}
      <path
        d="M 50 8 L 92 50 L 50 92 L 8 50 Z"
        stroke="url(#logo-gold-grad)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="rgba(212, 175, 55, 0.04)"
      />

      {/* Inner Accent Diamond border */}
      <path
        d="M 50 16 L 84 50 L 50 84 L 16 50 Z"
        stroke="url(#logo-gold-grad)"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.35"
      />

      {/* Stylized 'S' and 'W' monogram representing Sign World */}
      <path
        d="M 30 45 L 42 63 L 50 49 L 58 63 L 70 45"
        stroke="url(#logo-gold-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#logo-gold-glow)"
      />

      {/* High-tech Sparkle/Embellishment Core */}
      <circle cx="50" cy="30" r="3.5" fill="url(#logo-gold-grad)" />
    </svg>
  );
}
