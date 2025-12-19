import React from 'react';

const Logo = ({ className = "", size = "default" }) => {
  const sizes = {
    small: { height: 40, fontSize: 16 },
    default: { height: 50, fontSize: 20 },
    large: { height: 60, fontSize: 24 }
  };

  const { height, fontSize } = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        width={height} 
        height={height} 
        viewBox="0 0 50 50" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lightning bolt symbol for electrical services */}
        <circle cx="25" cy="25" r="24" fill="#2563eb" stroke="#1e40af" strokeWidth="2"/>
        <path 
          d="M28 10L18 28H25L22 40L32 22H25L28 10Z" 
          fill="#fbbf24" 
          stroke="#f59e0b" 
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex flex-col">
        <span className="font-bold text-gray-900" style={{ fontSize: fontSize }}>
          ИП Рогоянов
        </span>
        <span className="text-xs text-gray-600 -mt-1">
          Электромонтажные работы
        </span>
      </div>
    </div>
  );
};

export default Logo;
