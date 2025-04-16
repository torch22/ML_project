// GeneratedAvatar.js
import React from 'react';

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getGrayColorFromHash(hash, lightness = 20) {
  const base = (hash % 40) + lightness; // stays between 20–60%
  return `hsl(0, 0%, ${base}%)`;
}

function generateCircles(seed) {
  const hash = hashCode(seed);
  const rand = (offset) => (Math.abs(Math.sin(hash + offset)) * 1000) % 100;
  return [
    {
      cx: 20 + rand(1) % 60,
      cy: 20 + rand(2) % 60,
      r: 6 + rand(3) % 8,
      opacity: 0.1 + (rand(4) % 3) * 0.1,
      delay: (rand(5) % 3) * 0.5,
    },
    {
      cx: 20 + rand(6) % 60,
      cy: 20 + rand(7) % 60,
      r: 6 + rand(8) % 8,
      opacity: 0.1 + (rand(9) % 3) * 0.1,
      delay: (rand(10) % 3) * 0.5,
    },
    {
      cx: 20 + rand(11) % 60,
      cy: 20 + rand(12) % 60,
      r: 6 + rand(13) % 8,
      opacity: 0.1 + (rand(14) % 3) * 0.1,
      delay: (rand(15) % 3) * 0.5,
    },
  ];
}

const GeneratedAvatar = ({ email = 'guest@example.com', size = 100 }) => {
  const hash = hashCode(email);
  const color1 = getGrayColorFromHash(hash, 20);
  const color2 = getGrayColorFromHash(hash * 2, 35);
  const circles = generateCircles(email);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '50%' }}
    >
      <defs>
        <linearGradient id={`grad-${hash}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
        <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
        <style>
          {`
            .circle-animate {
              animation: pulse 3s ease-in-out infinite;
            }
            @keyframes pulse {
              0%, 100% {
                transform: scale(1);
                opacity: 0.2;
              }
              50% {
                transform: scale(1.2);
                opacity: 0.4;
              }
            }
          `}
        </style>
      </defs>
      <rect width="100" height="100" rx="20" fill={`url(#grad-${hash})`} />
      {circles.map((c, i) => (
        <circle
          key={i}
          className="circle-animate"
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          fill="#fff"
          opacity={c.opacity}
          filter="url(#blur)"
        />
      ))}
    </svg>
  );
};

export default GeneratedAvatar;
