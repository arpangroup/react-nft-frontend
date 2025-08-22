import React from 'react';

function ErrorPage({ onRetry }) {
  return (
    <div style={styles.container}>
      {/* Decorative clouds */}
      <div style={styles.clouds}>
        <Cloud style={{ left: '5%', top: '-12px', width: 60, height: 34 }} />
        <Cloud style={{ left: '75%', top: '-2px', width: 40, height: 23 }} />
        <Cloud style={{ left: '65%', top: '55px', width: 35, height: 18 }} />
        <Cloud style={{ left: '25%', top: '35px', width: 46, height: 26 }} />
      </div>

      {/* Wireless icon */}
      <div style={styles.iconContainer}>
        <WirelessIcon />
      </div>

      {/* Text content */}
      <div style={styles.textContainer}>
        <div style={styles.oops}>Oops!</div>
        <div style={styles.title}>No Internet Connection</div>
        <div style={styles.subtitle}>
          Please check your internet connectivity<br />
          and try again
        </div>
      </div>

      {/* Retry button */}
      <button onClick={onRetry} style={styles.button}>Retry</button>
    </div>
  );
}

function Cloud({ style }) {
  // Simple SVG cloud with sad face
  return (
    <svg viewBox="0 0 60 34" style={{ position: 'absolute', ...style }}>
      <ellipse cx="25" cy="23" rx="25" ry="11" fill="none" stroke="#41a1f2" strokeWidth="2" />
      <ellipse cx="45" cy="20" rx="12" ry="8" fill="none" stroke="#41a1f2" strokeWidth="2" />
      <ellipse cx="10" cy="18" rx="8" ry="5" fill="none" stroke="#41a1f2" strokeWidth="2" />
      {/* Sad face */}
      <circle cx="32" cy="30" r="1.5" fill="none" stroke="#41a1f2" strokeWidth="2"/>
      <circle cx="42" cy="29" r="1.5" fill="none" stroke="#41a1f2" strokeWidth="2"/>
      <path d="M34 33 Q37 36 40 33" stroke="#41a1f2" strokeWidth="2" fill="none" />
    </svg>
  );
}

function WirelessIcon() {
  // SVG for wireless icon (simple signal tower)
  return (
    <svg width="58" height="58" viewBox="0 0 58 58">
      <circle cx="29" cy="38" r="3.2" stroke="#343a40" strokeWidth="2.2" fill="#fff" />
      <path d="M18 38 Q29 23 40 38" stroke="#343a40" strokeWidth="2.2" fill="none" />
      <path d="M23.5 38 Q29 31 34.5 38" stroke="#343a40" strokeWidth="2" fill="none" />
      <rect x="27" y="41" width="4" height="13" rx="2" fill="#343a40" />
      <circle cx="29" cy="54.5" r="1.8" fill="#343a40" />
    </svg>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#fff',
    position: 'relative',
    fontFamily: 'system-ui, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    boxSizing: 'border-box'
  },
  clouds: {
    position: 'absolute',
    width: '100%',
    top: '2%',
    left: 0,
    zIndex: 0,
    pointerEvents: 'none',
    height: 110
  },
  iconContainer: {
    marginTop: 95,
    marginBottom: 12,
    zIndex: 1
  },
  textContainer: {
    textAlign: 'center',
    zIndex: 1,
    marginBottom: 18,
  },
  oops: {
    fontSize: 28,
    color: '#a0a0a0',
    fontWeight: 600,
    marginBottom: 7,
    letterSpacing: 0.5
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: '#222',
    marginBottom: 6
  },
  subtitle: {
    fontSize: 16,
    color: '#767676',
    lineHeight: 1.52,
    fontWeight: 400,
  },
  button: {
    marginTop: 12,
    border: 'none',
    borderRadius: 30,
    background: 'linear-gradient(to bottom, #2596ff 70%, #157afe 100%)',
    color: '#fff',
    fontWeight: 600,
    fontSize: 19,
    padding: '10px 42px',
    cursor: 'pointer',
    boxShadow: '0 2px 16px rgba(37,150,255,0.13)'
  }
};

export default ErrorPage;
