import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
   BrainCircuit,
   Cloud,
   Code2,
   Database,
   GitBranch,
   Layers3,
   ServerCog,
   Sparkles,
} from "lucide-react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

interface OrbitIcon {
   Icon: LucideIcon;
   label: string;
   angle: number;
}

interface Orbit {
   size: string;
   duration: number;
   icons: OrbitIcon[];
}

const ORBITS: Orbit[] = [
   {
      size: "h-[13.5rem] w-[13.5rem] md:h-[19rem] md:w-[19rem]",
      duration: 18,
      icons: [
         { Icon: Code2, label: "Software development", angle: -60 },
         { Icon: Database, label: "Databases", angle: 60 },
      ],
   },
   {
      size: "h-[18rem] w-[18rem] md:h-[25rem] md:w-[25rem]",
      duration: 25,
      icons: [
         { Icon: Cloud, label: "Cloud platforms", angle: -90 },
         { Icon: GitBranch, label: "Version control", angle: 0 },
         { Icon: ServerCog, label: "Backend systems", angle: 90 },
      ],
   },
   {
      size: "h-[23rem] w-[23rem] md:h-[32rem] md:w-[32rem]",
      duration: 32,
      icons: [
         { Icon: BrainCircuit, label: "AI engineering", angle: -60 },
         { Icon: Layers3, label: "Full-stack applications", angle: 0 },
         { Icon: Sparkles, label: "Creative problem solving", angle: 60 },
      ],
   },
];

/** An accessible decorative technology globe for the About section. */
const OrbitingCirclesGlobe = () => (
   <div
      className="relative flex h-[21rem] w-full items-end justify-center overflow-hidden md:h-[25rem]"
      role="img"
      aria-label="Orbiting technology icons around a glowing particle sphere"
   >
      <style>{`
         @keyframes nk-orbit-cw { from { transform: rotate(var(--start-angle)); } to { transform: rotate(calc(var(--start-angle) + 360deg)); } }
         @keyframes nk-orbit-ccw { from { transform: rotate(var(--start-angle)); } to { transform: rotate(calc(var(--start-angle) - 360deg)); } }
         @keyframes nk-counter-cw { from { transform: rotate(var(--counter-offset)); } to { transform: rotate(calc(var(--counter-offset) - 360deg)); } }
         @keyframes nk-counter-ccw { from { transform: rotate(var(--counter-offset)); } to { transform: rotate(calc(var(--counter-offset) + 360deg)); } }
         @media (prefers-reduced-motion: reduce) { .nk-orbit, .nk-counter { animation: none !important; } }
      `}</style>

      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-square w-32 -translate-x-1/2 translate-y-1/2 md:w-52">
         <ParticleSphereAnimation />
      </div>

      {ORBITS.map((orbit, orbitIndex) => {
         const clockwise = orbitIndex % 2 === 0;
         const orbitAnimation = clockwise ? "nk-orbit-cw" : "nk-orbit-ccw";
         const counterAnimation = clockwise
            ? "nk-counter-cw"
            : "nk-counter-ccw";

         return (
            <div
               key={orbit.duration}
               className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-orange-100/15 ${orbit.size}`}
               aria-hidden="true"
            >
               {orbit.icons.map(({ Icon, label, angle }) => (
                  <div
                     key={label}
                     className="nk-orbit absolute left-1/2 top-0 flex h-1/2 -ml-6 origin-bottom flex-col items-center justify-start md:-ml-7"
                     style={{
                        "--start-angle": `${angle}deg`,
                        animation: `${orbitAnimation} ${orbit.duration}s linear infinite`,
                     } as CSSProperties}
                  >
                     <div
                        className="nk-counter relative -mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-orange-200/30 bg-[var(--color-bg-card)] text-orange-200 shadow-[0_0_20px_rgba(234,88,12,0.2)] md:-mt-7 md:h-14 md:w-14"
                        style={{
                           "--counter-offset": `${-angle}deg`,
                           animation: `${counterAnimation} ${orbit.duration}s linear infinite`,
                        } as CSSProperties}
                     >
                        <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.7} />
                     </div>
                  </div>
               ))}
            </div>
         );
      })}
   </div>
);

export default OrbitingCirclesGlobe;
