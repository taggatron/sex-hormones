import { useState } from 'react'
import './App.css'
import LandingPage from './LandingPage'

// GCSE info for each gland
const GLAND_INFO: Record<string, string> = {
  'pituitary': `The pituitary gland is found at the base of the brain. It releases hormones that control many other glands, including those involved in reproduction. It produces FSH and LH, which stimulate the ovaries in females and the testes in males.`,
  'testes': `The testes are the main male reproductive glands. They produce sperm and release the hormone testosterone, which controls the development of male secondary sexual characteristics and sperm production.`,
  'ovaries': `The ovaries are the main female reproductive glands. They release eggs and produce the hormones oestrogen and progesterone, which control the menstrual cycle and the development of female secondary sexual characteristics.`
}

function GlandDiagram({ onSelect, fshActive, lhActive, oestrogenActive, progesteroneActive, uterusThick }: {
  onSelect: (gland: string) => void,
  fshActive: boolean,
  lhActive: boolean,
  oestrogenActive: boolean,
  progesteroneActive: boolean,
  uterusThick: boolean
}) {
  // Animate 4 FSH (blue), 4 LH (pink), 4 Oestrogen (purple) circles
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
  // Oestrogen: from ovary to uterus (new target)
  // Calculate dx/dy for animation: ovary (280,250) to uterus center (200,150)
  // dx = -80, dy = -100
  const hormoneOestrogen = oestrogenActive ? (
    <g>
      {[0, 1, 2, 3].map(i => (
        <circle
          key={`oestrogen-${i}`}
          className={`hormone hormone-oestrogen hormone-oestrogen-${i}`}
          cx="280"
          cy="250"
          r="7"
          fill="#a78bfa"
          opacity="0.85"
        />
      ))}
    </g>
  ) : null;
  // Progesterone: from ovary to uterus (after oestrogen)
  const hormoneProgesterone = progesteroneActive ? (
    <g>
      {[0, 1, 2, 3].map(i => (
        <circle
          key={`progesterone-${i}`}
          className={`hormone hormone-progesterone hormone-progesterone-${i}`}
          cx="280"
          cy="250"
          r="7"
          fill="#facc15"
          opacity="0.85"
        />
      ))}
    </g>
  ) : null;

  // Uterus triangle points (raised by 50px)
  const uterusOuter = "200,120 150,200 250,200";
  const uterusInner = "200,130 160,195 240,195";

  return (
    <svg viewBox="0 0 400 300" width="400" height="300" style={{ background: '#f8f8ff', borderRadius: 12 }}>
      {/* Brain and pituitary */}
      <ellipse cx="200" cy="60" rx="80" ry="40" fill="#e0e7ff" stroke="#888" strokeWidth="2" />
      <circle cx="200" cy="90" r="12" fill="#a5b4fc" stroke="#333" strokeWidth="2" onClick={() => onSelect('pituitary')} style={{ cursor: 'pointer' }} />
      <text x="200" y="55" textAnchor="middle" fontSize="16" fill="#333">Brain</text>
      <text x="200" y="110" textAnchor="middle" fontSize="12" fill="#333">Pituitary</text>
      {/* Uterus (hollow triangle) */}
      <polygon points={uterusOuter} fill="none" stroke="#a3a3a3" strokeWidth="6" />
      <polygon points={uterusInner} fill="none" stroke="#fbbf24" strokeWidth={uterusThick ? 10 : 4} />
      <text x="200" y="165" textAnchor="middle" fontSize="15" fill="#111">Uterus</text>
      {/* Testes (male) */}
      <ellipse cx="120" cy="250" rx="26" ry="28" fill="#fcd34d" stroke="#b45309" strokeWidth="2" onClick={() => onSelect('testes')} style={{ cursor: 'pointer' }} />
      <text x="120" y="245" textAnchor="middle" fontSize="12" fill="#b45309">Testes</text>
      {/* Ovaries (female) */}
      <ellipse cx="280" cy="250" rx="26" ry="28" fill="#f472b6" stroke="#be185d" strokeWidth="2" onClick={() => onSelect('ovaries')} style={{ cursor: 'pointer' }} />
      <text x="280" y="245" textAnchor="middle" fontSize="12" fill="#be185d">Ovaries</text>
      {hormoneFSH}
      {hormoneLH}
      {hormoneOestrogen}
      {hormoneProgesterone}
    </svg>
  )
}

function Sidebar({ info, fshGlow, lhGlow, oestrogenGlow, progesteroneGlow }: { info: string | null, fshGlow: boolean, lhGlow: boolean, oestrogenGlow: boolean, progesteroneGlow: boolean }) {
  if (!info) return <aside className="sidebar"><p>Click a gland to learn more.</p></aside>;
  // Highlight FSH, LH, Oestrogen, Progesterone in the info text
  const highlighted = info.replace(
    /FSH|LH|Oestrogen|progesterone/gi,
    (match) => {
      if (match === 'FSH') return `<span class="glow-fsh${fshGlow ? ' active' : ''}">FSH</span>`;
      if (match === 'LH') return `<span class="glow-lh${lhGlow ? ' active' : ''}">LH</span>`;
      if (/^Oestrogen$/i.test(match)) return `<span class="glow-oestrogen${oestrogenGlow ? ' active' : ''}">${match}</span>`;
      if (/^progesterone$/i.test(match)) return `<span class="glow-progesterone${progesteroneGlow ? ' active' : ''}">${match}</span>`;
      return match;
    }
  );
  return (
    <aside className="sidebar">
      <p dangerouslySetInnerHTML={{ __html: highlighted }} />
    </aside>
  )
}

// Knowledge Check Data and Component
const HORMONES = [
  { name: 'FSH', color: '#38bdf8' },
  { name: 'LH', color: '#f472b6' },
  { name: 'Oestrogen', color: '#a78bfa' },
  { name: 'Progesterone', color: '#facc15' },
];
const DEFINITIONS = [
  'Maintains uterus lining for pregnancy', // Progesterone
  'Stimulates egg maturation and oestrogen production in ovaries', // FSH
  'Thickens uterus lining and develops female secondary sexual characteristics', // Oestrogen
  'Triggers ovulation and progesterone production in ovaries', // LH
];
const CORRECT_MATCHES = [1, 3, 2, 0];

function KnowledgeCheck() {
  const [selectedHormone, setSelectedHormone] = useState<number|null>(null);
  const [selectedDef, setSelectedDef] = useState<number|null>(null);
  const [matches, setMatches] = useState<(number|null)[]>([null, null, null, null]);
  const [results, setResults] = useState<(boolean|null)[]>([null, null, null, null]);

  function handleHormoneClick(idx: number) {
    setSelectedHormone(idx);
  }
  function handleDefClick(idx: number) {
    if (selectedHormone !== null && matches[selectedHormone] === null && !matches.includes(idx)) {
      const newMatches = [...matches];
      newMatches[selectedHormone] = idx;
      setMatches(newMatches);
      const newResults = [...results];
      newResults[selectedHormone] = CORRECT_MATCHES[selectedHormone] === idx;
      setResults(newResults);
      setSelectedHormone(null);
      setSelectedDef(null);
    } else {
      setSelectedDef(idx);
    }
  }
  function getButtonStyle(idx: number, isHormone: boolean) {
    const matchIdx = isHormone ? matches[idx] : matches.indexOf(idx);
    const matched = matchIdx !== null && matchIdx !== -1;
    const correct = isHormone ? results[idx] : results[matches.indexOf(idx)];
    if (matched) {
      return {
        background: correct ? '#bbf7d0' : '#fecaca',
        borderColor: correct ? '#22c55e' : '#ef4444',
        color: '#222',
        fontWeight: 600,
      };
    }
    return {};
  }
  return (
    <div className="knowledge-check-container">
      <div className="kc-col kc-hormones">
        {HORMONES.map((h, i) => (
          <button
            key={h.name}
            className={`kc-btn${selectedHormone === i ? ' kc-selected' : ''}`}
            style={{ borderLeft: `6px solid ${h.color}`, ...getButtonStyle(i, true) }}
            disabled={matches[i] !== null}
            onClick={() => handleHormoneClick(i)}
          >
            {h.name}
          </button>
        ))}
      </div>
      <svg className="kc-lines" width="60" height="220">
        {matches.map((defIdx, hIdx) => (
          defIdx !== null ? (
            <line
              key={hIdx}
              x1={0}
              y1={30 + hIdx * 50}
              x2={60}
              y2={30 + defIdx * 50}
              stroke={results[hIdx] ? '#22c55e' : '#ef4444'}
              strokeWidth={3}
              markerEnd="url(#arrow)"
            />
          ) : null
        ))}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L8,4 L0,8" fill="#888" />
          </marker>
        </defs>
      </svg>
      <div className="kc-col kc-defs">
        {DEFINITIONS.map((def, i) => (
          <button
            key={def}
            className={`kc-btn${selectedDef === i ? ' kc-selected' : ''}`}
            style={getButtonStyle(i, false)}
            disabled={matches.includes(i)}
            onClick={() => handleDefClick(i)}
          >
            {def}
          </button>
        ))}
      </div>
    </div>
  );
}

function HormoneGraph() {
  // Hormone colors
  const colors = ['#38bdf8', '#f472b6', '#a78bfa', '#facc15'];
  // More realistic hormone data (FSH, LH, Oestrogen, Progesterone)
  // Each array is 28 days, values 0-1 (normalized for graph)
  // Data based on typical menstrual cycle hormone profiles
  const hormoneData: number[][] = [
  // FSH
  [0.35,0.40,0.45,0.50,0.55,0.58,0.60,0.58,0.55,0.53,0.50,0.58,0.63,0.40,0.30,0.25,0.24,0.23,0.23,0.25,0.30,0.35,0.40,0.45,0.50,0.55,0.60,0.65],
  // LH
  [0.15,0.15,0.15,0.15,0.15,0.15,0.20,0.25,0.28,0.30,0.40,0.60,1.00,0.60,0.20,0.15,0.13,0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.10],
  // Oestrogen
  [0.15,0.18,0.20,0.23,0.25,0.30,0.35,0.40,0.45,0.50,0.48,0.45,0.40,0.35,0.30,0.25,0.23,0.25,0.28,0.30,0.33,0.35,0.38,0.40,0.43,0.40,0.38,0.35],
  // Progesterone
  [0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.08,0.10,0.15,0.25,0.35,0.43,0.50,0.48,0.45,0.43,0.40,0.35,0.30,0.25,0.20,0.15,0.10,0.08],
];


  const width = 420, height = 180, days = 28;
  const padLeft = 8; // was 32
  const padRight = 32;
  const padTop = 32;
  const padBottom = 32;
  // Catmull-Rom to Bezier conversion for smooth, natural lines
  function getCatmullRomPath(arr: number[]): string {
    const points = arr.map((v: number, i: number) => [padLeft + (i * (width - padLeft - padRight) / (days - 1)), height - padBottom - v * (height - padTop - padBottom)]);
    if (points.length < 2) return '';
    let d = `M${points[0][0]},${points[0][1]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
    }
    return d;
  }
  return (
    <div className="hormone-graph-container" style={{flexDirection:'column',alignItems:'center'}}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        className="hormone-graph"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Axes */}
        <line x1={padLeft} y1={height-padBottom} x2={width-padRight} y2={height-padBottom} stroke="#888" strokeWidth={1.5} />
        <line x1={padLeft} y1={padTop} x2={padLeft} y2={height-padBottom} stroke="#888" strokeWidth={1.5} />
        {/* Day ticks */}
        {[0,7,14,21,28].map(d => (
          <text key={d} x={padLeft + (d * (width-padLeft-padRight)/(days-1))} y={height-padBottom+18} fontSize={12} textAnchor="middle" fill="#333">{d}</text>
        ))}
        <text x={width/2} y={height-2} fontSize={13} fill="#333" textAnchor="middle">Day of cycle</text>
        {/* Hormone labels */}
        {['FSH','LH','Oestrogen','Progesterone'].map((h,i) => (
          <text key={h} x={width-padRight+8} y={padTop+18+i*22} fontSize={13} fill={colors[i]}>{h}</text>
        ))}
        {/* Vertical dashed line for ovulation */}
        <line x1={padLeft + (14 * (width-padLeft-padRight)/(days-1))} y1={padTop-6} x2={padLeft + (14 * (width-padLeft-padRight)/(days-1))} y2={height-padBottom+6} stroke="#6366f1" strokeWidth={2} strokeDasharray="6 5" />
        <text x={padLeft + (14 * (width-padLeft-padRight)/(days-1)) + 2} y={padTop-12} fontSize={13} fill="#6366f1">Ovulation</text>
        {/* Hormone smooth lines */}
        {hormoneData.map((arr, i) => (
          <path
            key={i}
            fill="none"
            stroke={colors[i]}
            strokeWidth={3}
            d={getCatmullRomPath(arr)}
            style={{ filter: `drop-shadow(0 0 4px ${colors[i]}55)` }}
          />
        ))}
      </svg>
      {/* New Matching Activity Below Graph */}
      <GraphMatchActivity />
    </div>
  );
}

// --- New Component: GraphMatchActivity ---
const GRAPH_HORMONES = [
  { name: 'FSH', color: '#38bdf8' },
  { name: 'LH', color: '#f472b6' },
  { name: 'Oestrogen', color: '#a78bfa' },
  { name: 'Progesterone', color: '#facc15' },
];
const GRAPH_EXPLANATIONS = [
  'This hormone has a small rise at the start and a gentle bump at ovulation, then falls.', // FSH
  'This hormone surges around day 12 as this is when ovulation happens.', // LH
  'This hormone rises to a peak just before ovulation, dips, then rises again.', // Oestrogen
  'This hormone stays low until after ovulation, then rises and falls.', // Progesterone
];
const GRAPH_CORRECT_MATCHES = [0, 1, 2, 3];

function GraphMatchActivity() {
  const [selectedHormone, setSelectedHormone] = useState<number|null>(null);
  const [selectedDef, setSelectedDef] = useState<number|null>(null);
  const [matches, setMatches] = useState<(number|null)[]>([null, null, null, null]);
  const [results, setResults] = useState<(boolean|null)[]>([null, null, null, null]);

  function handleHormoneClick(idx: number) {
    setSelectedHormone(idx);
  }
  function handleDefClick(idx: number) {
    if (selectedHormone !== null && matches[selectedHormone] === null && !matches.includes(idx)) {
      const newMatches = [...matches];
      newMatches[selectedHormone] = idx;
      setMatches(newMatches);
      const newResults = [...results];
      newResults[selectedHormone] = GRAPH_CORRECT_MATCHES[selectedHormone] === idx;
      setResults(newResults);
      setSelectedHormone(null);
      setSelectedDef(null);
    } else {
      setSelectedDef(idx);
    }
  }
  function getButtonStyle(idx: number, isHormone: boolean) {
    const matchIdx = isHormone ? matches[idx] : matches.indexOf(idx);
    const matched = matchIdx !== null && matchIdx !== -1;
    const correct = isHormone ? results[idx] : results[matches.indexOf(idx)];
    if (matched) {
      return {
        background: correct ? '#bbf7d0' : '#fecaca',
        borderColor: correct ? '#22c55e' : '#ef4444',
        color: '#222',
        fontWeight: 600,
      };
    }
    return {};
  }
  return (
    <div className="knowledge-check-container" style={{marginTop:0, marginBottom:0}}>
      <div className="kc-col kc-hormones">
        {GRAPH_HORMONES.map((h, i) => (
          <button
            key={h.name}
            className={`kc-btn${selectedHormone === i ? ' kc-selected' : ''}`}
            style={{ borderLeft: `6px solid ${h.color}`, ...getButtonStyle(i, true) }}
            disabled={matches[i] !== null}
            onClick={() => handleHormoneClick(i)}
          >
            {h.name}
          </button>
        ))}
      </div>
      <svg className="kc-lines" width="60" height="220">
        {matches.map((defIdx, hIdx) => (
          defIdx !== null ? (
            <line
              key={hIdx}
              x1={0}
              y1={30 + hIdx * 50}
              x2={60}
              y2={30 + defIdx * 50}
              stroke={results[hIdx] ? '#22c55e' : '#ef4444'}
              strokeWidth={3}
              markerEnd="url(#arrow)"
            />
          ) : null
        ))}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L8,4 L0,8" fill="#888" />
          </marker>
        </defs>
      </svg>
      <div className="kc-col kc-defs">
        {GRAPH_EXPLANATIONS.map((def, i) => (
          <button
            key={def}
            className={`kc-btn${selectedDef === i ? ' kc-selected' : ''}`}
            style={getButtonStyle(i, false)}
            disabled={matches.includes(i)}
            onClick={() => handleDefClick(i)}
          >
            {def}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState<'landing' | 'hormones-glands' | 'hormone-match' | 'hormone-levels' | 'fertility-contraception'>('landing');
  const [selected, setSelected] = useState<string | null>(null)
  const [fshActive, setFshActive] = useState(false)
  const [lhActive, setLhActive] = useState(false)
  const [fshGlow, setFshGlow] = useState(false)
  const [lhGlow, setLhGlow] = useState(false)
  const [oestrogenActive, setOestrogenActive] = useState(false)
  const [oestrogenGlow, setOestrogenGlow] = useState(false)
  const [progesteroneActive, setProgesteroneActive] = useState(false)
  const [progesteroneGlow, setProgesteroneGlow] = useState(false)
  const [uterusThick, setUterusThick] = useState(false)

  function handleSelect(gland: string) {
    setSelected(gland)
    if (gland === 'pituitary') {
      setFshActive(false)
      setLhActive(false)
      setFshGlow(false)
      setLhGlow(false)
      setOestrogenActive(false)
      setOestrogenGlow(false)
      setProgesteroneActive(false)
      setProgesteroneGlow(false)
      setUterusThick(false)
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
    } else if (gland === 'ovaries') {
      setOestrogenActive(false)
      setOestrogenGlow(false)
      setProgesteroneActive(false)
      setProgesteroneGlow(false)
      setUterusThick(false)
      setTimeout(() => {
        setOestrogenActive(true)
        setOestrogenGlow(true)
      }, 10)
      setTimeout(() => {
        setOestrogenActive(false)
        setOestrogenGlow(false)
        setProgesteroneActive(true)
        setProgesteroneGlow(true)
      }, 1800)
      setTimeout(() => {
        setProgesteroneActive(false)
        setProgesteroneGlow(false)
        setUterusThick(true)
      }, 3600)
    } else {
      setFshActive(false)
      setLhActive(false)
      setFshGlow(false)
      setLhGlow(false)
      setOestrogenActive(false)
      setOestrogenGlow(false)
      setProgesteroneActive(false)
      setProgesteroneGlow(false)
      setUterusThick(false)
    }
  }

  // Move main content to a new component for clarity
  function HormonesAndGlands() {
    return (
      <>
        <h1>Sex Hormones & Reproductive Glands</h1>
        <div className="main-content">
          <GlandDiagram onSelect={handleSelect} fshActive={fshActive} lhActive={lhActive} oestrogenActive={oestrogenActive} progesteroneActive={progesteroneActive} uterusThick={uterusThick} />
          <Sidebar info={selected ? GLAND_INFO[selected] : null} fshGlow={fshGlow} lhGlow={lhGlow} oestrogenGlow={oestrogenGlow} progesteroneGlow={progesteroneGlow} />
        </div>
      </>
    );
  }

  function HormoneMatch() {
    return (
      <>
        <h1>Hormone Match</h1>
        <KnowledgeCheck />
      </>
    );
  }

  function HormoneLevels() {
    return (
      <>
        <h1>Hormone Levels</h1>
        <HormoneGraph />
      </>
    );
  }

  function FertilityContraception() {
    return (
      <>
        <h1>Fertility and Contraception</h1>
        <div className="sidebar">
          <b>Oral Contraception:</b> Contains oestrogen and progesterone to inhibit FSH production, preventing egg maturation and ovulation.<br /><br />
          <b>Fertility Treatments:</b> Involve giving FSH and LH to stimulate egg release in women who have difficulty ovulating.
        </div>
      </>
    );
  }

  return (
    <div className="container">
      {view === 'landing' && <LandingPage onSelect={setView} />}
      {view === 'hormones-glands' && <><HormonesAndGlands /><button style={{marginTop:24}} onClick={()=>setView('landing')}>Back</button></>}
      {view === 'hormone-match' && <><HormoneMatch /><button style={{marginTop:24}} onClick={()=>setView('landing')}>Back</button></>}
      {view === 'hormone-levels' && <><HormoneLevels /><button style={{marginTop:24}} onClick={()=>setView('landing')}>Back</button></>}
      {view === 'fertility-contraception' && <><FertilityContraception /><button style={{marginTop:24}} onClick={()=>setView('landing')}>Back</button></>}
      {view === 'landing' && <footer><small>GCSE Combined Science | Interactive Revision</small></footer>}
    </div>
  );
}

export default App
