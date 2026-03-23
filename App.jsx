import React, { useState } from 'react';
import { Moon, Flame, Sparkles, Wand2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Fairy } from './components/icons/fairy-icon'
import { Changeling, Mage, Vampire, Werewolf } from './systems/Sheets';

const systems = [
  {
    id:       'changeling',
    name:     'Changeling',
    sub:      'The Dreaming',
    icon:     Fairy,
    theme:    'changeling',
    dot:      'bg-sky-400',
    active:   'border-sky-600/60 bg-sky-950/40 text-sky-300',
    inactive: 'border-transparent text-stone-500 hover:border-sky-900/50 hover:bg-sky-950/20 hover:text-sky-400',
  },
  {
    id:       'mage',
    name:     'Mage',
    sub:      'The Ascension',
    icon:     Sparkles,
    theme:    'mage',
    dot:      'bg-purple-500',
    active:   'border-purple-600/60 bg-purple-950/40 text-purple-300',
    inactive: 'border-transparent text-stone-500 hover:border-purple-900/50 hover:bg-purple-950/20 hover:text-purple-400',
  },
  {
    id:       'vampire',
    name:     'Vampire',
    sub:      'The Masquerade',
    icon:     Moon,
    theme:    'emerald',
    dot:      'bg-emerald-500',
    active:   'border-emerald-600/60 bg-emerald-950/40 text-emerald-300',
    inactive: 'border-transparent text-stone-500 hover:border-emerald-900/50 hover:bg-emerald-950/20 hover:text-emerald-400',
  },
  {
    id:       'werewolf',
    name:     'Werewolf',
    sub:      'The Apocalypse',
    icon:     Flame,
    theme:    'sky',
    dot:      'bg-amber-500',
    active:   'border-amber-600/60 bg-amber-950/40 text-amber-300',
    inactive: 'border-transparent text-stone-500 hover:border-amber-900/50 hover:bg-amber-950/20 hover:text-amber-400',
  },
];

const App = () => {
  const [activeSystem, setActiveSystem] = useState('vampire');
  const [collapsed, setCollapsed]       = useState(false);
  
  // Finde das Theme des aktuell gewählten Systems
  const currentTheme = systems.find(s => s.id === activeSystem)?.theme || 'emerald';
  return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-300 font-sans flex">

        {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
        <aside
            className={`
          relative flex-shrink-0 flex flex-col
          bg-[#0d0d0d] border-r border-white/5
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-64'}
        `}
            style={{ minHeight: '100vh' }}
        >
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
               style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
          />

          {/* ── LOGO ─────────────────────────────────────────────────────── */}
          <div className={`relative px-4 pt-6 pb-5 border-b border-white/5 overflow-hidden transition-all duration-300 ${collapsed ? 'px-3' : 'px-5'}`}>
            {!collapsed && (
                <div className="space-y-1">
                  {/* Ornament */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-600 to-transparent" />
                    <span className="text-stone-600 text-[10px]">✦</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-600 to-transparent" />
                  </div>

                  <p className="text-[9px] uppercase tracking-[0.3em] text-stone-600 text-center font-medium">
                    World of Darkness
                  </p>
                  <h1 className="text-center leading-tight">
                <span
                    className="block text-lg font-black uppercase tracking-[0.15em] text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(135deg, #d6d3d1 0%, #78716c 50%, #a8a29e 100%)' }}
                >
                  Character
                </span>
                    <span
                        className="block text-lg font-black uppercase tracking-[0.15em] text-transparent bg-clip-text"
                        style={{ backgroundImage: 'linear-gradient(135deg, #d6d3d1 0%, #78716c 50%, #a8a29e 100%)' }}
                    >
                  Editor
                </span>
                  </h1>

                  {/* Ornament */}
                  <div className="flex items-center gap-2 pt-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-600 to-transparent" />
                    <span className="text-stone-600 text-[10px]">✦</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-600 to-transparent" />
                  </div>
                </div>
            )}

            {/* Collapsed: nur Icon */}
            {collapsed && (
                <div className="flex justify-center py-1">
                  <span className="text-stone-600 text-lg">✦</span>
                </div>
            )}
          </div>

          {/* ── NAVIGATION ───────────────────────────────────────────────── */}
          <nav className="flex-1 py-4 space-y-1 px-2">
            {!collapsed && (
                <p className="text-[9px] uppercase tracking-[0.2em] text-stone-700 px-2 pb-2">
                  Systeme
                </p>
            )}

            {systems.map(({ id, name, sub, icon: Icon, active, inactive, dot }) => {
              const isActive = activeSystem === id;
              return (
                  <button
                      key={id}
                      onClick={() => setActiveSystem(id)}
                      title={collapsed ? `${name}: ${sub}` : undefined}
                      className={`
                  w-full flex items-center gap-3 px-2 py-2.5 rounded
                  border transition-all duration-200 text-left
                  ${isActive ? active : inactive}
                `}
                  >
                    {/* Aktiv-Indikator */}
                    <div className="relative flex-shrink-0 flex items-center justify-center w-7 h-7">
                      {isActive && (
                          <div className={`absolute inset-0 rounded ${dot} opacity-10`} />
                      )}
                      <Icon size={15} className="relative z-10" />
                    </div>

                    {!collapsed && (
                        <div className="min-w-0">
                          <div className="text-xs font-bold tracking-wide leading-tight">{name}</div>
                          <div className="text-[10px] text-stone-600 leading-tight">{sub}</div>
                        </div>
                    )}

                    {/* Aktiver Balken rechts */}
                    {isActive && !collapsed && (
                        <div className={`ml-auto w-0.5 h-6 rounded-full ${dot} opacity-60`} />
                    )}
                  </button>
              );
            })}
          </nav>

          {/* ── VERSION ──────────────────────────────────────────────────── */}
          {!collapsed && (
              <div className="px-4 pb-5 pt-2 border-t border-white/5">
                <p className="text-[9px] text-stone-700 uppercase tracking-widest text-center">
                  v2.1
                </p>
              </div>
          )}

          {/* ── COLLAPSE-BUTTON ───────────────────────────────────────────── */}
          <button
              onClick={() => setCollapsed(c => !c)}
              className="
            absolute -right-3 top-8
            w-6 h-6 rounded-full
            bg-[#1a1a1a] border border-white/10
            flex items-center justify-center
            text-stone-500 hover:text-stone-300
            transition-colors duration-150
            shadow-lg z-10
          "
              title={collapsed ? 'Sidebar ausklappen' : 'Sidebar einklappen'}
          >
            {collapsed
                ? <ChevronRight size={12} />
                : <ChevronLeft  size={12} />
            }
          </button>
        </aside>

        {/* ── HAUPTINHALT ──────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          <div className="p-4 md:p-8 max-w-5xl mx-auto">
            {activeSystem === 'vampire'  && <Vampire theme={currentTheme}/> }
            {activeSystem === 'werewolf' && <Werewolf theme={currentTheme}/> }
            {activeSystem === 'mage'     && <Mage theme={currentTheme}/> }
            {activeSystem === 'changeling' && <Changeling theme={currentTheme}/> }
          </div>
        </main>

      </div>
  );
};

export default App;