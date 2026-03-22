import { useState, useRef, useEffect } from 'react';

// Helper: deep merge two objects (like lodash/merge)
function deepMerge(target, source) {
  const output = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

export function useCharacterManager(storageKey, getEmptyTemplate) {
  // Key for the list of saved characters (different from the current character)
  const savedKey = `wod_${storageKey}_saved_characters`;

  // 1. Load current character from localStorage, deep‑merge with default template
  const [character, setCharacter] = useState(() => {
    const defaultData = getEmptyTemplate();
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Deep merge: stored values override default ones
        return deepMerge(defaultData, parsed);
      } catch (e) {
        console.error('Failed to parse stored character:', e);
        return defaultData;
      }
    }
    return defaultData;
  });

  // 2. GM mode flag
  const [gmMode, setGmMode] = useState(false);

  // 3. Notification system
  const [notification, setNotification] = useState(null);
  const timeoutRef = useRef(null);
  const showToast = (msg, type = 'error') => {
    setNotification({ msg, type });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setNotification(null), 3000);
  };

  // 4. Saved characters list
  const [savedChars, setSavedChars] = useState([]);
  const [storageModalOpen, setStorageModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const localData = localStorage.getItem(savedKey);
    if (localData) {
      try {
        setSavedChars(JSON.parse(localData));
      } catch (e) {
        console.error(e);
      }
    }
  }, [savedKey]);

  // ---------- Import / Export ----------
  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(character, null, 2));
    const dlNode = document.createElement('a');
    dlNode.setAttribute("href", dataStr);
    const fileName = `${character.info?.Name?.replace(/[^a-z0-9]/gi, '_') || 'char'}_${storageKey}.json`;
    dlNode.setAttribute("download", fileName);
    document.body.appendChild(dlNode);
    dlNode.click();
    dlNode.remove();
    showToast("Charakter exportiert", "success");
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        setCharacter(imported);
        showToast("Charakter importiert", "success");
      } catch (err) {
        showToast("Fehler beim Einlesen", "error");
      }
    };
    e.target.value = null;
  };

  // ---------- Save / Load / Delete from local list ----------
  const saveToLocal = () => {
    if (savedChars.length >= 10) {
      showToast("Speicher voll (Max. 10).", "error");
      return;
    }
    const newEntry = {
      id: Date.now(),
      name: character.info?.Name || "Unbekannt",
      subInfo: character.info?.Clan || character.info?.Tribe || character.info?.Tradition || "",
      date: new Date().toLocaleDateString(),
      data: character,
    };
    const updated = [...savedChars, newEntry];
    setSavedChars(updated);
    localStorage.setItem(savedKey, JSON.stringify(updated));
    showToast("Lokal gespeichert.", "success");
  };

  const loadFromLocal = (data) => {
    setCharacter(data);
    setStorageModalOpen(false);
    showToast("Geladen.", "success");
  };

  const deleteFromLocal = (id) => {
    const updated = savedChars.filter(c => c.id !== id);
    setSavedChars(updated);
    localStorage.setItem(savedKey, JSON.stringify(updated));
  };

  // ---------- Updaters for different parts of the character ----------
  const updateInfo = (key, value) => {
    setCharacter(prev => ({
      ...prev,
      info: { ...prev.info, [key]: value },
    }));
  };

  // Generic trait updater: category (attributes/abilities/etc.), subcategory (e.g., "körperlich"), trait name, new value
  const updateTrait = (category, subCategory, traitName, value) => {
    setCharacter(prev => {
      if (subCategory === null) {
        // Direct property (e.g., humanity, willpower)
        return { ...prev, [category]: value };
      }
      // Nested object
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [subCategory]: {
            ...(prev[category]?.[subCategory] || {}),
            [traitName]: value,
          },
        },
      };
    });
  };

  // Add an item to a list (disciplines, merits, flaws)
  const addListItem = (listName, itemName, initialValue = 0) => {
    setCharacter(prev => {
      const currentList = prev[listName] || [];
      if (currentList.some(item => item.name === itemName)) {
        showToast(`"${itemName}" existiert bereits`, "error");
        return prev;
      }
      return {
        ...prev,
        [listName]: [...currentList, { name: itemName, value: initialValue }],
      };
    });
  };

  // Remove an item from a list
  const removeListItem = (listName, itemName) => {
    setCharacter(prev => ({
      ...prev,
      [listName]: (prev[listName] || []).filter(item => item.name !== itemName),
    }));
  };

  // Return all required values and functions
  return {
    // State
    character,
    setCharacter,
    gmMode,
    setGmMode,
    notification,
    storageModalOpen,
    setStorageModalOpen,
    savedChars,
    fileInputRef,
    // Actions
    showToast,
    exportJSON,
    importJSON,
    saveToLocal,
    loadFromLocal,
    deleteFromLocal,
    // Trait / list helpers
    updateInfo,
    updateTrait,
    addListItem,
    removeListItem,
  };
}