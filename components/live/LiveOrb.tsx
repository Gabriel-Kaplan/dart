type OrbState = "idle" | "listening" | "speaking";

type Props = {
  state: OrbState;
};

export default function LiveOrb({ state }: Props) {
  return (
    <div className="relative flex items-center justify-center w-[200px] h-[200px] sm:w-[260px] sm:h-[260px]">
      {/* Ripple rings — speaking only */}
      {state === "speaking" && (
        <>
          <div className="absolute inset-0 rounded-full bg-[#0066FF]/10 orb-ripple-1" />
          <div className="absolute inset-0 rounded-full bg-[#0066FF]/10 orb-ripple-2" />
          <div className="absolute inset-0 rounded-full bg-[#0066FF]/10 orb-ripple-3" />
        </>
      )}

      {/* Core orb */}
      <div
        className={`
          w-[130px] h-[130px] sm:w-[170px] sm:h-[170px] rounded-full
          bg-gradient-to-br from-[#1a7dff] via-[#0066FF] to-[#0033CC]
          ${state === "speaking" ? "orb-speaking" : "orb-idle"}
        `}
        style={{
          boxShadow:
            state === "speaking"
              ? "0 0 90px 35px rgba(0,102,255,0.45), 0 0 40px 10px rgba(0,102,255,0.3)"
              : "0 0 60px 20px rgba(0,102,255,0.15), 0 0 20px 5px rgba(0,102,255,0.1)",
        }}
      />
    </div>
  );
}
