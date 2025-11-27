export function AnimatedBackground() {
  return (
    <>
      <style>{`
        @keyframes blob-float-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }

        @keyframes blob-float-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 30px) scale(1.15);
          }
          66% {
            transform: translate(30px, -20px) scale(0.9);
          }
        }

        .blob-1 {
          animation: blob-float-1 15s ease-in-out infinite;
        }

        .blob-2 {
          animation: blob-float-2 18s ease-in-out infinite;
        }
      `}</style>
      {/* Blob 1 - Top Right - Purple */}
      <div
        className="blob-1"
        style={{
          position: "fixed",
          top: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vh",
          background: "rgba(139, 92, 246, 0.4)",
          filter: "blur(80px)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Blob 2 - Bottom Left - Pink/Magenta */}
      <div
        className="blob-2"
        style={{
          position: "fixed",
          bottom: "-20%",
          left: "-10%",
          width: "50vw",
          height: "50vh",
          background: "rgba(236, 72, 153, 0.35)",
          filter: "blur(80px)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
}
