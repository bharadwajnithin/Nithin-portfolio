import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";

interface TextHoverEffectProps {
   text: string;
   duration?: number;
   className?: string;
}

export const TextHoverEffect = ({
   text,
   duration = 0.15,
   className = "",
}: TextHoverEffectProps) => {
   const svgRef = useRef<SVGSVGElement>(null);
   const gradientId = useId();
   const maskId = useId();
   const revealId = useId();
   const [hovered, setHovered] = useState(false);
   const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

   useEffect(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const updateMaskPosition = (event: PointerEvent) => {
         const bounds = svg.getBoundingClientRect();
         setMaskPosition({
            cx: `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
            cy: `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
         });
      };

      svg.addEventListener("pointermove", updateMaskPosition);
      return () => svg.removeEventListener("pointermove", updateMaskPosition);
   }, []);

   return (
      <svg
         ref={svgRef}
         width="100%"
         height="100%"
         viewBox="0 0 300 100"
         role="img"
         aria-label={`${text} monogram`}
         onPointerEnter={() => setHovered(true)}
         onPointerLeave={() => setHovered(false)}
         className={`cursor-pointer select-none ${className}`}
      >
         <defs>
            <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
               <stop offset="0%" stopColor="#fdba74" />
               <stop offset="48%" stopColor="#f97316" />
               <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <motion.radialGradient
               id={revealId}
               gradientUnits="userSpaceOnUse"
               r="24%"
               initial={{ cx: "50%", cy: "50%" }}
               animate={maskPosition}
               transition={{ duration, ease: "easeOut" }}
            >
               <stop offset="0%" stopColor="white" />
               <stop offset="100%" stopColor="black" />
            </motion.radialGradient>
            <mask id={maskId}>
               <rect x="0" y="0" width="100%" height="100%" fill={`url(#${revealId})`} />
            </mask>
         </defs>
         <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="transparent"
            stroke="rgba(253,186,116,0.72)"
            strokeWidth="0.8"
            fontFamily="var(--font-display)"
            fontSize="76"
            fontWeight="800"
            initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
            animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
         >
            {text}
         </motion.text>
         <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={`url(#${gradientId})`}
            mask={`url(#${maskId})`}
            fontFamily="var(--font-display)"
            fontSize="76"
            fontWeight="800"
            opacity={hovered ? 1 : 0}
            style={{ transition: "opacity 160ms ease-out" }}
         >
            {text}
         </text>
      </svg>
   );
};

export const FooterBackgroundGradient = () => (
   <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
         background:
            "radial-gradient(110% 115% at 50% 8%, rgba(19,12,8,0.2) 45%, rgba(234,88,12,0.16) 100%)",
      }}
   />
);
