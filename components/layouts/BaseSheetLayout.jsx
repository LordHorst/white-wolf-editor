// components/layouts/BaseSheetLayout.jsx
import {SheetControls} from "../ui/SheetControls";
import {HealthBox} from "../ui/HealthBox";
import {StorageModals} from "../ui/StorageModals";

export const BaseSheetLayout = ({ children, mngr, theme }) => {
    return (
        <div className={`character-sheet-container theme-${theme}`}>
            <SheetControls mngr={mngr} />

            <div className="sheet-content">
                {children}
            </div>

            <HealthBox
                character={mngr.character}
                setCharacter={mngr.setCharacter}
                theme={theme}
            />
            <StorageModals mngr={mngr} theme={theme} />
        </div>
    );
};