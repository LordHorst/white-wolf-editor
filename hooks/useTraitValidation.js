import { useCallback, useMemo } from 'react';
import {
    calculateGroupBonusPoints,
    getGroupLimits,
    calculateAbilityTotals,
    getAbilityLimits,
} from '../utils/characterUtils';

/**
 * useTraitValidation
 *
 * Kapselt die Validierungslogik für Attribute und Fähigkeiten, die in allen
 * drei Bögen (Vampire, Werewolf, Mage) nahezu identisch war.
 *
 * @param {object} options
 * @param {object}   options.character         - Das aktuelle Charakterobjekt
 * @param {function} options.updateStat        - Aus useCharacterManager
 * @param {object}   options.freebie           - Aus useFreebies
 * @param {function} options.showToast         - Aus useCharacterManager
 * @param {string|null} [options.excludeAttrField]       - Attribut, das von der Limit-Berechnung
 *                                                         ausgeschlossen wird (Nosferatu: 'Erscheinungsbild')
 * @param {number|null} [options.attrCapWithoutFreebies]  - Maximaler Einzelwert pro Attribut ohne Freebies
 *                                                         (Mage: 5, Vampire/Werewolf: null = kein Cap)
 * @param {number|null} [options.abilityCapWithoutFreebies] - Maximaler Einzelwert pro Fähigkeit ohne Freebies
 *                                                         (Mage: 3, Vampire/Werewolf: null = kein Cap)
 * @param {function|null} [options.extraAbilityValidation] - Optionale Zusatzprüfung für einzelne Fähigkeiten.
 *                                                         Signatur: (name, newValue) => string|null
 *                                                         Beispiel (Mage): Kampfkunst max. 2 Punkte.
 */
export const useTraitValidation = ({
                                       character,
                                       updateStat,
                                       freebie,
                                       showToast,
                                       excludeAttrField = null,
                                       attrCapWithoutFreebies = null,
                                       abilityCapWithoutFreebies = null,
                                       extraAbilityValidation = null,
                                   }) => {

    // Memoize die abgeleiteten Limit-Objekte, um unnötige Neuberechnungen zu vermeiden
    const attrLimits = useMemo(
        () => getGroupLimits(calculateGroupBonusPoints(character, excludeAttrField)),
        [character, excludeAttrField]
    );

    const abilityLimits = useMemo(
        () => getAbilityLimits(calculateAbilityTotals(character)),
        [character]
    );

    const attrGroupStats = useMemo(() => {
        const bonusPoints = calculateGroupBonusPoints(character, excludeAttrField);
        return Object.fromEntries(
            Object.entries(bonusPoints).map(([group, bonus]) => [
                group,
                { bonus, limit: attrLimits[group] },
            ])
        );
    }, [character, attrLimits, excludeAttrField]);

    const abilityGroupStats = useMemo(() => {
        const totals = calculateAbilityTotals(character);
        return Object.fromEntries(
            Object.entries(totals).map(([group, total]) => [
                group,
                { bonus: total, limit: abilityLimits[group] },
            ])
        );
    }, [character, abilityLimits]);

    // ─── Attribut-Änderung ────────────────────────────────────────────────────
    const validateAndApplyAttributeChange = useCallback((cat, name, newValue) => {
        const currentValue = character.attributes[cat][name];
        if (newValue === currentValue) return;

        if (freebie.freebiesActive) {
            const cost = freebie.getCost('attribute', currentValue, newValue);
            if (cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                return;
            }
            updateStat('attributes', cat, name, newValue);
            freebie.spend('attribute', currentValue, newValue);
            return;
        }

        if (attrCapWithoutFreebies !== null && newValue > attrCapWithoutFreebies) {
            showToast(`Attribute können ohne Freebies maximal ${attrCapWithoutFreebies} Punkte haben.`, 'error');
            return;
        }

        const testChar = JSON.parse(JSON.stringify(character));
        testChar.attributes[cat][name] = newValue;
        const newBonus  = calculateGroupBonusPoints(testChar, excludeAttrField);
        const newLimits = getGroupLimits(newBonus);
        const valid = Object.entries(newBonus).every(([g, b]) => b <= newLimits[g]);

        if (valid) {
            updateStat('attributes', cat, name, newValue);
        } else {
            showToast(
                `Punktelimit überschritten! In "${cat}" dürfen max. ${attrLimits[cat]} Zusatzpunkte vergeben werden.`,
                'error'
            );
        }
    }, [character, freebie, updateStat, showToast, attrLimits, excludeAttrField, attrCapWithoutFreebies]);

    // ─── Fähigkeits-Änderung ──────────────────────────────────────────────────
    const validateAndApplyAbilityChange = useCallback((cat, name, newValue) => {
        const currentValue = character.abilities[cat][name];
        if (newValue === currentValue) return;

        // System-spezifische Zusatzprüfung (z. B. Kampfkunst-Limit bei Mage)
        if (extraAbilityValidation) {
            const errorMsg = extraAbilityValidation(name, newValue);
            if (errorMsg) { showToast(errorMsg, 'error'); return; }
        }

        if (freebie.freebiesActive) {
            const cost = freebie.getCost('ability', currentValue, newValue);
            if (cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                return;
            }
            updateStat('abilities', cat, name, newValue);
            freebie.spend('ability', currentValue, newValue);
            return;
        }

        if (abilityCapWithoutFreebies !== null && newValue > abilityCapWithoutFreebies) {
            showToast(`Fähigkeiten können ohne Freebies maximal ${abilityCapWithoutFreebies} Punkte haben.`, 'error');
            return;
        }

        const testChar = JSON.parse(JSON.stringify(character));
        testChar.abilities[cat][name] = newValue;
        const newTotals = calculateAbilityTotals(testChar);
        const newLimits = getAbilityLimits(newTotals);
        const valid = Object.entries(newTotals).every(([g, t]) => t <= newLimits[g]);

        if (valid) {
            updateStat('abilities', cat, name, newValue);
        } else {
            showToast(
                `Punktelimit überschritten! In "${cat}" dürfen max. ${abilityLimits[cat]} Punkte vergeben werden.`,
                'error'
            );
        }
    }, [character, freebie, updateStat, showToast, abilityLimits, extraAbilityValidation, abilityCapWithoutFreebies]);

    return {
        attrGroupStats,
        abilityGroupStats,
        attrLimits,
        abilityLimits,
        validateAndApplyAttributeChange,
        validateAndApplyAbilityChange,
    };
};
