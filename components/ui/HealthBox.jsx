import React from 'react';

export const HealthBox = ({ character, setCharacter, theme }) => {
  // Safety: if health array is missing, render nothing
  const health = character?.status?.gesundheit;
  if (!health || !Array.isArray(health)) {
    return null;
  }

  // Theme styles for the outer container
  const containerStyles = {
    emerald: "border-emerald-900 bg-emerald-950/10 text-emerald-500",
    amber: "border-amber-900 bg-amber-950/10 text-amber-600",
    purple: "border-purple-900 bg-purple-950/10 text-purple-500"
  };
  const containerClass = containerStyles[theme] || containerStyles.emerald;

  // Theme styles for the check boxes (full class names for Tailwind)
  const boxStyles = {
    emerald: {
      checked: "bg-emerald-700 border-emerald-900",
      unchecked: "bg-black/40 border-emerald-900"
    },
    amber: {
      checked: "bg-amber-700 border-amber-900",
      unchecked: "bg-black/40 border-amber-900"
    },
    purple: {
      checked: "bg-purple-700 border-purple-900",
      unchecked: "bg-black/40 border-purple-900"
    }
  };
  const currentBoxStyles = boxStyles[theme] || boxStyles.emerald;

  const handleClick = (index) => {
    const newHealth = health.map((item, idx) => ({
      ...item,
      checked: idx <= index
    }));
    setCharacter(prev => ({
      ...prev,
      status: {
        ...prev.status,
        gesundheit: newHealth
      }
    }));
  };

  return (
      <div className={`p-6 border rounded-lg ${containerClass}`}>
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
                <span className="opacity-60">{h.penalty !== 0 ? h.penalty : ""}</span>
                <div
                    className={`w-5 h-5 border-2 flex items-center justify-center ${
                        h.checked ? currentBoxStyles.checked : currentBoxStyles.unchecked
                    }`}
                >
                  {h.checked && <span className="text-white text-[10px] font-bold">X</span>}
                </div>
              </div>
            </div>
        ))}
      </div>
  );
};