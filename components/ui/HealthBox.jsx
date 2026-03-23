import React from 'react';
import { themeConfig } from './themes/themes';

export const HealthBox = ({ character, setCharacter, theme = 'emerald' }) => {
  const health = character?.status?.gesundheit;
  if (!health || !Array.isArray(health)) return null;

  const t = themeConfig[theme] ?? themeConfig.default;

  const handleClick = (index) => {
    // Find the highest checked index
    const maxCheckedIndex = health.reduce((max, item, idx) =>
        item.checked ? idx : max, -1
    );

    let newHealth;
    if (index === maxCheckedIndex) {
      // Uncheck this box and all higher ones
      newHealth = health.map((item, idx) => ({
        ...item,
        checked: idx < index,
      }));
    } else {
      // Check this box and all lower ones
      newHealth = health.map((item, idx) => ({
        ...item,
        checked: idx <= index,
      }));
    }

    setCharacter(prev => ({
      ...prev,
      status: { ...prev.status, gesundheit: newHealth },
    }));
  };

  return (
      <div className={`p-6 border rounded-lg ${t.border} ${t.bg} ${t.accentText}`}>
        <h3 className="text-[11px] font-bold uppercase mb-6 text-center italic">Gesundheit</h3>
        {health.map((h, i) => (
            <div
                key={i}
                className="flex justify-between items-center text-xs mb-3 cursor-pointer group"
                onClick={() => handleClick(i)}
            >
          <span className="font-semibold text-stone-400 group-hover:text-stone-200">
            {h.label}
          </span>
              <div className="flex items-center space-x-4">
                <span className="opacity-60">{h.penalty !== 0 ? h.penalty : ''}</span>
                <div className={`w-5 h-5 border-2 flex items-center justify-center ${t.border} ${h.checked ? t.checkedBg : 'bg-black/40'}`}>
                  {h.checked && <span className="text-white text-[10px] font-bold">X</span>}
                </div>
              </div>
            </div>
        ))}
      </div>
  );
};