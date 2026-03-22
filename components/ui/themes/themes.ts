export interface ThemeColors {
    bg: string;
    border: string;
    text: string;
    accentBorder: string;
    accentText: string;
    tabActive: string;
    tabInactive: string;
    meritButton: string;
    flawButton: string;
    footerText: string;
    headerButton: string;
    emptyText: string;
    descriptionText: string;
    meritBadge: string;
    flawBadge: string;
    removeButton: string;
    disabledButton: string;
    counterButton: string;
}

export type ThemeName = 'emerald' | 'amber' | 'purple';

export const themeConfig: Record<ThemeName, ThemeColors> = {
    emerald: {
        bg: 'bg-emerald-950/90',
        border: 'border-emerald-800',
        text: 'text-emerald-100',
        accentBorder: 'border-emerald-500',
        accentText: 'text-emerald-300',
        tabActive: 'border-emerald-500 text-emerald-300',
        tabInactive: 'text-emerald-500 hover:text-emerald-300',
        meritButton: 'bg-emerald-800 hover:bg-emerald-700 text-white',
        flawButton: 'bg-rose-800 hover:bg-rose-700 text-white',
        footerText: 'text-emerald-400',
        headerButton: 'text-emerald-400 hover:text-emerald-200',
        emptyText: 'text-emerald-500',
        descriptionText: 'text-emerald-400',
        meritBadge: 'bg-emerald-800 text-emerald-200',
        flawBadge: 'bg-rose-800 text-rose-200',
        removeButton: 'bg-gray-700 hover:bg-gray-600 text-white',
        disabledButton: 'bg-gray-700 opacity-50 cursor-not-allowed',
        counterButton: 'bg-purple-800 hover:bg-purple-700 text-white',
    },
    amber: {
        bg: 'bg-amber-950/90',
        border: 'border-amber-800',
        text: 'text-amber-100',
        accentBorder: 'border-amber-500',
        accentText: 'text-amber-300',
        tabActive: 'border-amber-500 text-amber-300',
        tabInactive: 'text-amber-500 hover:text-amber-300',
        meritButton: 'bg-amber-800 hover:bg-amber-700 text-white',
        flawButton: 'bg-rose-800 hover:bg-rose-700 text-white',
        footerText: 'text-amber-400',
        headerButton: 'text-amber-400 hover:text-amber-200',
        emptyText: 'text-amber-500',
        descriptionText: 'text-amber-400',
        meritBadge: 'bg-amber-800 text-amber-200',
        flawBadge: 'bg-rose-800 text-rose-200',
        removeButton: 'bg-gray-700 hover:bg-gray-600 text-white',
        disabledButton: 'bg-gray-700 opacity-50 cursor-not-allowed',
        counterButton: 'bg-amber-800 hover:bg-amber-700 text-white',
    },
    purple: {
        bg: 'bg-purple-950/90',
        border: 'border-purple-800',
        text: 'text-purple-100',
        accentBorder: 'border-purple-500',
        accentText: 'text-purple-300',
        tabActive: 'border-purple-500 text-purple-300',
        tabInactive: 'text-purple-500 hover:text-purple-300',
        meritButton: 'bg-purple-800 hover:bg-purple-700 text-white',
        flawButton: 'bg-rose-800 hover:bg-rose-700 text-white',
        footerText: 'text-purple-400',
        headerButton: 'text-purple-400 hover:text-purple-200',
        emptyText: 'text-purple-500',
        descriptionText: 'text-purple-400',
        meritBadge: 'bg-purple-800 text-purple-200',
        flawBadge: 'bg-rose-800 text-rose-200',
        removeButton: 'bg-gray-700 hover:bg-gray-600 text-white',
        disabledButton: 'bg-gray-700 opacity-50 cursor-not-allowed',
        counterButton: 'bg-purple-800 hover:bg-purple-700 text-white',
    },
};