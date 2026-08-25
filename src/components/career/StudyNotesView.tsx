import React, { useState } from "react";
import { useSap } from "../../context/SapContext";
import { Bookmark, Trash2, Plus, FileText } from "lucide-react";

export const StudyNotesView: React.FC = () => {
  const { notes, addNote, deleteNote } = useSap();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleAdd = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    addNote({
      title: newTitle,
      content: newContent,
      tags: ["Custom Note"]
    });
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Personal Study Notes & Cheatsheets
        </h2>
        <div className="space-y-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Note Title (e.g. SPRO OBYC Account modifier notes)..."
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Enter key learnings or interview reminders..."
            rows={3}
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold"
          >
            Add Study Note
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map(n => (
          <div key={n.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
                <button onClick={() => deleteNote(n.id)} className="text-slate-400 hover:text-rose-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-wrap">{n.content}</p>
            </div>
            <div className="text-[10px] text-slate-400 pt-2">{new Date(n.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
