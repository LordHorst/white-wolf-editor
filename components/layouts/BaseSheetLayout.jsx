// components/layouts/BaseSheetLayout.jsx
export const BaseSheetLayout = ({ children, mngr, theme }) => {
    return (
        <div className={`character-sheet-container theme-${theme}`}>
            <SheetControls mngr={mngr} />

            <div className="sheet-content">
                {children} {/* Hier landen die spezifischen TraitSections */}
            </div>

            <HealthBox character={mngr.character} />
            <StorageModals mngr={mngr} theme={theme} />
        </div>
    );
};