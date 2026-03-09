import React, { useState, useEffect } from 'react';
import { Plus, Minus, Shield, Heart, Zap, Moon } from 'lucide-react';

const App = () => {
  // Initialer State basierend auf dem PDF-Layout
  const [character, setCharacter] = useState({
    info: {
      name: "", spieler: "", chronik: "",
      wesen: "", verhalten: "", clan: "",
      generation: "", zuflucht: "", konzept: ""
    },
    attributes: {
      körperlich: { körperkraft: 1, geschick: 1, widerstandsfähigkeit: 1 },
      gesellschaftlich: { charisma: 1, manipulation: 1, erscheinungsbild: 1 },
      geistig: { wahrnehmung: 1, intelligenz: 1, geistesschärfe: 1 }
    },
    abilities: {
      talente: {
        ausdruck: 0, aufmerksamkeit: 0, ausflüchte: 0, ausweichen: 0,
        einschüchtern: 0, empathie: 0, führungsqualitäten: 0, handgemenge: 0,
        sportlichkeit: 0, szenekenntnis: 0
      },
      fertigkeiten: {
        etikette: 0, fahren: 0, handwerk: 0, heimlichkeit: 0, nahkampf: 0,
        schusswaffen: 0, sicherheit: 0, tierkunde: 0, überleben: 0, vortrag: 0
      },
      kenntnisse: {
        akademisches_wissen: 0, computer: 0, finanzen: 0, gesetzeskenntnis: 0,
        linguistik: 0, medizin: 0, nachforschungen: 0, naturwissenschaften: 0,
        okkultismus: 0, politik: 0
      }
    },
    advantages: {
      disziplinen: [{ name: "", value: 0 }],
      hintergründe: [{ name: "", value: 0 }],
      tugenden: { gewissen: 1, selbstbeherrschung: 1, mut: 1 }
    },
    status: {
      menschlichkeit: 7,
      willenskraft: { gesamt: 5, aktuell: 5 },
      blutvorrat: 10,
      gesundheit: [
        { label: "Blaue Flecken", penalty: 0, checked: false },
        { label: "Verletzt", penalty: -1, checked: false },
        { label: "Schwer Verletzt", penalty: -1, checked: false },
        { label: "Verwundet", penalty: -2, checked: false },
        { label: "Schwer Verwundet", penalty: -2, checked: false },
        { label: "Verkrüppelt", penalty: -5, checked: false },
        { label: "Außer Gefecht", penalty: "X", checked: false },
      ]
    }
  });

  // Komponente für die klickbaren Punkte
  const DotRating = ({ value, max = 5, onChange, min = 0 }) => {
    return (
      <div className="flex space-x-1 items-center">
        {[...Array(max)].map((_, i) => (
          <div
            key={i}
            onClick={() => {
              const newValue = i + 1;
              onChange(newValue === value ? Math.max(min, value - 1) : newValue);
            }}
            className={`w-3.5 h-3.5 rounded-full border border-red-900 cursor-pointer transition-colors
              ${i < value ? 'bg-red-700 shadow-inner' : 'bg-transparent'}`}
          />
        ))}
      </div>
    );
  };

  const handleInfoChange = (field, val) => {
    setCharacter(prev => ({ ...prev, info: { ...prev.info, [field]: val } }));
  };

  const updateStat = (category, sub, field, val) => {
    setCharacter(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [sub]: { ...prev[category][sub], [field]: val }
      }
    }));
  };

  const updateHealth = (index) => {
    const newHealth = [...character.status.gesundheit];
    newHealth[index].checked = !newHealth[index].checked;
    setCharacter(prev => ({ ...prev, status: { ...prev.status, gesundheit: newHealth } }));
  };

  const addListEntry = (category, listName) => {
    setCharacter(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [listName]: [...prev[category][listName], { name: "", value: 0 }]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 p-4 md:p-8 font-serif">
      <div className="max-w-5xl mx-auto border-4 border-red-900 bg-stone-900 p-6 shadow-2xl relative overflow-hidden">
        {/* Dekorativer Hintergrund-Effekt */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Moon size={200} className="text-red-600" />
        </div>

        <header className="text-center mb-8 border-b border-red-900 pb-4">
          <h1 className="text-5xl font-bold tracking-widest text-red-700 uppercase mb-2">Vampire</h1>
          <p className="text-xl italic tracking-widest opacity-70">Die Maskerade — Charakterbogen</p>
        </header>

        {/* Kopfzeile / Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Object.entries(character.info).map(([key, val]) => (
            <div key={key} className="flex flex-col border-b border-stone-700">
              <label className="text-xs uppercase text-red-500 font-bold">{key}</label>
              <input
                type="text"
                value={val}
                onChange={(e) => handleInfoChange(key, e.target.value)}
                className="bg-transparent outline-none border-none py-1 focus:text-white transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Hauptsektionen */}
        <div className="space-y-12">
          
          {/* Attribute */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-red-800 mb-4 text-center uppercase tracking-widest">Attribute</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(character.attributes).map(([cat, fields]) => (
                <div key={cat}>
                  <h3 className="text-sm font-bold text-red-600 uppercase mb-2 border-b border-stone-700">{cat}</h3>
                  {Object.entries(fields).map(([name, val]) => (
                    <div key={name} className="flex justify-between items-center mb-2">
                      <span className="capitalize text-sm">{name}</span>
                      <DotRating value={val} min={1} onChange={(v) => updateStat('attributes', cat, name, v)} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Fähigkeiten */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-red-800 mb-4 text-center uppercase tracking-widest">Fähigkeiten</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(character.abilities).map(([cat, fields]) => (
                <div key={cat}>
                  <h3 className="text-sm font-bold text-red-600 uppercase mb-2 border-b border-stone-700">{cat}</h3>
                  {Object.entries(fields).map(([name, val]) => (
                    <div key={name} className="flex justify-between items-center mb-2">
                      <span className="capitalize text-sm">{name.replace('_', ' ')}</span>
                      <DotRating value={val} onChange={(v) => updateStat('abilities', cat, name, v)} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Vorteile & Disziplinen */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <section className="md:col-span-2">
              <h2 className="text-2xl font-bold border-b-2 border-red-800 mb-4 uppercase tracking-widest">Vorteile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center border-b border-stone-700 mb-2">
                    <h3 className="text-sm font-bold text-red-600 uppercase">Disziplinen</h3>
                    <button onClick={() => addListEntry('advantages', 'disziplinen')} className="hover:text-red-500"><Plus size={16}/></button>
                  </div>
                  {character.advantages.disziplinen.map((d, i) => (
                    <div key={i} className="flex justify-between items-center mb-2">
                      <input 
                        className="bg-transparent border-b border-stone-800 text-sm outline-none w-2/3" 
                        placeholder="..." 
                        value={d.name}
                        onChange={(e) => {
                          const newList = [...character.advantages.disziplinen];
                          newList[i].name = e.target.value;
                          setCharacter(p => ({ ...p, advantages: { ...p.advantages, disziplinen: newList } }));
                        }}
                      />
                      <DotRating value={d.value} onChange={(v) => {
                        const newList = [...character.advantages.disziplinen];
                        newList[i].value = v;
                        setCharacter(p => ({ ...p, advantages: { ...p.advantages, disziplinen: newList } }));
                      }} />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex justify-between items-center border-b border-stone-700 mb-2">
                    <h3 className="text-sm font-bold text-red-600 uppercase">Hintergründe</h3>
                    <button onClick={() => addListEntry('advantages', 'hintergründe')} className="hover:text-red-500"><Plus size={16}/></button>
                  </div>
                  {character.advantages.hintergründe.map((h, i) => (
                    <div key={i} className="flex justify-between items-center mb-2">
                      <input 
                        className="bg-transparent border-b border-stone-800 text-sm outline-none w-2/3" 
                        placeholder="..." 
                        value={h.name}
                        onChange={(e) => {
                          const newList = [...character.advantages.hintergründe];
                          newList[i].name = e.target.value;
                          setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
                        }}
                      />
                      <DotRating value={h.value} onChange={(v) => {
                        const newList = [...character.advantages.hintergründe];
                        newList[i].value = v;
                        setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Tugenden */}
            <section>
              <h2 className="text-2xl font-bold border-b-2 border-red-800 mb-4 uppercase tracking-widest">Tugenden</h2>
              {Object.entries(character.advantages.tugenden).map(([name, val]) => (
                <div key={name} className="flex justify-between items-center mb-4">
                  <span className="capitalize text-sm font-bold">{name}</span>
                  <DotRating value={val} min={1} onChange={(v) => updateStat('advantages', 'tugenden', name, v)} />
                </div>
              ))}
            </section>
          </div>

          {/* Status-Bereich (Menschlichkeit, Willenskraft, Blutvorrat, Gesundheit) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-red-900">
            
            <div className="space-y-8">
              {/* Menschlichkeit */}
              <div>
                <h3 className="text-sm font-bold text-red-600 uppercase mb-2 border-b border-stone-700">Menschlichkeit / Pfad</h3>
                <div className="flex justify-center py-2">
                  <DotRating value={character.status.menschlichkeit} max={10} onChange={(v) => setCharacter(p => ({ ...p, status: { ...p.status, menschlichkeit: v } }))} />
                </div>
              </div>

              {/* Willenskraft */}
              <div>
                <h3 className="text-sm font-bold text-red-600 uppercase mb-2 border-b border-stone-700 flex justify-between">
                  <span>Willenskraft</span>
                  <span className="text-xs">{character.status.willenskraft.aktuell} / {character.status.willenskraft.gesamt}</span>
                </h3>
                <div className="flex justify-center py-2">
                  <DotRating value={character.status.willenskraft.gesamt} max={10} onChange={(v) => setCharacter(p => ({ ...p, status: { ...p.status, willenskraft: { ...p.status.willenskraft, gesamt: v } } }))} />
                </div>
                <div className="flex justify-center space-x-1 mt-2">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setCharacter(p => ({ ...p, status: { ...p.status, willenskraft: { ...p.status.willenskraft, aktuell: i < character.status.willenskraft.gesamt ? i + 1 : p.status.willenskraft.aktuell } } }))}
                      className={`w-6 h-6 border flex items-center justify-center cursor-pointer border-stone-600 ${i < character.status.willenskraft.aktuell ? 'bg-stone-200 text-stone-900' : ''}`}
                    >
                      {i < character.status.willenskraft.gesamt && <div className="text-[8px] font-sans">☐</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Blutvorrat */}
              <div>
                <h3 className="text-sm font-bold text-red-600 uppercase mb-2 border-b border-stone-700">Blutvorrat</h3>
                <div className="grid grid-cols-10 gap-1 py-2">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i}
                      onClick={() => setCharacter(p => ({ ...p, status: { ...p.status, blutvorrat: i + 1 === p.status.blutvorrat ? i : i + 1 } }))}
                      className={`h-4 border border-red-900 rounded-sm cursor-pointer transition-all ${i < character.status.blutvorrat ? 'bg-red-600 scale-95' : 'bg-stone-800'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Gesundheit */}
            <div className="bg-stone-800/30 p-4 border border-stone-700">
              <h3 className="text-sm font-bold text-red-600 uppercase mb-4 border-b border-stone-700 flex items-center">
                <Heart size={16} className="mr-2" /> Gesundheit
              </h3>
              <div className="space-y-2">
                {character.status.gesundheit.map((h, i) => (
                  <div key={i} className="flex justify-between items-center text-xs group">
                    <div className="flex-1 flex justify-between pr-4 items-center">
                      <span className="font-bold">{h.label}</span>
                      <span className="text-red-500 opacity-60 italic">{h.penalty !== 0 ? (h.penalty === 'X' ? 'A.G.' : h.penalty) : ''}</span>
                    </div>
                    <div 
                      onClick={() => updateHealth(i)}
                      className={`w-5 h-5 border-2 border-red-900 flex items-center justify-center cursor-pointer transition-all
                        ${h.checked ? 'bg-red-700 rotate-45 scale-110' : 'bg-transparent hover:border-red-500'}`}
                    >
                      {h.checked && <div className="-rotate-45 text-white font-bold">/</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <footer className="mt-12 text-[10px] text-stone-500 text-center uppercase tracking-tighter">
          Vampire: The Masquerade © White Wolf Publishing. Dieser Editor dient nur dem persönlichen Gebrauch.
        </footer>
      </div>
    </div>
  );
};

export default App;
