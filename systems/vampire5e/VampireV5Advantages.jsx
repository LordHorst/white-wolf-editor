// systems/vampire5e/VampireV5Advantages.jsx
import React from 'react';
import { DotRating, BackgroundListItem } from '../../components/sheetImports';
import { VampireV5Data } from './vampireV5Data';
import { sumBackgrounds } from '../../utils/characterUtils';

export const VampireV5Advantages = ({ character, setCharacter, theme }) => {
    const disciplinesTotal  = character.advantages.disziplinen.reduce((s, d) => s + d.value, 0);
    const backgroundsTotal  = sumBackgrounds(character.advantages.hintergründe);

    const handleDisciplineChange = (index, name, value) => {
        const newList = [...character.advantages.disziplinen];
        if (name  !== undefined) newList[index] = { ...newList[index], name };
        if (value !== undefined) newList[index] = { ...newList[index], value };
        setCharacter(p => ({ ...p, advantages: { ...p.advantages, disziplinen: newList } }));
    };

    const handleBackgroundChange = (index, name, value) => {
        const newList = [...character.advantages.hintergründe];
        if (name  !== undefined) newList[index] = { ...newList[index], name };
        if (value !== undefined) newList[index] = { ...newList[index], value };
        setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
    };

    return (
        <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-center py-2 mb-6 text-red-400 border-y border-red-900/50">
                Vorteile
            </h2>
            <div className="grid grid-cols-2 gap-12">
                {/* Disziplinen */}
                <div>
                    <h3 className="text-xs font-bold uppercase text-red-700 mb-4">
                        Disziplinen ({disciplinesTotal}/3)
                    </h3>
                    {character.advantages.disziplinen.map((disc, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-3">
                            <select
                                value={disc.name}
                                onChange={(e) => handleDisciplineChange(idx, e.target.value, undefined)}
                                className="bg-transparent border-b border-red-900 text-red-100 text-sm py-1 flex-1"
                            >
                                <option value="" className="bg-black">Wähle...</option>
                                {VampireV5Data.disciplines.map(d => (
                                    <option key={d} value={d} className="bg-black">{d}</option>
                                ))}
                            </select>
                            <DotRating
                                theme={theme}
                                value={disc.value}
                                max={5}
                                onChange={(v) => handleDisciplineChange(idx, undefined, v)}
                            />
                        </div>
                    ))}
                </div>

                {/* Hintergründe */}
                <div>
                    <h3 className="text-xs font-bold uppercase text-red-700 mb-4">
                        Hintergründe ({backgroundsTotal}/7)
                    </h3>
                    {character.advantages.hintergründe.map((bg, idx) => (
                        <BackgroundListItem
                            key={idx}
                            item={bg}
                            index={idx}
                            onChange={handleBackgroundChange}
                            theme={theme}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
