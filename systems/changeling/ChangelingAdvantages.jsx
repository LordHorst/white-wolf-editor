// systems/changeling/ChangelingAdvantages.jsx
import React from 'react';
import {BackgroundListItem} from '../../components/sheetImports';
import {sumBackgrounds} from '../../utils/characterUtils';

export const ChangelingAdvantages = ({character, setCharacter, freebie, showToast, theme}) => {
    const backgroundsTotal = sumBackgrounds(character.advantages.hintergründe);

    const handleBackgroundsChange = (index, name, value) => {
        const newList = [...character.advantages.hintergründe];
        if (name !== undefined) newList[index] = {...newList[index], name};
        if (value !== undefined) {
            const oldValue = newList[index].value;
            newList[index] = {...newList[index], value};
            const newTotal = sumBackgrounds(newList);

            if (freebie.freebiesActive) {
                const cost = freebie.getCost('background', oldValue, value);
                if (cost > freebie.freebiePoints) {
                    showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                    return;
                }
                setCharacter(p => ({...p, advantages: {...p.advantages, hintergründe: newList}}));
                freebie.spend('background', oldValue, value);
            } else {
                if (newTotal <= 5) {
                    setCharacter(p => ({...p, advantages: {...p.advantages, hintergründe: newList}}));
                } else {
                    showToast(`Maximal 5 Punkte in Hintergründen erlaubt.`, 'error');
                }
            }
        } else {
            setCharacter(p => ({...p, advantages: {...p.advantages, hintergründe: newList}}));
        }
    };

    return (
        <section className="mb-8">
            <h2 className={`text-xl font-bold uppercase tracking-widest text-${theme}-500 text-center py-2 mb-6 bg-${theme}-950/20`}>
                Vorteile
            </h2>
            <div className="max-w-xs">
                <h3 className={`text-xs font-bold text-${theme}-700 uppercase mb-4`}>
                    Hintergründe ({backgroundsTotal}/5)
                </h3>
                {character.advantages.hintergründe.map((bg, idx) => (
                    <BackgroundListItem
                        key={idx}
                        item={bg}
                        index={idx}
                        onChange={handleBackgroundsChange}
                        theme={theme}
                    />
                ))}
            </div>
        </section>
    );
};