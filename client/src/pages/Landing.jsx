import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/timer');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1 className="hero-title">
          make it count,<br />one day at a time
        </h1>
        <p className="hero-subtitle">stop wondering if you're doing enough.</p>
        <p className="hero-description">
          track your work. see your progress. fight imposter syndrome with actual proof of what you've accomplished.
        </p>
        <button className="btn-primary hero-cta" onClick={handleGetStarted}>
          start making it count
        </button>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3 className="feature-title">track real work</h3>
            <p className="feature-description">
              simple timer for work, study, reading, coding, or writing. no complicated setup, just start and make it count.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">build proof</h3>
            <p className="feature-description">
              see your actual hours invested. visual breakdowns by activity. hard evidence against that voice saying you're not doing enough.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔥</div>
            <h3 className="feature-title">stay consistent</h3>
            <p className="feature-description">
              streaks and goals that actually motivate. customize your targets. celebrate small wins that lead to big changes.
            </p>
          </div>
        </div>
      </section>

      <section className="vision-section">
        <div className="vision-container">
          <div className="vision-text">
            <h2>every session counts</h2>
            <p>
              named after the mico-leão-dourado, one of the world's most endangered primates, 
              micou believes that small, consistent actions create meaningful change.
            </p>
            <p>
              your progress compounds through consistent work, no matter how small each session feels.
            </p>
            <p>
              if we ever get to a point of profitability we'll look into working closely with conservation efforts in Brasil.
            </p>
            <button className="btn-primary vision-cta" onClick={handleGetStarted}>
              join micou
            </button>
          </div>
          <div className="vision-image">
            <span className="placeholder-text">[golden lion tamarin illustration]</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;