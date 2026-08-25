import React, { useState } from "react";
import { Activity, ChevronRight, Folder, FolderOpen, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

export const WarehouseMonitorSim: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("open_wt");

  const mockOpenWts = [
    { id: "100024501", processType: "1010", sourceBin: "DOOR-01", destBin: "01-04-02", mat: "MAT-8840", qty: "50 EA", status: "Open" },
    { id: "100024502", processType: "1010", sourceBin: "DOOR-01", destBin: "01-04-03", mat: "MAT-9912", qty: "20 EA", status: "Open" },
    { id: "100024503", processType: "2010", sourceBin: "02-10-01", destBin: "STAGE-OUT", mat: "MAT-1100", qty: "10 EA", status: "In Execution" }
  ];

  const mockStockQuants = [
    { bin: "01-04-02", mat: "MAT-8840", batch: "BATCH-2026A", qty: "200 EA", stockType: "F2 (Available)", hu: "HU-9001002" },
    { bin: "02-10-01", mat: "MAT-1100", batch: "BATCH-2025Z", qty: "45 EA", stockType: "F2 (Available)", hu: "HU-9001008" },
    { bin: "03-01-01", mat: "MAT-7700", batch: "BATCH-2026Q", qty: "100 EA", stockType: "Q4 (Quality)", hu: "HU-9001015" }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-cyan-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-cyan-600 text-white rounded-xl shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800">
              Operational Supervision Cockpit
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              SAP EWM Warehouse Monitor Simulator (/SCWM/MON)
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Experience the standard SAP EWM Monitor hierarchy tree. Inspect live open Warehouse Tasks, Physical Stock Quants (/SCWM/AQUA), Handling Units, and qRFC queue health.
        </p>
      </div>

      {/* Split Monitor Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Tree Navigator */}
        <div className="lg:col-span-4 bg-slate-900 text-slate-200 rounded-2xl p-4 border border-slate-800 shadow-xl space-y-2 font-mono text-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 pb-2 border-b border-slate-800">
            Warehouse: W001 – Chicago Central Hub
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setSelectedCategory("open_wt")}
              className={`w-full text-left p-2 rounded-lg flex items-center space-x-2 transition-colors ${
                selectedCategory === "open_wt" ? "bg-cyan-600 text-white font-bold" : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>Inbound & Outbound Tasks</span>
            </button>

            <button
              onClick={() => setSelectedCategory("stock")}
              className={`w-full text-left p-2 rounded-lg flex items-center space-x-2 transition-colors ${
                selectedCategory === "stock" ? "bg-cyan-600 text-white font-bold" : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>Physical Stock (/SCWM/AQUA)</span>
            </button>

            <button
              onClick={() => setSelectedCategory("queues")}
              className={`w-full text-left p-2 rounded-lg flex items-center space-x-2 transition-colors ${
                selectedCategory === "queues" ? "bg-cyan-600 text-white font-bold" : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>qRFC Queues (SMQ1 / SMQ2)</span>
            </button>
          </div>
        </div>

        {/* Data Grid Area */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              {selectedCategory === "open_wt" && "Open Warehouse Tasks (/SCWM/ORDIM_O)"}
              {selectedCategory === "stock" && "Available Physical Stock Quants (/SCWM/AQUA)"}
              {selectedCategory === "queues" && "qRFC Communication Status"}
            </h3>
            <span className="text-xs font-mono text-slate-400">Node: /SCWM/MON_TREE</span>
          </div>

          {selectedCategory === "open_wt" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="p-2.5">Task ID</th>
                    <th className="p-2.5">WPT</th>
                    <th className="p-2.5">Source Bin</th>
                    <th className="p-2.5">Dest Bin</th>
                    <th className="p-2.5">Material</th>
                    <th className="p-2.5">Quantity</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockOpenWts.map(wt => (
                    <tr key={wt.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-blue-600">{wt.id}</td>
                      <td className="p-2.5">{wt.processType}</td>
                      <td className="p-2.5">{wt.sourceBin}</td>
                      <td className="p-2.5 font-bold">{wt.destBin}</td>
                      <td className="p-2.5">{wt.mat}</td>
                      <td className="p-2.5">{wt.qty}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 text-[10px] bg-amber-100 text-amber-800 rounded font-semibold">
                          {wt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedCategory === "stock" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="p-2.5">Storage Bin</th>
                    <th className="p-2.5">Material</th>
                    <th className="p-2.5">Batch</th>
                    <th className="p-2.5">Quantity</th>
                    <th className="p-2.5">Stock Type</th>
                    <th className="p-2.5">Handling Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockStockQuants.map((stk, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900">{stk.bin}</td>
                      <td className="p-2.5">{stk.mat}</td>
                      <td className="p-2.5">{stk.batch}</td>
                      <td className="p-2.5 font-bold">{stk.qty}</td>
                      <td className="p-2.5 text-emerald-700">{stk.stockType}</td>
                      <td className="p-2.5 text-blue-600">{stk.hu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedCategory === "queues" && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-900">SMQ1 (Outbound RFC to ERP)</span>
                  <div className="text-[11px] text-emerald-700">0 locked queues • Status: ACTIVE (OK)</div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-900">SMQ2 (Inbound RFC from ERP)</span>
                  <div className="text-[11px] text-emerald-700">0 locked queues • Status: ACTIVE (OK)</div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
