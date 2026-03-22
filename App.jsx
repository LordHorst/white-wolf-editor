import React, { useState } from 'react';
import { Menu, Moon, Flame, Sparkles, Ghost } from 'lucide-react';

// Korrektur der Import-Pfade: In der aktuellen Umgebung liegen die Files 
// meist im selben Verzeichnis oder in einer flachen Struktur.
import VampireSheet from './systems/vampire/VampireSheet';
import WerewolfSheet from './systems/werewolf/WerewolfSheet'; 
import MageSheet from './systems/mage/MageSheet';

/**
 * Hauptkomponente der App.
 * Verwaltet die Navigation zwischen den verschiedenen World of Darkness Systemen.
 * Nutzt die refactored Komponenten, die intern das BaseSheetLayout verwenden.
 */
const App = () => {
  const [activeSystem, setActiveSystem] = useState('vampire');
  const [menuOpen, setMenuOpen] = useState(false);

  // Konfiguration der verfügbaren Spielsysteme
  const systems = [
    {
      id: 'vampire',
      name: 'Vampire: Die Maskerade',
      icon: <Moon size={18} />,
      color: 'hover:text-emerald-400 hover:bg-emerald-900/20',
      accent: 'emerald'
    },
    {
      id: 'werewolf',
      name: 'Werewolf: Die Apokalypse',
      icon: <Flame size={18} />,
      color: 'hover:text-amber-500 hover:bg-amber-900/20',
      accent: 'amber'
    },
    {
      id: 'mage',
      name: 'Magus: Die Erleuchtung',
      icon: <Sparkles size={18} />,
      color: 'hover:text-purple-400 hover:bg-purple-900/20',
      accent: 'purple'
    },
  ];

  // Helper zum Rendern des aktiven Bogens
  const renderActiveSheet = () => {
    // Die Verwendung von eindeutigen Keys stellt sicher, dass React
    // den State beim Systemwechsel sauber zurücksetzt.
    switch (activeSystem) {
      case 'vampire':
        return <VampireSheet key="vampire-sheet" />;
      case 'werewolf':
        return <WerewolfSheet key="werewolf-sheet" />;
      case 'mage':
        return <MageSheet key="mage-sheet" />;
      default:
        return <VampireSheet key="vampire-default" />;
    }
  };

  return (
      <div className="min-h-screen bg-[#020202] text-stone-300 font-sans flex overflow-hidden">

        {/* SEITENLEISTE / NAVIGATION */}
        <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-black border-r border-white/10 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center space-x-3 mb-10">
              <div className="w-8 h-8 bg-gradient-to-br from-red-900 to-black rounded border border-red-600 flex items-center justify-center">
                <Ghost size={16} className="text-red-500" />
              </div>
              <h1 className="font-bold tracking-tighter text-xl text-white">WOD<span className="text-red-600">EDITOR</span></h1>
            </div>

            <nav className="space-y-2 flex-1">
              <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-4 font-bold">Systeme</p>
              {systems.map((sys) => (
                  <button
                      key={sys.id}
                      onClick={() => { setActiveSystem(sys.id); setMenuOpen(false); }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-left transition-all border
                  ${activeSystem === sys.id
                          ? 'bg-white/5 text-white border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                          : `text-stone-400 border-transparent ${sys.color}`}`}
                  >
                    <span className={activeSystem === sys.id ? 'text-white' : ''}>{sys.icon}</span>
                    <span className="text-sm font-medium">{sys.name}</span>
                  </button>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5 text-[9px] text-stone-600 uppercase tracking-widest font-medium">
              World of Darkness Editor v3.1
            </div>
          </div>
        </div>

        {/* MOBILER OVERLAY */}
        {menuOpen && (
            <div className="fixed inset-0 bg-black/80 z-30 backdrop-blur-md lg:hidden" onClick={() => setMenuOpen(false)}></div>
        )}

        {/* HAUPTINHALT / EDITOR BEREICH */}
        <main className="flex-1 h-screen overflow-y-auto relative bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-stone-900/20 via-transparent to-transparent">
          {/* Mobile Menu Button */}
          {!menuOpen && (
              <button
                  onClick={() => setMenuOpen(true)}
                  className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-black/50 border border-white/10 text-stone-400 hover:text-white rounded backdrop-blur-sm shadow-xl"
              >
                <Menu size={20} />
              </button>
          )}

          {/* Container für die Sheets */}
          <div className="pt-16 lg:pt-8 p-4 md:p-12 max-w-6xl mx-auto min-h-full">
            {renderActiveSheet()}
          </div>
        </main>
      </div>
  );
};

export default App;