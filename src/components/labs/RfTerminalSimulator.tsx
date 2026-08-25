import React, { useState } from "react";
import { Smartphone, Scan, CheckCircle2, ArrowRight, RefreshCw } from "lucide-react";

export const RfTerminalSimulator: React.FC = () => {
  const [rfMenu, setRfMenu] = useState<"menu" | "putaway" | "picking">("menu");
  const [scanBin, setScanBin] = useState("");
  const [scanHu, setScanHu] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePutawayConfirm = () => {
    if (scanBin.trim().toUpperCase() === "01-04-02") {
      setIsSuccess(true);
    } else {
      alert("Invalid Verification Bin! Destination is 01-04-02");
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-teal-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-teal-600 text-white rounded-xl shadow-sm">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
              Mobile Scanner Interface
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              SAP EWM RF Handheld Terminal Simulator (/SCWM/RFUI)
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Simulate standard character-based and graphical RF screens. Practice barcode scanning verification, Queue execution, Putaway confirmation, and HU inquiries.
        </p>
      </div>

      {/* Terminal Mockup */}
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-slate-950 p-6 rounded-3xl shadow-2xl border-4 border-slate-800 text-slate-200 font-mono">
          
          {/* RF Screen Header */}
          <div className="bg-slate-900 p-2.5 rounded-t-xl border-b border-slate-800 flex justify-between text-xs text-teal-400">
            <span>SAP EWM /RFUI</span>
            <span>Queue: PUT_01</span>
          </div>

          {/* Screen Content */}
          <div className="p-4 bg-slate-900/50 min-h-[320px] flex flex-col justify-between text-xs space-y-4">
            
            {rfMenu === "menu" && (
              <div className="space-y-3">
                <div className="text-center font-bold text-white border-b border-slate-800 pb-2">
                  === MAIN MENU ===
                </div>
                <button
                  onClick={() => {
                    setRfMenu("putaway");
                    setIsSuccess(false);
                    setScanBin("");
                  }}
                  className="w-full p-2.5 text-left bg-slate-800 hover:bg-slate-700 rounded text-teal-300 font-bold"
                >
                  1. Inbound Putaway by HU
                </button>
                <button
                  onClick={() => setRfMenu("menu")}
                  className="w-full p-2.5 text-left bg-slate-800 hover:bg-slate-700 rounded text-slate-400"
                >
                  2. Outbound Picking by WO
                </button>
                <button
                  onClick={() => setRfMenu("menu")}
                  className="w-full p-2.5 text-left bg-slate-800 hover:bg-slate-700 rounded text-slate-400"
                >
                  3. Physical Inventory Count
                </button>
              </div>
            )}

            {rfMenu === "putaway" && !isSuccess && (
              <div className="space-y-3">
                <div className="text-amber-400 font-bold">TASK: Putaway HU-9001002</div>
                <div>Mat: MAT-8840 (50 EA)</div>
                <div>Source: DOOR-01</div>
                <div className="text-emerald-400 font-bold">Dest Bin: 01-04-02</div>

                <div className="pt-2">
                  <label className="block text-[10px] text-slate-400 mb-1">Scan Verification Bin:</label>
                  <input
                    type="text"
                    value={scanBin}
                    onChange={(e) => setScanBin(e.target.value)}
                    placeholder="Type 01-04-02"
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-white font-mono uppercase focus:outline-none focus:border-teal-400"
                  />
                </div>

                <button
                  onClick={handlePutawayConfirm}
                  className="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded mt-2"
                >
                  [ F1 - CONFIRM TASK ]
                </button>
              </div>
            )}

            {isSuccess && (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">TASK CONFIRMED!</div>
                <p className="text-xs text-slate-400">Stock quant placed into Bin 01-04-02. Posting change to AFS triggered in background.</p>
                <button
                  onClick={() => setRfMenu("menu")}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs"
                >
                  Back to Menu
                </button>
              </div>
            )}

            {/* Terminal Keypad Footer */}
            <div className="pt-4 border-t border-slate-800 flex justify-between text-[10px] text-slate-500">
              <span>F1: Ok</span>
              <span>F4: Clear</span>
              <span>F7: Back</span>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
