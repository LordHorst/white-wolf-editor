// systems/changeling/ChangelingStatus.jsx
import React from 'react';
import {DotRating} from '../../components';

export const ChangelingStatus = ({character, setCharacter, theme}) => {
    const set = (key, value) =>
        setCharacter(p => ({...p, status: {...p.status, [key]: value}}));

    return (
        <div className="space-y-6">
            {[
                {label: 'Glamour', key: 'glamour', max: 10},
                {label: 'Banalität', key: 'banality', max: 10},
                {label: 'Willenskraft', key: 'willenskraft', max: 10},
            ].map(({label, key, max}) => (
                <div key={key} className="text-center">
                    <h3 className={`text-xs text-${theme}-700 uppercase font-bold mb-2`}>{label}</h3>
                    <div className="flex justify-center">
                        <DotRating
                            theme={theme}
                            value={character.status[key]}
                            min={1}
                            max={max}
                            onChange={(v) => set(key, v)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};