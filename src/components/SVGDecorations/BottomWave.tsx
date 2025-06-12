import React from 'react';
import './BottomWave.css';

const BottomWave: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320" /* 恢复正常宽度 */
      className="bottom-wave"
    >
      <path
        className="wave-path"
        fill="url(#gradient)"
        fillOpacity="1"
        d="M0,224L48,213.3C96,203,192,181,288,165.3C384,149,480,139,576,154.7C672,171,768,213,864,213.3C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
      <path
        className="wave-path"
        fill="url(#gradient)"
        fillOpacity="1"
        d="M1440,224L1488,213.3C1536,203,1632,181,1728,165.3C1824,149,1920,139,2016,154.7C2112,171,2208,213,2304,213.3C2400,213,2496,171,2592,149.3C2688,128,2784,128,2832,128L2880,128L2880,320L2832,320C2784,320,2688,320,2592,320C2496,320,2400,320,2304,320C2208,320,2112,320,2016,320C1920,320,1824,320,1728,320C1632,320,1536,320,1488,320L1440,320Z"
      ></path>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6c63ff" />
          <stop offset="100%" stopColor="#a29bfe" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BottomWave;
