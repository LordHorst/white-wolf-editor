import React from 'react';
import {Download, FolderOpen, Shield, ShieldOff, Upload} from 'lucide-react';
import {FreebiePanel} from './FreebiePanel';
import {themeConfig} from './themes/themes';

export const SheetControls = ({title, subtitle, theme, mngr, freebieState, onRandomize, setCharacter, freebie, showToast}) => {
    const t = themeConfig[theme] ?? themeConfig.default;

    const btnClass = `flex items-center space-x-1 px-3 py-1.5 border bg-black/40 transition-all rounded text-[10px] font-bold uppercase tracking-widest ${t.accentText} ${t.border} hover:bg-black/60`;

    return (
        <div className="flex flex-col items-start mb-6 px-2 gap-4">
            <div className="w-full flex flex-col md:flex-row justify-between items-center">
                <div className={`text-[10px] uppercase tracking-[0.3em] font-bold ${t.accentText}`}>
                    {title} • {subtitle}
                </div>
                <div className="flex flex-wrap justify-center md:justify-end items-center gap-2">
                    {freebieState && (
                        <FreebiePanel
                            points={freebieState.freebiePoints}
                            active={freebieState.freebiesActive}
                            onToggle={freebieState.setFreebiesActive}
                            theme={theme}
                        />
                    )}
                    <input type="file" accept=".json" ref={mngr.fileInputRef} onChange={mngr.importJSON}
                           className="hidden"/>
                    <button onClick={() => mngr.fileInputRef.current?.click()} className={btnClass}>
                        <Upload size={14}/>
                        <span className="hidden sm:inline">Import</span>
                    </button>
                    <button onClick={mngr.exportJSON} className={btnClass}>
                        <Download size={14}/>
                        <span className="hidden sm:inline">Export</span>
                    </button>
                    <button onClick={() => mngr.setStorageModalOpen(true)} className={btnClass}>
                        <FolderOpen size={14}/>
                        <span>Load / Save</span>
                    </button>
                    <button onClick={() => mngr.setGmMode(!mngr.gmMode)} className={btnClass}>
                        {mngr.gmMode ? <Shield size={14}/> : <ShieldOff size={14}/>}
                        <span className="hidden sm:inline">{mngr.gmMode ? 'GM Edit' : 'Normal'}</span>
                    </button>
                </div>
            </div>
            {onRandomize && (
                <button
                    onClick={() => onRandomize({ setCharacter, freebie, showToast})}
                    className={btnClass}
                    title="Zufälliger Charakter"
                >
                    Zufälliger Charakter
                </button>
            )}
        </div>
    );
};