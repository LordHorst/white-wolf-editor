// systems/werewolf/werewolfConfig.js
import React from 'react';
import { getEmptyWerewolf } from '../../data/templates';
import { SharedData } from '../../data/sharedData';
import { WerewolfData, WerewolfMerits, WerewolfFlaws } from './werewolfData';
import { WerewolfAdvantages } from './WerewolfAdvantages';
import { WerewolfStatus } from './WerewolfStatus';
import { randomizeCharacter } from './werewolfRandomizer';

export const werewolfConfig = {
    systemId:  'wta',
    title:     'Werewolf',
    subtitle:  'The Apocalypse',
    theme:     'amber',
    bgColor:   '#080501',

    freebieCount: 15,
    freebieCosts: {
        attribute: 5, ability: 2, background: 1,
        renown: 2, rage: 2, gnosis: 2, willpower: 1,
    },

    getEmptyCharacter: getEmptyWerewolf,
    meritsList: WerewolfMerits,
    flawsList:  WerewolfFlaws,

    // Werewolf hat keine Caps ohne Freebies und kein excludeAttrField
    attrCapWithoutFreebies:    null,
    abilityCapWithoutFreebies: null,

    // ── Render-Funktionen ────────────────────────────────────────────────

    renderRules: () => (
        <>
            <p><strong>📜 Attribut-Punkteverteilung</strong><br />Jeder Charakter beginnt mit 1 Punkt in jedem Attribut. Zusätzlich werden 7, 5 und 3 Punkte auf die drei Kategorien verteilt.</p>
            <p><strong>⚙️ Fähigkeiten-Punkteverteilung</strong><br />Alle Fähigkeiten starten bei 0. Die drei Gruppen erhalten 13, 9 und 5 Punkte.</p>
            <p><strong>✨ Vorteile</strong><br /><strong>Gaben:</strong> je eine aus Rasse, Vorzeichen und Stamm. <strong>Hintergründe:</strong> 5 Punkte.</p>
            <p><strong>⭐ Freebies</strong><br />15 Punkte. Attribut 5, Fähigkeit 2, Hintergrund 1, Ansehen 2, Zorn 2, Gnosis 2, Willenskraft 1 pro Punkt.</p>
        </>
    ),

    renderInfoField: (key, val, { character, setCharacter, theme }) => {
        const set = (patch) => setCharacter(p => ({ ...p, info: { ...p.info, ...patch } }));

        if (key === 'Stamm') return (
            <select value={val} onChange={(e) => set({ Stamm: e.target.value })}
                className={`bg-transparent text-${theme}-100 outline-none py-1 cursor-pointer`}>
                <option value="" className="bg-black">Wähle...</option>
                {WerewolfData.tribes.map(t => <option key={t} value={t} className="bg-black">{t}</option>)}
            </select>
        );

        if (key === 'Vorzeichen') return (
            <select value={val} onChange={(e) => set({ Vorzeichen: e.target.value })}
                className={`bg-transparent text-${theme}-100 outline-none py-1 cursor-pointer`}>
                <option value="" className="bg-black">Wähle...</option>
                {WerewolfData.auspices.map(a => <option key={a} value={a} className="bg-black">{a}</option>)}
            </select>
        );

        if (key === 'Rasse') return (
            <select value={val} onChange={(e) => set({ Rasse: e.target.value })}
                className={`bg-transparent text-${theme}-100 outline-none py-1 cursor-pointer`}>
                <option value="" className="bg-black">Wähle...</option>
                {WerewolfData.breeds.map(b => <option key={b} value={b} className="bg-black">{b}</option>)}
            </select>
        );

        if (key === 'Konzept') return (
            <>
                <input list="wta-concepts" value={val}
                    onChange={(e) => set({ Konzept: e.target.value })}
                    className={`bg-transparent text-${theme}-100 outline-none py-1`} />
                <datalist id="wta-concepts">
                    {SharedData.concepts?.map((c, i) => <option key={i} value={c} />)}
                </datalist>
            </>
        );

        if (key === 'Wesen') return (
            <>
                <input list="wta-natures" value={val}
                    onChange={(e) => set({ Wesen: e.target.value })}
                    className={`bg-transparent text-${theme}-100 outline-none py-1`} />
                <datalist id="wta-natures">
                    {SharedData.natures?.map((n, i) => <option key={i} value={n} />)}
                </datalist>
            </>
        );

        if (key === 'Verhalten') return (
            <>
                <input list="wta-demeanors" value={val}
                    onChange={(e) => set({ Verhalten: e.target.value })}
                    className={`bg-transparent text-${theme}-100 outline-none py-1`} />
                <datalist id="wta-demeanors">
                    {SharedData.demeanors?.map((d, i) => <option key={i} value={d} />)}
                </datalist>
            </>
        );

        return (
            <input type="text" value={val} onChange={(e) => set({ [key]: e.target.value })}
                className={`bg-transparent outline-none py-1 text-${theme}-100`} />
        );
    },

    renderAdvantages: (sharedProps) => <WerewolfAdvantages {...sharedProps} />,
    renderStatus:     (sharedProps) => <WerewolfStatus     {...sharedProps} />,
    onRandomize:      randomizeCharacter,
};
