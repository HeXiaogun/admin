import React from 'react';
import './TopWave.css';

const TopWave: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320" /* 恢复正常宽度 */
      className="top-wave"
    >
      <path
        className="wave-path"
        fill="url(#gradient)"
        fillOpacity="1"
        d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,186.7C672,181,768,171,864,154.7C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      ></path>
      <path
        className="wave-path"
        fill="url(#gradient)"
        fillOpacity="1"
        d="M1440,96L1488,112C1536,128,1632,160,1728,176C1824,192,1920,192,2016,186.7C2112,181,2208,171,2304,154.7C2400,139,2496,117,2592,122.7C2688,128,2784,160,2832,176L2880,192L2880,0L2832,0C2784,0,2688,0,2592,0C2496,0,2400,0,2304,0C2208,0,2112,0,2016,0C1920,0,1824,0,1728,0C1632,0,1536,0,1488,0L1440,0Z"
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

export default TopWave;
