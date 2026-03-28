export const getButtonClasses = (t, isActive) =>
    `px-3 py-1 text-xs uppercase tracking-wider rounded border ${
        isActive
            ? `${t.accentText} ${t.border} hover:bg-white/5`
            : `${t.emptyText} border-transparent bg-black/30 cursor-not-allowed`
    }`;