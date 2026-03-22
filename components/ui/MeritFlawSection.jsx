// components/ui/MeritFlawSection.jsx
import React, { useState } from 'react';
import { MeritsFlawsModal } from './MeritsFlawsModal';

export const MeritFlawSection = ({
                                     character,
                                     meritsList,
                                     flawsList,
                                     onAddMerit,
                                     onRemoveMerit,
                                     onAddFlaw,
                                     onRemoveFlaw,
                                     freebie,
                                     theme // z.B. "emerald", "amber", "purple"
                                 }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('merit');

    // Die Hilfsfunktion direkt hier drin oder importieren
    const getButtonClasses = (isActive) => `px-3 py-1 text-xs uppercase tracking-wider rounded border ...`;

    return (
        <>
            {/* Hier kommt die Logik rein, die die Listen rendert (die <ul> aus deinen Dateien) */}
            <div className="merits-flaws-lists">
                {/* ... render character.merits und character.flaws ... */}
            </div>

            <div className="absolute bottom-4 left-4 flex gap-2">
                <button onClick={() => { setShowModal(true); setModalType('merit'); }}
                        className={getButtonClasses(freebie?.freebiesActive)}>Vorzüge</button>
                <button onClick={() => { setShowModal(true); setModalType('flaw'); }}
                        className={getButtonClasses(freebie?.freebiesActive)}>Nachteile</button>
            </div>

            <MeritsFlawsModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                type={modalType}
                meritsList={meritsList}
                flawsList={flawsList}
                selectedMerits={character.merits}
                selectedFlaws={character.flaws}
                onAddMerit={onAddMerit}
                onRemoveMerit={onRemoveMerit}
                onAddFlaw={onAddFlaw}
                onRemoveFlaw={onRemoveFlaw}
                freebiePoints={freebie.freebiePoints}
                freebiesActive={freebie.freebiesActive}
                theme={theme}
            />
        </>
    );
};