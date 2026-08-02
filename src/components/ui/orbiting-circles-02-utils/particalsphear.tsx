const PARTICLES = Array.from({ length: 42 }, (_, index) => {
   const angle = (index * 137.5 * Math.PI) / 180;
   const radius = 16 + ((index * 17) % 35);
   return {
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius * 0.72,
      size: index % 5 === 0 ? 3 : 2,
      opacity: 0.3 + (index % 4) * 0.16,
   };
});

/** Lightweight, CSS-based particle sphere used by the orbiting technology globe. */
const ParticleSphereAnimation = () => (
   <div
      className="relative h-full w-full rounded-full border border-orange-200/35 bg-[radial-gradient(circle_at_35%_30%,rgba(253,186,116,0.42),rgba(234,88,12,0.18)_38%,rgba(9,7,5,0.25)_72%)] shadow-[0_0_56px_rgba(249,115,22,0.32)]"
      aria-hidden="true"
   >
      <div className="absolute inset-[12%] rounded-full border border-orange-100/15" />
      <div className="absolute inset-[27%] rounded-full border border-orange-100/10" />
      {PARTICLES.map((particle, index) => (
         <span
            key={index}
            className="absolute rounded-full bg-orange-100"
            style={{
               left: `${particle.x}%`,
               top: `${particle.y}%`,
               width: particle.size,
               height: particle.size,
               opacity: particle.opacity,
               boxShadow: "0 0 8px rgba(253, 186, 116, 0.9)",
            }}
         />
      ))}
   </div>
);

export default ParticleSphereAnimation;
