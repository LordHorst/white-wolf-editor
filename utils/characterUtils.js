/**
 * characterUtils.js
 * Gemeinsame reine Hilfsfunktionen für alle WoD-Charakterbögen.
 * Keine React-Importe – nur pure JS.
 */

// ─── Attribut-Punkte ────────────────────────────────────────────────────────

/** Gibt die Bonuspunkte eines Attributwerts zurück (alles über 1). */
export const getBonusPoints = (value) => Math.max(0, value - 1);

/**
 * Berechnet die vergebenen Bonuspunkte je Attributgruppe.
 * @param {object} character  - Charakterobjekt mit `attributes`-Schlüssel
 * @param {string|null} excludeField - Attributname, der ignoriert wird (z. B. "Erscheinungsbild" für Nosferatu)
 */
export const calculateGroupBonusPoints = (character, excludeField = null) => {
    const attrs = character.attributes;
    const calcGroup = (group) =>
        Object.entries(group).reduce((sum, [name, val]) => {
            if (excludeField && name === excludeField) return sum;
            return sum + getBonusPoints(val);
        }, 0);

    return {
        körperlich:     calcGroup(attrs.körperlich),
        gesellschaftlich: calcGroup(attrs.gesellschaftlich),
        geistig:        calcGroup(attrs.geistig),
    };
};

/**
 * Leitet aus den aktuellen Bonuspunkten die erlaubten Limits pro Gruppe ab (7 / 5 / 3).
 * Die Gruppe mit den meisten Punkten gilt als Primär (7), usw.
 */
export const getGroupLimits = (bonusPoints) => {
    const sorted = Object.entries(bonusPoints).sort((a, b) => b[1] - a[1]);
    return {
        [sorted[0][0]]: 7,
        [sorted[1][0]]: 5,
        [sorted[2][0]]: 3,
    };
};

// ─── Fähigkeits-Punkte ──────────────────────────────────────────────────────

/** Summiert die vergebenen Punkte je Fähigkeitsgruppe. */
export const calculateAbilityTotals = (character) => {
    const totals = {};
    for (const [group, fields] of Object.entries(character.abilities)) {
        totals[group] = Object.values(fields).reduce((sum, v) => sum + v, 0);
    }
    return totals;
};

/**
 * Leitet aus den aktuellen Summen die erlaubten Limits pro Fähigkeitsgruppe ab (13 / 9 / 5).
 */
export const getAbilityLimits = (totals) => {
    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    return {
        [sorted[0][0]]: 13,
        [sorted[1][0]]: 9,
        [sorted[2][0]]: 5,
    };
};

// ─── Hintergründe ───────────────────────────────────────────────────────────

/** Summiert alle vergebenen Hintergrundpunkte. */
export const sumBackgrounds = (backgrounds) =>
    backgrounds.reduce((sum, b) => sum + b.value, 0);

// ─── Zufalls-Utilities ──────────────────────────────────────────────────────

export const randomInt  = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const randomChoice = (arr)    => arr[Math.floor(Math.random() * arr.length)];

/** Gibt eine neue, gemischte Kopie des Arrays zurück (Fisher-Yates). */
export const shuffleArray = (arr) => {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
};

/**
 * Verteilt `totalPoints` Punkte zufällig auf `items.length` Slots,
 * wobei kein Slot `maxPerItem` überschreiten darf.
 * @returns {number[]} Array mit verteilten Punkten
 */
export const distributePoints = (items, totalPoints, maxPerItem = 5) => {
    const result = items.map(() => 0);
    let remaining = totalPoints;
    while (remaining > 0) {
        const possible = result.reduce((acc, v, i) => {
            if (v < maxPerItem) acc.push(i);
            return acc;
        }, []);
        if (!possible.length) break;
        result[randomChoice(possible)]++;
        remaining--;
    }
    return result;
};

/**
 * Verteilt Attribute nach dem WoD-7/5/3-System zufällig.
 * @param {object} baseAttributes - Objekt mit den drei Kategorien und je 3 Attributen auf Basis 1
 * @returns {object} Neues Attribut-Objekt mit verteilten Punkten
 */
export const randomizeAttributes = (baseAttributes) => {
    const categories = Object.keys(baseAttributes);
    const shuffled   = shuffleArray([7, 5, 3]);
    const result     = JSON.parse(JSON.stringify(baseAttributes));

    categories.forEach((cat, idx) => {
        const names = Object.keys(result[cat]);
        const dist  = distributePoints(names, shuffled[idx], 5);
        names.forEach((name, i) => { result[cat][name] += dist[i]; });
    });
    return result;
};

/**
 * Verteilt Fähigkeiten nach dem WoD-13/9/5-System zufällig.
 * @param {object} emptyAbilities - Objekt mit den drei Gruppen und allen Fähigkeiten auf 0
 * @returns {object} Neues Fähigkeits-Objekt mit verteilten Punkten
 */
export const randomizeAbilities = (emptyAbilities) => {
    const groups  = Object.keys(emptyAbilities);
    const shuffled = shuffleArray([13, 9, 5]);
    const result  = JSON.parse(JSON.stringify(emptyAbilities));

    groups.forEach((group, idx) => {
        const names = Object.keys(result[group]);
        const dist  = distributePoints(names, shuffled[idx], 3);
        names.forEach((name, i) => { result[group][name] = dist[i]; });
    });
    return result;
};

/**
 * Erzeugt eine zufällige Hintergrundliste mit `count` Slots und `totalPoints` Punkten.
 * Jeder Hintergrund kann nur einmal vorkommen.
 */
export const randomizeBackgrounds = (availableBgs, count = 5, totalPoints = 5) => {
    const list = [];
    let remaining = totalPoints;
    const used = new Set();

    while (remaining > 0 && list.length < count && availableBgs.length > 0) {
        const available = availableBgs.filter(b => !used.has(b));
        if (!available.length) break;
        const bgName = randomChoice(available);
        const points = randomInt(1, Math.min(5, remaining));
        used.add(bgName);
        list.push({ name: bgName, value: points });
        remaining -= points;
    }
    while (list.length < count) list.push({ name: "", value: 0 });
    return list;
};
