import { useState } from 'react'
import './App.css'

// GCSE info for each gland
const GLAND_INFO: Record<string, string> = {
  'pituitary': `The pituitary gland is found at the base of the brain. It releases hormones that control many other glands, including those involved in reproduction. It produces FSH and LH, which stimulate the ovaries in females and the testes in males.`,
  'testes': `The testes are the main male reproductive glands. They produce sperm and release the hormone testosterone, which controls the development of male secondary sexual characteristics and sperm production.`,
  'ovaries': `The ovaries are the main female reproductive glands. They release eggs and produce the hormones oestrogen and progesterone, which control the menstrual cycle and the development of female secondary sexual characteristics.`
}

function GlandDiagram({ onSelect, fshActive, lhActive }: { onSelect: (gland: string) => void, fshActive: boolean, lhActive: boolean }) {
  // Animate 4 FSH (blue) then 4 LH (pink) circles from pituitary to ovaries
  const hormoneFSH = fshActive ? (
    <g>
      {[0, 1, 2, 3].map(i => (
        <circle
          key={`fsh-${i}`}
          className={`hormone hormone-fsh hormone-fsh-${i}`}
          cx="200"
          cy="90"
          r="7"
          fill="#38bdf8"
          opacity="0.85"
        />
      ))}
    </g>
  ) : null;
  const hormoneLH = lhActive ? (
    <g>
      {[0, 1, 2, 3].map(i => (
        <circle
          key={`lh-${i}`}
          className={`hormone hormone-lh hormone-lh-${i}`}
          cx="200"
          cy="90"
          r="7"
          fill="#f472b6"
          opacity="0.85"
        />
      ))}
    </g>
  ) : null;

  return (
    <svg viewBox="0 0 400 300" width="400" height="300" style={{ background: '#f8f8ff', borderRadius: 12 }}>
      {/* Brain and pituitary */}
      <ellipse cx="200" cy="60" rx="80" ry="40" fill="#e0e7ff" stroke="#888" strokeWidth="2" />
      <circle cx="200" cy="90" r="12" fill="#a5b4fc" stroke="#333" strokeWidth="2" onClick={() => onSelect('pituitary')} style={{ cursor: 'pointer' }} />
      <text x="200" y="55" textAnchor="middle" fontSize="16" fill="#333">Brain</text>
      <text x="200" y="110" textAnchor="middle" fontSize="12" fill="#333">Pituitary</text>
      {/* Testes (male) */}
      <ellipse cx="120" cy="250" rx="18" ry="28" fill="#fcd34d" stroke="#b45309" strokeWidth="2" onClick={() => onSelect('testes')} style={{ cursor: 'pointer' }} />
      <text x="120" y="245" textAnchor="middle" fontSize="12" fill="#b45309">Testes</text>
      {/* Ovaries (female) */}
      <ellipse cx="280" cy="250" rx="18" ry="28" fill="#f472b6" stroke="#be185d" strokeWidth="2" onClick={() => onSelect('ovaries')} style={{ cursor: 'pointer' }} />
      <text x="280" y="245" textAnchor="middle" fontSize="12" fill="#be185d">Ovaries</text>
      {hormoneFSH}
      {hormoneLH}
    </svg>
  )
}

function Sidebar({ info, fshGlow, lhGlow }: { info: string | null, fshGlow: boolean, lhGlow: boolean }) {
  if (!info) return <aside className="sidebar"><p>Click a gland to learn more.</p></aside>;
  // Highlight FSH and LH in the info text
  const highlighted = info.replace(
    /FSH|LH/g,
    (match) => {
      if (match === 'FSH') return `<span class="glow-fsh${fshGlow ? ' active' : ''}">FSH</span>`;
      if (match === 'LH') return `<span class="glow-lh${lhGlow ? ' active' : ''}">LH</span>`;
      return match;
    }
  );
  return (
    <aside className="sidebar">
      <p dangerouslySetInnerHTML={{ __html: highlighted }} />
    </aside>
  )
}

function App() {
  const [selected, setSelected] = useState<string | null>(null)
  const [fshActive, setFshActive] = useState(false)
  const [lhActive, setLhActive] = useState(false)
  const [fshGlow, setFshGlow] = useState(false)
  const [lhGlow, setLhGlow] = useState(false)

  function handleSelect(gland: string) {
    setSelected(gland)
    if (gland === 'pituitary') {
      setFshActive(false)
      setLhActive(false)
      setFshGlow(false)
      setLhGlow(false)
      setTimeout(() => {
        setFshActive(true)
        setFshGlow(true)
      }, 10)
      setTimeout(() => {
        setFshActive(false)
        setFshGlow(false)
        setLhActive(true)
        setLhGlow(true)
      }, 1800)
      setTimeout(() => {
        setLhActive(false)
        setLhGlow(false)
      }, 3600)
    } else {
      setFshActive(false)
      setLhActive(false)
      setFshGlow(false)
      setLhGlow(false)
    }
  }

  return (
    <div className="container">
      <h1>Sex Hormones & Reproductive Glands</h1>
      <div className="main-content">
        <GlandDiagram onSelect={handleSelect} fshActive={fshActive} lhActive={lhActive} />
        <Sidebar info={selected ? GLAND_INFO[selected] : null} fshGlow={fshGlow} lhGlow={lhGlow} />
      </div>
      <footer>
        <small>GCSE Combined Science | Interactive Revision</small>
      </footer>
    </div>
  )
}

export default App
