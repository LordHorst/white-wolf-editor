// components/BaseSheetV5.jsx
import React from 'react';
import { BaseSheet } from './BaseSheet';

export const BaseSheetV5 = ({ config }) => {
    const {
        systemId, title, subtitle, theme, getEmptyCharacter,
        meritsList = [], flawsList = [],
        renderInfoField, renderAdvantages, renderStatus, renderRules,
        onRandomize, useSystemEffects,
    } = config;

    // Die Werte für Attribute/Fertigkeiten (Cap usw.) werden übergeben,
    // aber simpleValidation sorgt dafür, dass sie ohne Freebie-Logik auskommen.
    return (
        <BaseSheet
            config={{
                systemId,
                title,
                subtitle,
                theme,
                getEmptyCharacter,
                meritsList,
                flawsList,
                renderInfoField,
                renderAdvantages,
                renderStatus,
                renderRules,
                onRandomize,
                useSystemEffects,
                // V5-spezifische Anpassungen:
                disableFreebies: true,
                disableHealthBox: true,
                showRandomizeButton: !!onRandomize,
                simpleValidation: true,
                // Optionale Caps (falls in V5 benötigt)
                attrCapWithoutFreebies: config.attrCapWithoutFreebies ?? 5,
                abilityCapWithoutFreebies: config.abilityCapWithoutFreebies ?? 3,
                excludeAttrField: config.excludeAttrField,
                getExcludeAttrField: config.getExcludeAttrField,
                getDisabledFields: config.getDisabledFields,
                extraAbilityValidation: config.extraAbilityValidation,
            }}
        />
    );
};