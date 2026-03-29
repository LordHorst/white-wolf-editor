import React, {useState} from 'react';
import {ChevronLeft, ChevronRight, Crosshair, Droplets, Flame, Moon, Sparkles} from 'lucide-react';
import {Fairy} from './components/icons/fairy-icon'
import {Changeling, Hunter, Mage, Vampire, VampireV5, Werewolf} from './systems/Sheets';

const SYSTEM_GROUPS = [
    {
        label: 'Classic World of Darkness',
        systems: [
            {
                id: 'vampire',
                name: 'Vampire',
                sub: 'The Masquerade',
                icon: Moon,
                dot: 'bg-emerald-500',
                active: 'border-emerald-600/60 bg-emerald-950/40 text-emerald-300',
                inactive: 'border-transparent text-stone-500 hover:border-emerald-900/50 hover:bg-emerald-950/20 hover:text-emerald-400',
                theme: 'vampire'
            },
            {
                id: 'werewolf',
                name: 'Werewolf',
                sub: 'The Apocalypse',
                icon: Flame,
                dot: 'bg-amber-500',
                active: 'border-amber-600/60 bg-amber-950/40 text-amber-300',
                inactive: 'border-transparent text-stone-500 hover:border-amber-900/50 hover:bg-amber-950/20 hover:text-amber-400',
                theme: 'werewolf'
            },
            {
                id: 'mage',
                name: 'Mage',
                sub: 'The Ascension',
                icon: Sparkles,
                dot: 'bg-purple-500',
                active: 'border-purple-600/60 bg-purple-950/40 text-purple-300',
                inactive: 'border-transparent text-stone-500 hover:border-purple-900/50 hover:bg-purple-950/20 hover:text-purple-400',
                theme: 'mage'
            },
            {
                id: 'changeling',
                name: 'Changeling',
                sub: 'The Dreaming',
                icon: Fairy,
                dot: 'bg-sky-400',
                active: 'border-sky-600/60 bg-sky-950/40 text-sky-300',
                inactive: 'border-transparent text-stone-500 hover:border-sky-900/50 hover:bg-sky-950/20 hover:text-sky-400',
                theme: 'changeling'
            },
            {
                id: 'hunter',
                name: 'Hunter',
                sub: 'The Reckoning',
                icon: Crosshair,
                dot: 'bg-red-400',
                active: 'border-amber-600/60 bg-amber-950/40 text-red-300',
                inactive: 'border-transparent text-stone-500 hover:border-amber-900/50 hover:bg-red-950/20 hover:text-red-400',
                theme: 'hunter'
            },
        ],
    },
    {
        label: 'World of Darkness 5th Edition',
        systems: [
            {
                id: 'vampire5e',
                name: 'Vampire',
                sub: 'The Masquerade V5',
                icon: Droplets,
                dot: 'bg-red-600',
                active: 'border-red-700/60 bg-red-950/40 text-red-300',
                inactive: 'border-transparent text-stone-500 hover:border-red-900/50 hover:bg-red-950/20 hover:text-red-400',
                theme: 'vampire5e'
            },
        ],
    },
];

const App = () => {
    const [activeSystem, setActiveSystem] = useState('vampire');
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-stone-300 font-sans flex">
            <aside
                className={`relative flex-shrink-0 flex flex-col bg-[#0d0d0d] border-r border-white/5 transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-64'}`}
                style={{minHeight: '100vh'}}>
                {/* LOGO */}
                <div
                    className={`border-b border-white/5 overflow-hidden transition-all duration-300 ${collapsed ? 'px-3 pt-6 pb-5' : 'px-5 pt-6 pb-5'}`}>
                    {!collapsed ? (
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 mb-3">
                                <div
                                    className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-600 to-transparent"/>
                                <span className="text-stone-600 text-[10px]">✦</span>
                                <div
                                    className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-600 to-transparent"/>
                            </div>
                            <p className="text-[9px] uppercase tracking-[0.3em] text-red-600 text-center">World of
                                Darkness</p>
                            {['Character', 'Editor'].map(w => (
                                <span key={w}
                                      className="block text-lg font-serif uppercase tracking-[0.15em] text-center text-transparent bg-clip-text font-mono"
                                      style={{backgroundImage: 'linear-gradient(135deg,#d6d3d1 0%,#78716c 50%,#a8a29e 100%)'}}>{w}</span>
                            ))}
                            <div className="flex items-center gap-2 pt-2">
                                <div
                                    className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-600 to-transparent"/>
                                <span className="text-stone-600 text-[10px]">✦</span>
                                <div
                                    className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-600 to-transparent"/>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center py-1"><span className="text-stone-600 text-lg">✦</span>
                        </div>
                    )}
                </div>

                {/* NAV */}
                <nav className="flex-1 py-4 px-2 space-y-4 overflow-y-auto">
                    {SYSTEM_GROUPS.map((group) => (
                        <div key={group.label}>
                            {!collapsed
                                ?
                                <p className="text-[9px] uppercase tracking-[0.2em] text-stone-700 px-2 pb-1">{group.label}</p>
                                : <div className="border-t border-white/5 my-1"/>
                            }
                            <div className="space-y-1">
                                {group.systems.map(({id, name, sub, icon: Icon, active, inactive, dot}) => {
                                    const isActive = activeSystem === id;
                                    return (
                                        <button key={id} onClick={() => setActiveSystem(id)}
                                                title={collapsed ? `${name}: ${sub}` : undefined}
                                                className={`w-full flex items-center gap-3 px-2 py-2.5 rounded border transition-all duration-200 text-left ${isActive ? active : inactive}`}>
                                            <div
                                                className="relative flex-shrink-0 flex items-center justify-center w-7 h-7">
                                                {isActive &&
                                                    <div className={`absolute inset-0 rounded ${dot} opacity-10`}/>}
                                                <Icon size={15} className="relative z-10"/>
                                            </div>
                                            {!collapsed && (
                                                <div className="min-w-0">
                                                    <div
                                                        className="text-xs font-bold tracking-wide leading-tight">{name}</div>
                                                    <div
                                                        className="text-[10px] text-stone-600 leading-tight">{sub}</div>
                                                </div>
                                            )}
                                            {isActive && !collapsed &&
                                                <div className={`ml-auto w-0.5 h-6 rounded-full ${dot} opacity-60`}/>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {!collapsed && <div className="px-4 pb-5 pt-2 border-t border-white/5"><p
                    className="text-[9px] text-stone-700 uppercase tracking-widest text-center">v2.2</p></div>}

                <button onClick={() => setCollapsed(c => !c)}
                        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-stone-500 hover:text-stone-300 transition-colors shadow-lg z-10">
                    {collapsed ? <ChevronRight size={12}/> : <ChevronLeft size={12}/>}
                </button>
            </aside>

            <main className="flex-1 min-w-0">
                <div className="p-4 md:p-8 max-w-5xl mx-auto">
                    {activeSystem === 'changeling' && <Changeling/>}
                    {activeSystem === 'vampire' && <Vampire/>}
                    {activeSystem === 'werewolf' && <Werewolf/>}
                    {activeSystem === 'mage' && <Mage/>}
                    {activeSystem === 'hunter' && <Hunter/>}
                    {activeSystem === 'vampire5e' && <VampireV5/>}
                </div>
            </main>
        </div>
    );
};

export default App;
