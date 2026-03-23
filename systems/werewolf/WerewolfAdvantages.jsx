// systems/werewolf/WerewolfAdvantages.jsx
import React from 'react';
import { DotRating, BackgroundListItem } from '../../components/sheetImports';
import { WerewolfData } from './werewolfData';
import { sumBackgrounds } from '../../utils/characterUtils';
import { getPredefinedBackgrounds } from './werewolfHelpers';

/**
 * Zeigt Gaben, Hintergründe und Ansehen (Renown) für den Werwolf-Charakterbogen.
 * Empfängt sharedProps aus BaseSheet:
 *   { character, setCharacter, freebie, showToast, theme }
 */
export const WerewolfAdvantages = ({ character, setCharacter, freebie, showToast, theme }) => {

    // ─── Hintergründe ────────────────────────────────────────────────────
    const backgroundsTotal = sumBackgrounds(character.advantages.hintergründe);

    const handleBackgroundsChange = (index, name, value) => {
        const newList = [...character.advantages.hintergründe];
        if (name  !== undefined) newList[index] = { ...newList[index], name };
        if (value !== undefined) {
            const oldValue = newList[index].value;
            newList[index] = { ...newList[index], value };
            const newTotal = sumBackgrounds(newList);

            if (freebie.freebiesActive) {
                const cost = freebie.getCost('background', oldValue, value);
                if (cost > freebie.freebiePoints) {
                    showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                    return;
                }
                setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
                freebie.spend('background', oldValue, value);
            } else {
                if (newTotal <= 5) {
                    setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
                } else {
                    showToast(`Maximal 5 Punkte in Hintergründen erlaubt (aktuell ${newTotal}).`, 'error');
                }
            }
        } else {
            setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
        }
    };

    // ─── Renown ──────────────────────────────────────────────────────────
    const handleRenownChange = (name, oldVal, newVal) => {
        if (freebie.freebiesActive) {
            const cost = freebie.getCost('renown', oldVal, newVal);
            if (cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                return;
            }
            setCharacter(p => ({ ...p, advantages: { ...p.advantages, renown: { ...p.advantages.renown, [name]: newVal } } }));
            freebie.spend('renown', oldVal, newVal);
        } else {
            setCharacter(p => ({ ...p, advantages: { ...p.advantages, renown: { ...p.advantages.renown, [name]: newVal } } }));
        }
    };

    // ─── JSX ─────────────────────────────────────────────────────────────
    return (
        <section className="mb-8">
            <h2 className={`text-xl font-bold uppercase tracking-widest text-${theme}-500 text-center py-2 mb-6 bg-${theme}-950/20`}>
                Vorteile
            </h2>
            <div className="grid grid-cols-3 gap-8">

                {/* Gaben */}
                <div>
                    <h3 className={`text-xs font-bold text-${theme}-700 uppercase mb-4`}>Gaben</h3>
                    {character.advantages.gaben.map((gift, idx) => (
                        <div key={idx} className="mb-2 flex items-center gap-2">
                            <input
                                type="text"
                                value={gift.name}
                                onChange={(e) => {
                                    const newGaben = [...character.advantages.gaben];
                                    newGaben[idx]  = { ...newGaben[idx], name: e.target.value };
                                    setCharacter(p => ({ ...p, advantages: { ...p.advantages, gaben: newGaben } }));
                                }}
                                placeholder="Gabe..."
                                className={`bg-transparent border-b border-${theme}-900 text-${theme}-100 text-sm py-1 flex-1`}
                            />
                        </div>
                    ))}
                </div>

                {/* Hintergründe */}
                <div>
                    <h3 className={`text-xs font-bold text-${theme}-700 uppercase mb-4`}>
                        Hintergründe ({backgroundsTotal}/5)
                    </h3>
                    {character.advantages.hintergründe.map((bg, idx) => (
                        <BackgroundListItem
                            key={idx}
                            item={bg}
                            index={idx}
                            onChange={handleBackgroundsChange}
                            predefinedOptions={getPredefinedBackgrounds()}
                            backgroundsData={WerewolfData.backgrounds}
                            theme={theme}
                        />
                    ))}
                </div>

                {/* Ansehen (Renown) */}
                <div>
                    <h3 className={`text-xs font-bold text-${theme}-700 uppercase mb-4`}>Ansehen</h3>
                    {Object.entries(character.advantages.renown).map(([name, val]) => (
                        <div key={name} className="flex justify-between items-center mb-2">
                            <span className="text-xs">{name}</span>
                            <DotRating
                                theme={theme}
                                value={val}
                                max={5}
                                onChange={(v) => handleRenownChange(name, val, v)}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
