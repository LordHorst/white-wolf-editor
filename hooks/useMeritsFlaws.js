import { useCallback } from 'react';

/**
 * useMeritsFlaws
 *
 * Kapselt die gesamte Merit/Flaw-Logik, die in allen drei Systembögen
 * (Vampire, Werewolf, Mage) identisch bzw. nahezu identisch war.
 *
 * Unterstützt sowohl stackable als auch non-stackable Merits.
 *
 * @param {{ character, setCharacter, freebie, showToast }} param0
 */
export const useMeritsFlaws = ({ character, setCharacter, freebie, showToast }) => {

    const handleAddMerit = useCallback((merit) => {
        if (!freebie.freebiesActive) return;

        const existing = character.merits.find(m => m.name === merit.name);

        if (merit.stackable) {
            const currentQty = existing?.quantity ?? 0;
            if (currentQty >= merit.maxStack) {
                showToast(`Maximal ${merit.maxStack}× ${merit.name} erlaubt.`, 'error');
                return;
            }
            if (merit.cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${merit.cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                return;
            }
            setCharacter(prev => ({
                ...prev,
                merits: existing
                    ? prev.merits.map(m => m.name === merit.name ? { ...m, quantity: m.quantity + 1 } : m)
                    : [...prev.merits, { ...merit, quantity: 1 }],
            }));
        } else {
            if (existing) {
                showToast('Dieser Vorteil ist bereits ausgewählt.', 'error');
                return;
            }
            if (merit.cost > freebie.freebiePoints) {
                showToast(`Nicht genug Freebies (${merit.cost} benötigt, ${freebie.freebiePoints} verfügbar).`, 'error');
                return;
            }
            setCharacter(prev => ({ ...prev, merits: [...prev.merits, { ...merit, quantity: 1 }] }));
        }
        freebie.spendPoints(merit.cost);
    }, [character.merits, freebie, setCharacter, showToast]);

    const handleRemoveMerit = useCallback((merit) => {
        const existing = character.merits.find(m => m.name === merit.name);
        if (!existing) return;

        if (merit.stackable && existing.quantity > 1) {
            setCharacter(prev => ({
                ...prev,
                merits: prev.merits.map(m => m.name === merit.name ? { ...m, quantity: m.quantity - 1 } : m),
            }));
        } else {
            setCharacter(prev => ({ ...prev, merits: prev.merits.filter(m => m.name !== merit.name) }));
        }
        freebie.addPoints(merit.cost);
    }, [character.merits, freebie, setCharacter]);

    const handleAddFlaw = useCallback((flaw) => {
        if (!freebie.freebiesActive) return;
        if (character.flaws.some(f => f.name === flaw.name)) {
            showToast('Dieser Nachteil ist bereits ausgewählt.', 'error');
            return;
        }
        setCharacter(prev => ({ ...prev, flaws: [...prev.flaws, flaw] }));
        freebie.addPoints(flaw.cost);
    }, [character.flaws, freebie, setCharacter, showToast]);

    const handleRemoveFlaw = useCallback((flaw) => {
        setCharacter(prev => ({ ...prev, flaws: prev.flaws.filter(f => f.name !== flaw.name) }));
        freebie.spendPoints(flaw.cost);
    }, [freebie, setCharacter]);

    return { handleAddMerit, handleRemoveMerit, handleAddFlaw, handleRemoveFlaw };
};
