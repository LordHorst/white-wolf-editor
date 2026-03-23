// systems/mage/MageAdvantages.jsx
import React from 'react';
import { DotRating } from '../../components/ui/DotRating';
import { BackgroundListItem } from '../../components/ui/BackgroundSection';
import { MageData } from './mageData';
import { sumBackgrounds } from '../../utils/characterUtils';
import { getPredefinedBackgrounds } from './mageRandomizer';

// ─── Hilfsfunktion ───────────────────────────────────────────────────────────
const sumSpheres = (spheres) =>
    Object.values(spheres).reduce((sum, v) => sum + v, 0);

// ─── Komponente ──────────────────────────────────────────────────────────────
/**
 * Zeigt Sphären und Hintergründe für den Mage-Charakterbogen.
 * Empfängt sharedProps aus BaseSheet:
 *   { character, setCharacter, freebie, showToast, theme }
 */
export const MageAdvantages = ({ character, setCharacter, freebie, showToast, theme }) => {

    // ─── Sphären ─────────────────────────────────────────────────────────
    const spheresTotal = sumSpheres(character.advantages.sphären);

    const handleSphereChange = (sphereName, newValue) => {
        const oldValue   = character.advantages.sphären[sphereName];
        if (newValue === oldValue) return;

        const newSpheres = { ...character.advantages.sphären, [sphereName]: newValue };
        const newTotal   = sumSpheres(newSpheres);

        if (freebie.freebiesActive) {
            const cost = freebie.getCost('sphere', oldValue, newValue);
            if (cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                return;
            }
            setCharacter(p => ({ ...p, advantages: { ...p.advantages, sphären: newSpheres } }));
            freebie.spend('sphere', oldValue, newValue);
        } else {
            if (newTotal <= 3) {
                setCharacter(p => ({ ...p, advantages: { ...p.advantages, sphären: newSpheres } }));
            } else {
                showToast(`Maximal 3 Punkte in Sphären erlaubt (aktuell ${newTotal}).`, 'error');
            }
        }
    };

    // ─── Hintergründe ────────────────────────────────────────────────────
    const backgroundsTotal = sumBackgrounds(character.advantages.hintergründe);

    const handleBackgroundsChange = (index, name, value) => {
        const newList = [...character.advantages.hintergründe];
        if (name !== undefined) newList[index] = { ...newList[index], name };

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
            // Nur Name geändert, kein Wert → direkt setzen
            setCharacter(p => ({ ...p, advantages: { ...p.advantages, hintergründe: newList } }));
        }
    };

    // ─── JSX ─────────────────────────────────────────────────────────────
    return (
        <section className="mb-8">
            <h2 className={`text-xl font-bold uppercase tracking-widest text-${theme}-500 text-center py-2 mb-6 bg-${theme}-950/20`}>
                Vorteile
            </h2>

            <div className="grid grid-cols-2 gap-12">

                {/* Sphären */}
                <div>
                    <h3 className={`text-xs font-bold text-${theme}-700 uppercase mb-4 text-center`}>
                        Sphären ({spheresTotal}/3)
                    </h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        {Object.entries(character.advantages.sphären).map(([name, val]) => (
                            <div key={name} className="flex justify-between items-center">
                                <span className="text-xs">{name}</span>
                                <DotRating
                                    theme={theme}
                                    value={val}
                                    max={5}
                                    onChange={(v) => handleSphereChange(name, v)}
                                />
                            </div>
                        ))}
                    </div>
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
                            backgroundsData={MageData.backgrounds}
                            theme={theme}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};