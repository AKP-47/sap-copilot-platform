import React, { useState } from "react";
import { OBYC_RULES } from "../../data/obycAccountDetermination";
import { Layers, DollarSign, ArrowRight, RefreshCw } from "lucide-react";

export const ObycLedgerSimulator: React.FC = () => {
  const [selectedTxKey, setSelectedTxKey] = useState<string>("BSX");
  const [poPrice, setPoPrice] = useState<number>(100);
  const [stdPrice, setStdPrice] = useState<number>(100);
  const [invPrice, setInvPrice] = useState<number>(105);
  const [quantity, setQuantity] = useState<number>(10);

  const grInventoryDebit = quantity * stdPrice;
  const grGrIrCredit = quantity * poPrice;
  const grPriceVariance = grInventoryDebit - grGrIrCredit; // if standard <> po

  const invGrIrDebit = quantity * poPrice;
  const invVendorCredit = quantity * invPrice;
  const invPriceVariance = invVendorCredit - invGrIrDebit;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-orange-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-orange-600 text-white rounded-xl shadow-sm">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800">
              Interactive Accounting Engine
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              OBYC Automatic Account Determination & T-Accounts Simulator
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Simulate how SAP automatic account determination posts debits and credits across Balance Sheet Inventory (BSX), GR/IR Clearing (WRX), Cost Centers (GBB-VBR), and Price Differences (PRD).
        </p>
      </div>

      {/* Interactive Parameters */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Simulation Parameters (Standard Price Material)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Standard Price ($/unit)</label>
            <input
              type="number"
              value={stdPrice}
              onChange={(e) => setStdPrice(Number(e.target.value))}
              className="w-full p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">PO Agreed Price ($/unit)</label>
            <input
              type="number"
              value={poPrice}
              onChange={(e) => setPoPrice(Number(e.target.value))}
              className="w-full p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Supplier Invoiced Price ($/unit)</label>
            <input
              type="number"
              value={invPrice}
              onChange={(e) => setInvPrice(Number(e.target.value))}
              className="w-full p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Quantity Received</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Visual T-Accounts Ledger */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Stage 1: Goods Receipt (MIGO 101) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Stage 1: Goods Receipt (MIGO 101)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
              Material Doc + FI Doc
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-emerald-900">🟢 DEBIT: BSX (Inventory Asset)</span>
                <div className="text-[10px] text-emerald-700">{quantity} EA × ${stdPrice} (Std Price)</div>
              </div>
              <span className="text-sm font-bold text-emerald-900">${grInventoryDebit.toFixed(2)}</span>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-rose-900">🔴 CREDIT: WRX (GR/IR Clearing)</span>
                <div className="text-[10px] text-rose-700">{quantity} EA × ${poPrice} (PO Price)</div>
              </div>
              <span className="text-sm font-bold text-rose-900">${grGrIrCredit.toFixed(2)}</span>
            </div>

            {grPriceVariance !== 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-amber-900">⚡ PRD (Price Difference at GR)</span>
                </div>
                <span className="text-sm font-bold text-amber-900">${Math.abs(grPriceVariance).toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stage 2: Invoice Verification (MIRO) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Stage 2: Invoice Verification (MIRO)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
              3-Way Match Clearance
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-emerald-900">🟢 DEBIT: WRX (GR/IR Cleared)</span>
                <div className="text-[10px] text-emerald-700">Offsetting GR/IR liability</div>
              </div>
              <span className="text-sm font-bold text-emerald-900">${invGrIrDebit.toFixed(2)}</span>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-rose-900">🔴 CREDIT: Vendor AP (BSEG Key 31)</span>
                <div className="text-[10px] text-rose-700">Billed amount ({quantity} × ${invPrice})</div>
              </div>
              <span className="text-sm font-bold text-rose-900">${invVendorCredit.toFixed(2)}</span>
            </div>

            {invPriceVariance !== 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-amber-900">⚡ DEBIT: PRD (Invoice Price Variance)</span>
                </div>
                <span className="text-sm font-bold text-amber-900">${invPriceVariance.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* OBYC Transaction Keys Reference Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          OBYC Transaction Keys Reference Guide
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OBYC_RULES.map((rule, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-900 text-white rounded">
                Key: {rule.transactionKey} {rule.accountModifier ? `(${rule.accountModifier})` : ""}
              </span>
              <h4 className="text-xs font-bold text-slate-900 pt-1">{rule.keyName}</h4>
              <p className="text-[11px] text-slate-600">{rule.description}</p>
              <div className="text-[10px] text-slate-500 font-mono pt-1">
                <strong>GL Account:</strong> {rule.sampleGlAccount}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
