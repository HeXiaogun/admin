import React from 'react';

const TransactionBackground: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 800" /* 调整 viewBox 以适配整个页面 */
      className="transaction-background"
      style={{ width: '100%', height: '100%', position: 'absolute', zIndex: -1 }}
    >
      {/* 背景渐变 */}
      <defs>
        <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6c63ff" />
          <stop offset="100%" stopColor="#a29bfe" />
        </linearGradient>
      </defs>
      <rect width="1440" height="800" fill="url(#bgGradient)" style={{ opacity: 0.5 }} />

      {/* 左侧用户 */}
      <circle cx="300" cy="400" r="80" fill="#e0e0e0" /> {/* 调整为浅灰色 */}
      <rect x="260" y="500" width="80" height="120" rx="15" fill="#e0e0e0" />
      <path d="M270 470 h60 v30 h-60 z" fill="#6c63ff" />
      <circle cx="300" cy="450" r="15" fill="#6c63ff" />

      {/* 左侧电脑 */}
      <rect x="290" y="530" width="30" height="15" fill="#6c63ff" />
      <rect x="270" y="550" width="60" height="40" rx="8" fill="#6c63ff" />

      {/* 右侧用户 */}
      <circle cx="1140" cy="400" r="80" fill="#e0e0e0" /> {/* 调整为浅灰色 */}
      <rect x="1100" y="500" width="80" height="120" rx="15" fill="#e0e0e0" />
      <path d="M1110 470 h60 v30 h-60 z" fill="#6c63ff" />
      <circle cx="1140" cy="450" r="15" fill="#6c63ff" />

      {/* 右侧电脑 */}
      <rect x="1130" y="530" width="30" height="15" fill="#6c63ff" />
      <rect x="1110" y="550" width="60" height="40" rx="8" fill="#6c63ff" />

      {/* 交易箭头 */}
      <path
        d="M500 400 h440 l-30 -15 m30 15 l-30 15"
        stroke="#fff"
        strokeWidth="3"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#fff" />
        </marker>
      </defs>
    </svg>
  );
};

export default TransactionBackground;
