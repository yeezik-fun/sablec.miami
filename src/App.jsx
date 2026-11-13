import { useEffect, useRef, useState } from 'react';
import Dither from './Dither';
import DepthText from './DepthText';

// Parola segreta: scrivila sulla tastiera (da telefono: tieni premuta la scritta, poi scrivi).
const SECRET = 'tramonto';

// Tramonto di Miami: dal viola della notte al corallo fino all'oro del sole.
const SUNSET = ['#160a2b', '#2f0f4a', '#5a1660', '#94216b', '#d23a6a', '#ff6f5b', '#ffa45c', '#ffd27a'];

export default function App() {
  const [open, setOpen] = useState(false);
  const trapRef = useRef(null);
  const pressRef = useRef(0);

  const canHover = () => window.matchMedia?.('(hover: hover)').matches ?? false;
  const focusTrap = () => {
    if (!open) trapRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (canHover()) focusTrap();
  }, []);

  const onType = e => {
    const value = e.target.value.toLowerCase();
    if (value.endsWith(SECRET)) {
      e.target.value = '';
      e.target.blur();
      setOpen(true);
    } else if (value.length > 60) {
      e.target.value = value.slice(-30);
    }
  };

  return (
    <main className="scene" onClick={() => canHover() && focusTrap()}>
      <div className="bg" aria-hidden="true">
        <Dither
          waveColor="#ff8a5b"
          backgroundColor="#160a2b"
          ditherMode="lines"
          colorNum={16}
          pixelSize={2}
          waveSpeed={0.05}
          waveFrequency={3}
          waveAmplitude={0.3}
          mouseEffect="erase"
          mouseRadius={0.05}
          palette={SUNSET}
          scale={1.2}
          contrast={1}
          brightness={0}
          mouseStrength={1}
          trail={0.5}
          enableMouseInteraction={false}
          clickRipple={false}
          intro={false}
          disableAnimation={false}
        />
      </div>
      <div className="glow" aria-hidden="true" />

      <h1
        className="title"
        onPointerDown={() => (pressRef.current = Date.now())}
        onPointerUp={() => {
          if (pressRef.current && Date.now() - pressRef.current > 700) focusTrap();
          pressRef.current = 0;
        }}
        onPointerLeave={() => (pressRef.current = 0)}
        onContextMenu={e => e.preventDefault()}
        aria-label="sablec.miami"
      >
        <DepthText
          text="sablec.miami"
          layers={48}
          depth={2.2}
          depthColor="#000000"
          gradientDepth={false}
          hoverPush={0.4}
          float
          tilt={8}
          pointerTracking
          smoothing={0.14}
          perspective={900}
          autoOrbit
          orbitSpeed={0.35}
          fontSize="clamp(3.5rem, 15cqi, 8.5rem)"
          fontWeight={900}
          shadow
          outline={false}
          intro
        />
      </h1>

      <input
        ref={trapRef}
        className="trap"
        onInput={onType}
        aria-label="sablec"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        tabIndex={-1}
      />

      {open && (
        <div className="secret" onClick={e => e.stopPropagation()}>
          <article className="card">
            <button className="close" type="button" aria-label="chiudi" onClick={() => setOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 3 L15 15 M15 3 L3 15" />
              </svg>
            </button>
            <h2>[titolo]</h2>
            <p>[scrivi qui il tuo messaggio]</p>
            <p className="date">10.11.2026</p>
          </article>
        </div>
      )}
    </main>
  );
}
