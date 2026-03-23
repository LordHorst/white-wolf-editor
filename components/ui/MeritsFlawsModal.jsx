import React, {useEffect, useState} from 'react';
import { X } from 'lucide-react';
import { themeConfig } from './themes/themes.ts';

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

   // Sync activeTab with type prop whenever type changes
    useEffect(() => {
        setActiveTab(type);
    }, [type]);
  if (!isOpen) return null;

  const colors = themeConfig[theme] || themeConfig.default;
    const getSelectedItem = (item, list) => list.find(i => i.name === item.name);

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
                    const selectedItem = getSelectedItem(item, selectedList);
                    const quantity = selectedItem ? selectedItem.quantity || 1 : 0;
                    const isStackable = item.stackable === true;
                    const maxStack = item.maxStack || 1;
                    const cost = item.cost;
                    const totalCost = cost * quantity;
                    const canAfford = activeTab === 'merit' ? freebiePoints >= cost : true;
                    const canAdd = !isStackable ? !selectedItem : quantity < maxStack;
                    const canRemove = isStackable ? quantity > 0 : !!selectedItem;

                    return (
                        <div key={item.name} className={`flex justify-between items-start border-b ${colors.border} pb-2`}>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{item.name}</span>
                              {isStackable && quantity > 0 && (
                                  <span className="text-xs text-purple-400">x{quantity}</span>
                              )}
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  activeTab === 'merit' ? colors.meritBadge : colors.flawBadge
                              }`}>
                          {totalCost} Punkte
                        </span>
                            </div>
                            <p className={`text-xs ${colors.descriptionText} mt-1`}>{item.description}</p>
                          </div>
                          <div className="ml-4">
                            {isStackable ? (
                                <div className="flex items-center gap-1">
                                  <button
                                      onClick={() => handleRemove(item)}
                                      disabled={!freebiesActive || !canRemove}
                                      className={`px-2 py-1 text-xs rounded ${!freebiesActive || !canRemove ? colors.disabledButton : colors.counterButton}`}
                                  >
                                    -
                                  </button>
                                  <span className="w-6 text-center text-sm">{quantity}</span>
                                  <button
                                      onClick={() => handleAdd(item)}
                                      disabled={!freebiesActive || !canAdd || (activeTab === 'merit' && !canAfford)}
                                      className={`px-2 py-1 text-xs rounded ${!freebiesActive || !canAdd || (activeTab === 'merit' && !canAfford) ? colors.disabledButton : colors.counterButton}`}
                                  >
                                    +
                                  </button>
                                </div>
                            ) : (
                                !selectedItem ? (
                                    <button
                                        onClick={() => handleAdd(item)}
                                        disabled={!freebiesActive || (activeTab === 'merit' && !canAfford)}
                                        className={`px-3 py-1 text-xs rounded ${
                                            !freebiesActive || (activeTab === 'merit' && !canAfford)
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
                                        className={`px-3 py-1 text-xs rounded ${!freebiesActive ? colors.disabledButton : colors.removeButton}`}
                                    >
                                      Entfernen
                                    </button>
                                )
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