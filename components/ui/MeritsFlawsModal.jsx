import React, { useState } from 'react';
import { X } from 'lucide-react';

const themeConfig = {
  emerald: {
    bg: 'bg-emerald-950/90',
    border: 'border-emerald-800',
    text: 'text-emerald-100',
    accentBorder: 'border-emerald-500',
    accentText: 'text-emerald-300',
    tabActive: 'border-emerald-500 text-emerald-300',
    tabInactive: 'text-emerald-500 hover:text-emerald-300',
    meritButton: 'bg-emerald-800 hover:bg-emerald-700 text-white',
    flawButton: 'bg-rose-800 hover:bg-rose-700 text-white',
    footerText: 'text-emerald-400',
    headerButton: 'text-emerald-400 hover:text-emerald-200',
    emptyText: 'text-emerald-500',
    descriptionText: 'text-emerald-400',
    meritBadge: 'bg-emerald-800 text-emerald-200',
    flawBadge: 'bg-rose-800 text-rose-200',
    removeButton: 'bg-gray-700 hover:bg-gray-600 text-white',
    disabledButton: 'bg-gray-700 opacity-50 cursor-not-allowed',
  },
  amber: {
    bg: 'bg-amber-950/90',
    border: 'border-amber-800',
    text: 'text-amber-100',
    accentBorder: 'border-amber-500',
    accentText: 'text-amber-300',
    tabActive: 'border-amber-500 text-amber-300',
    tabInactive: 'text-amber-500 hover:text-amber-300',
    meritButton: 'bg-amber-800 hover:bg-amber-700 text-white',
    flawButton: 'bg-rose-800 hover:bg-rose-700 text-white',
    footerText: 'text-amber-400',
    headerButton: 'text-amber-400 hover:text-amber-200',
    emptyText: 'text-amber-500',
    descriptionText: 'text-amber-400',
    meritBadge: 'bg-amber-800 text-amber-200',
    flawBadge: 'bg-rose-800 text-rose-200',
    removeButton: 'bg-gray-700 hover:bg-gray-600 text-white',
    disabledButton: 'bg-gray-700 opacity-50 cursor-not-allowed',
  },
};

export const MeritsFlawsModal = ({
  isOpen,
  onClose,
  type, // 'merit' or 'flaw'
  meritsList = [],
  flawsList = [],
  selectedMerits = [],
  selectedFlaws = [],
  onAddMerit,
  onRemoveMerit,
  onAddFlaw,
  onRemoveFlaw,
  freebiePoints,
  freebiesActive = true,
  theme = 'emerald'
}) => {
  const [activeTab, setActiveTab] = useState(type);

  if (!isOpen) return null;

  const colors = themeConfig[theme] || themeConfig.emerald;

  const isSelected = (item, list) => list.some(i => i.name === item.name);

  const handleAdd = (item) => {
    if (!freebiesActive) return;
    if (activeTab === 'merit') onAddMerit(item);
    else onAddFlaw(item);
  };

  const handleRemove = (item) => {
    if (!freebiesActive) return;
    if (activeTab === 'merit') onRemoveMerit(item);
    else onRemoveFlaw(item);
  };

  const currentList = activeTab === 'merit' ? meritsList : flawsList;
  const selectedList = activeTab === 'merit' ? selectedMerits : selectedFlaws;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className={`w-full max-w-2xl rounded-lg shadow-2xl ${colors.bg} border ${colors.border} ${colors.text}`}>
        {/* Header */}
        <div className={`flex justify-between items-center p-4 border-b ${colors.border}`}>
          <h2 className="text-xl font-bold uppercase tracking-wider">
            {activeTab === 'merit' ? 'Vorzüge' : 'Nachteile'}
          </h2>
          <button onClick={onClose} className={colors.headerButton}>
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${colors.border}`}>
          <button
            onClick={() => setActiveTab('merit')}
            className={`px-4 py-2 text-sm uppercase tracking-wider ${
              activeTab === 'merit' ? colors.tabActive : colors.tabInactive
            }`}
          >
            Vorzüge
          </button>
          <button
            onClick={() => setActiveTab('flaw')}
            className={`px-4 py-2 text-sm uppercase tracking-wider ${
              activeTab === 'flaw' ? colors.tabActive : colors.tabInactive
            }`}
          >
            Nachteile
          </button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {currentList.length === 0 ? (
            <p className={`${colors.emptyText} italic text-center py-8`}>
              Keine {activeTab === 'merit' ? 'Vorzüge' : 'Nachteile'} verfügbar.
            </p>
          ) : (
            <div className="space-y-3">
              {currentList.map((item) => {
                const selected = isSelected(item, selectedList);
                const cost = item.cost;
                const canAfford = activeTab === 'merit' ? freebiePoints >= cost : true;
                const isAddDisabled = !freebiesActive || (activeTab === 'merit' && !canAfford);

                return (
                  <div key={item.name} className={`flex justify-between items-start border-b ${colors.border} pb-2`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{item.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          activeTab === 'merit' ? colors.meritBadge : colors.flawBadge
                        }`}>
                          {cost} Punkte
                        </span>
                      </div>
                      <p className={`text-xs ${colors.descriptionText} mt-1`}>{item.description}</p>
                    </div>
                    <div className="ml-4">
                      {!selected ? (
                        <button
                          onClick={() => handleAdd(item)}
                          disabled={isAddDisabled}
                          className={`px-3 py-1 text-xs rounded ${
                            isAddDisabled
                              ? colors.disabledButton
                              : activeTab === 'merit'
                              ? colors.meritButton
                              : colors.flawButton
                          }`}
                        >
                          Hinzufügen
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRemove(item)}
                          disabled={!freebiesActive}
                          className={`px-3 py-1 text-xs rounded ${
                            !freebiesActive ? colors.disabledButton : colors.removeButton
                          }`}
                        >
                          Entfernen
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${colors.border} text-right text-xs ${colors.footerText}`}>
          {!freebiesActive ? (
            <span>Freebie-Modus muss aktiviert sein, um Vor- und Nachteile zu wählen.</span>
          ) : (
            <>
              {activeTab === 'merit' && <span>Verfügbare Freebies: {freebiePoints}</span>}
              {activeTab === 'flaw' && <span>Verfügbare Freebies: {freebiePoints}</span>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};