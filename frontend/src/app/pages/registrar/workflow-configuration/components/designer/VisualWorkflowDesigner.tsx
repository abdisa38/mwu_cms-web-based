import { ClearanceType } from "../../../data/types";
import { mockWorkflowNodesGraduation, mockWorkflowEdgesGraduation } from "../../../data/mockData";
import { Plus, Maximize, ZoomIn, ZoomOut, Save, Search, PlayCircle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface VisualWorkflowDesignerProps {
  clearanceType: ClearanceType;
}

export function VisualWorkflowDesigner({ clearanceType }: VisualWorkflowDesignerProps) {
  // In a real app, these would come from state tied to the clearanceType version
  const nodes = mockWorkflowNodesGraduation;
  const edges = mockWorkflowEdgesGraduation;

  const getNodeColor = (type: string) => {
    switch(type) {
      case "Start": return "bg-emerald-50 border-emerald-500 text-emerald-900";
      case "End": return "bg-slate-800 border-slate-900 text-white";
      case "Department Review": return "bg-white border-blue-400 text-slate-900 shadow-sm";
      case "Department Approval": return "bg-white border-indigo-500 text-slate-900 shadow-sm border-2";
      case "Registrar Review": return "bg-indigo-50 border-indigo-600 text-indigo-900 border-2 shadow-sm";
      case "Certificate Generation": return "bg-amber-50 border-amber-500 text-amber-900 border-2";
      default: return "bg-slate-50 border-slate-400 text-slate-800";
    }
  };

  const getNodeIcon = (type: string) => {
    if (type === "Start" || type === "End") return null;
    return <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center shrink-0 mb-2 border border-slate-200"><span className="text-[10px]">⚙️</span></div>;
  };

  return (
    <div className="h-full w-full bg-[#f8fafc] relative overflow-hidden flex flex-col">
      
      {/* Designer Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 pointer-events-auto">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-1 border-b border-slate-100">Toolbox</div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-left w-full"><Plus className="w-4 h-4 text-slate-400" /> Add Department Step</button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-left w-full"><Plus className="w-4 h-4 text-slate-400" /> Add Conditional Split</button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-left w-full"><Plus className="w-4 h-4 text-slate-400" /> Add Validation Gate</button>
        </div>

        <div className="flex gap-2 pointer-events-auto">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex items-center p-1">
            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded"><ZoomOut className="w-4 h-4" /></button>
            <span className="text-xs font-medium text-slate-500 px-2 min-w-[3rem] text-center">100%</span>
            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded"><ZoomIn className="w-4 h-4" /></button>
          </div>
          <Button variant="outline" className="bg-white border-slate-200 text-slate-600 h-[34px] px-3"><Maximize className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Grid Canvas Background */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>

      {/* Nodes Canvas (Simulated visually) */}
      <div className="flex-1 relative z-0 overflow-auto">
        <div className="min-w-[1500px] min-h-[800px] relative">
          
          {/* Simulated Edges using SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
              <marker id="arrowhead-approved" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
              </marker>
            </defs>
            {/* Draw simulated lines based on hardcoded paths for the mock data coords */}
            <path d="M 180 320 L 250 320" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
            
            {/* Branching from Verify */}
            <path d="M 400 320 L 450 320 L 450 170 L 500 170" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 400 320 L 450 320 L 450 270 L 500 270" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 400 320 L 450 320 L 450 370 L 500 370" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 400 320 L 450 320 L 450 470 L 500 470" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" fill="none" markerEnd="url(#arrowhead)" /> {/* Optional branch */}

            {/* Reconverging to Dept Head */}
            <path d="M 650 170 L 700 170 L 700 320 L 750 320" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-approved)" />
            <path d="M 650 270 L 700 270 L 700 320 L 750 320" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-approved)" />
            <path d="M 650 370 L 700 370 L 700 320 L 750 320" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-approved)" />
            <path d="M 650 470 L 700 470 L 700 320 L 750 320" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="4 4" markerEnd="url(#arrowhead-approved)" />

            {/* Sequential Tail */}
            <path d="M 900 320 L 950 320" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 1100 320 L 1150 320" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 1300 320 L 1350 320" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
            
          </svg>

          {/* Render Nodes */}
          {nodes.map(node => (
            <div 
              key={node.id} 
              className={`absolute rounded-xl border p-3 cursor-grab hover:ring-4 ring-indigo-500/20 transition-all ${getNodeColor(node.type)}`}
              style={{ left: node.coordinates?.x, top: node.coordinates?.y, width: 150 }}
            >
              {getNodeIcon(node.type)}
              <div className="font-bold text-sm leading-tight mb-1">{node.label}</div>
              <div className="text-[10px] uppercase tracking-wider opacity-70 mb-2">{node.type}</div>
              
              {/* Badges row */}
              <div className="flex flex-wrap gap-1 mt-auto">
                {node.isOptional && <span className="bg-slate-100 text-slate-500 border border-slate-200 text-[9px] px-1 rounded font-bold">OPTIONAL</span>}
                {node.requiresDocumentVerification && <span className="bg-blue-100 text-blue-700 text-[9px] px-1 rounded font-bold">DOCS</span>}
                {node.processingDeadlineDays && <span className="bg-amber-100 text-amber-700 text-[9px] px-1 rounded font-bold">{node.processingDeadlineDays}d</span>}
              </div>

              {/* Status indicator (mock) */}
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white bg-emerald-500"></div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
