// systems/vampire/VampireAdvantages.jsx
import React from 'react';
import { DotRating, ListTrait, BackgroundListItem } from '../../components/sheetImports';
import { VampireData, getClanDisciplines } from './vampireData';
import { sumBackgrounds } from '../../utils/characterUtils';
import {
    sumDisciplines,
    sumVirtues,
    getPredefinedBackgrounds,
    getGenerationInfo,
} from './vampireHelpers';

/**
 * Zeigt Disziplinen, Hintergründe und Tugenden für den Vampir-Charakterbogen.
 * Empfängt sharedProps aus BaseSheet:
 *   { character, setCharacter, freebie, showToast, theme }
 */
export const VampireAdvantages = ({ character, setCharacter, freebie, showToast, theme }) => {

    // ─── Disziplinen ─────────────────────────────────────────────────────
    const disciplinesTotal = sumDisciplines(character.advantages.disziplinen);

    const handleDisciplinesChange = (index, name, value) => {
        const newList = [...character.advantages.disziplinen];
        if (name  !== undefined) newList[index] = { ...newList[index], name };
        if (value !== undefined) {
            const oldValue = newList[index].value;
            newList[index] = { ...newList[index], value };
            const newTotal = sumDisciplines(newList);

            if (freebie.freebiesActive) {
                const cost = freebie.getCost('discipline', oldValue, value);
                if (cost > freebie.freebiePoints) {
                    showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                    return;
                }
                setCharacter(p => ({ ...p, advantages: { ...p.advantages, disziplinen: newList } }));
                freebie.spend('discipline', oldValue, value);
            } else {
                if (newTotal <= 3) {
                    setCharacter(p => ({ ...p, advantages: { ...p.advantages, disziplinen: newList } }));
                } else {
                    showToast(`Maximal 3 Punkte in Disziplinen erlaubt (aktuell ${newTotal}).`, 'error');
                }
            }
        } else {
            setCharacter(p => ({ ...p, advantages: { ...p.advantages, disziplinen: newList } }));
        }
    };

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

    // ─── Tugenden ────────────────────────────────────────────────────────
    const virtuesExtra = sumVirtues(character.advantages.tugenden) - 3;

    const handleVirtueChange = (name, newValue) => {
        const oldValue   = character.advantages.tugenden[name];
        if (newValue === oldValue) return;
        const newVirtues = { ...character.advantages.tugenden, [name]: newValue };
        const newTotal   = sumVirtues(newVirtues);

        if (freebie.freebiesActive) {
            const cost = freebie.getCost('virtue', oldValue, newValue);
            if (cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                return;
            }
            setCharacter(p => ({ ...p, advantages: { ...p.advantages, tugenden: newVirtues } }));
            freebie.spend('virtue', oldValue, newValue);
        } else {
            if (newTotal <= 10) {
                setCharacter(p => ({ ...p, advantages: { ...p.advantages, tugenden: newVirtues } }));
            } else {
                showToast('Maximal 7 zusätzliche Punkte für Tugenden (Gesamt max. 10).', 'error');
            }
        }
    };

    // ─── JSX ─────────────────────────────────────────────────────────────
    return (
        <section className="mb-8">
            <h2 className={`text-xl font-bold uppercase tracking-widest text-${theme}-500 text-center py-2 mb-6 bg-${theme}-950/20`}>
                Vorteile
            </h2>
            <div className="grid grid-cols-3 gap-8">

                {/* Disziplinen */}
                <ListTrait
                    block={character.advantages.disziplinen}
                    title={`Disziplinen (${disciplinesTotal}/3)`}
                    theme={theme}
                    onChange={handleDisciplinesChange}
                    max={5}
                />

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
                            backgroundsData={VampireData.backgrounds}
                            theme={theme}
                        />
                    ))}
                </div>

                {/* Tugenden */}
                <div>
                    <h3 className={`text-xs font-bold text-${theme}-700 uppercase mb-4`}>
                        Tugenden ({virtuesExtra}/7)
                    </h3>
                    {Object.entries(character.advantages.tugenden).map(([name, val]) => (
                        <div key={name} className="flex justify-between items-center mb-3">
                            <span className="text-xs">{name}</span>
                            <DotRating
                                theme={theme}
                                value={val}
                                min={1}
                                max={5}
                                onChange={(v) => handleVirtueChange(name, v)}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};