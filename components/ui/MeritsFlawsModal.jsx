import React, { useState } from 'react';
import { X } from 'lucide-react';

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
  theme = 'emerald'
}) => {
  const [activeTab, setActiveTab] = useState(type);

  if (!isOpen) return null;

  const themeColors = {
    emerald: {
      bg: 'bg-emerald-950/90',
      border: 'border-emerald-800',
      text: 'text-emerald-100',
      accent: 'emerald',
      button: 'bg-emerald-800 hover:bg-emerald-700',
      buttonDisabled: 'bg-gray-700 cursor-not-allowed',
    },
    // you can extend for other themes later
  };

  const colors = themeColors[theme] || themeColors.emerald;

  const isSelected = (item, list) => list.some(i => i.name === item.name);

  const handleAdd = (item) => {
    if (activeTab === 'merit') onAddMerit(item);
    else onAddFlaw(item);
  };

  const handleRemove = (item) => {
    if (activeTab === 'merit') onRemoveMerit(item);
    else onRemoveFlaw(item);
  };

  const currentList = activeTab === 'merit' ? meritsList : flawsList;
  const selectedList = activeTab === 'merit' ? selectedMerits : selectedFlaws;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className={`w-full max-w-2xl rounded-lg shadow-2xl ${colors.bg} border ${colors.border} text-${colors.text}`}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-emerald-800">
          <h2 className="text-xl font-bold uppercase tracking-wider">
            {activeTab === 'merit' ? 'Vorzüge' : 'Nachteile'}
          </h2>
          <button onClick={onClose} className="text-emerald-400 hover:text-emerald-200">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-emerald-800">
          <button
            onClick={() => setActiveTab('merit')}
            className={`px-4 py-2 text-sm uppercase tracking-wider ${
              activeTab === 'merit'
                ? `border-b-2 border-${colors.accent}-500 text-${colors.accent}-300`
                : 'text-emerald-500 hover:text-emerald-300'
            }`}
          >
            Vorzüge
          </button>
          <button
            onClick={() => setActiveTab('flaw')}
            className={`px-4 py-2 text-sm uppercase tracking-wider ${
              activeTab === 'flaw'
                ? `border-b-2 border-${colors.accent}-500 text-${colors.accent}-300`
                : 'text-emerald-500 hover:text-emerald-300'
            }`}
          >
            Nachteile
          </button>
        </div>

        {/* Content */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {currentList.length === 0 ? (
            <p className="text-emerald-500 italic text-center py-8">Keine {activeTab === 'merit' ? 'Vorzüge' : 'Nachteile'} verfügbar.</p>
          ) : (
            <div className="space-y-3">
              {currentList.map((item) => {
                const selected = isSelected(item, selectedList);
                const cost = item.cost;
                const canAfford = activeTab === 'merit' ? freebiePoints >= cost : true;
                return (
                  <div key={item.name} className="flex justify-between items-start border-b border-emerald-800/50 pb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-200">{item.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          activeTab === 'merit' ? 'bg-emerald-800 text-emerald-200' : 'bg-rose-800 text-rose-200'
                        }`}>
                          {cost} {activeTab === 'merit' ? 'Punkte' : 'Punkte'}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-400 mt-1">{item.description}</p>
                    </div>
                    <div className="ml-4">
                      {!selected ? (
                        <button
                          onClick={() => handleAdd(item)}
                          disabled={activeTab === 'merit' && !canAfford}
                          className={`px-3 py-1 text-xs rounded ${
                            activeTab === 'merit' && !canAfford
                              ? colors.buttonDisabled + ' opacity-50'
                              : activeTab === 'merit'
                              ? 'bg-emerald-800 hover:bg-emerald-700 text-white'
                              : 'bg-rose-800 hover:bg-rose-700 text-white'
                          }`}
                        >
                          Hinzufügen
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRemove(item)}
                          className="px-3 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-white"
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
        <div className="p-4 border-t border-emerald-800 text-right text-xs text-emerald-400">
          {activeTab === 'merit' && <span>Verfügbare Freebies: {freebiePoints}</span>}
          {activeTab === 'flaw' && <span>Nachteile geben zusätzliche Freebies</span>}
        </div>
      </div>
    </div>
  );
};