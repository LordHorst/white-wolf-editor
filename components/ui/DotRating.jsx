// components/ui/DotRating.jsx
import { themeConfig } from './themes/themes';

export const DotRating = ({ value, max = 5, onChange, min = 0, disabled = false, readOnly = false, theme = "emerald" }) => {
  const t = themeConfig[theme] ?? themeConfig.emerald;

  return (
      <div className={`flex space-x-1.5 items-center ${disabled ? 'opacity-20' : ''}`}>
        {[...Array(max)].map((_, i) => (
            <div
                key={i}
                onClick={() => {
                  if (disabled || readOnly) return;
                  const newVal = i + 1;
                  onChange(newVal === value ? Math.max(min, value - 1) : newVal);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer
            ${i < value
                    ? `${t.accentBorder} ${t.checkedBg} scale-110`
                    : `${t.border} bg-black/40 hover:bg-black/60`
                }`}
            />
        ))}
      </div>
  );
};