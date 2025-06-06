import './App.css';

type Activity = 'landing' | 'hormones-glands' | 'hormone-match' | 'hormone-levels' | 'fertility-contraception';

function LandingPage({ onSelect }: { onSelect: (activity: Activity) => void }) {
  return (
    <div>
      <h1 className="landing-title" style={{textAlign:'center',marginTop:32,marginBottom:32,fontSize:32,color:'#3730a3',fontWeight:700,letterSpacing:0.5}}>Reproductive Hormones</h1>
      <div className="landing-grid">
        <div className="landing-card" onClick={() => onSelect('hormones-glands')}>
          <h2>Hormones and Glands</h2>
          <p>Explore the main reproductive glands and hormones.</p>
        </div>
        <div className="landing-card" onClick={() => onSelect('hormone-match')}>
          <h2>Hormone Match</h2>
          <p>Test your knowledge by matching hormones to their functions.</p>
        </div>
        <div className="landing-card" onClick={() => onSelect('hormone-levels')}>
          <h2>Hormone Levels</h2>
          <p>Visualize hormone levels throughout the menstrual cycle.</p>
        </div>
        <div className="landing-card" onClick={() => onSelect('fertility-contraception')}>
          <h2>Fertility and Contraception</h2>
          <p>Learn about oral contraception and fertility treatments.</p>
        </div>
      </div>
    </div>
  );
}

export type { Activity };
export default LandingPage;
