import { useState } from "react";
import { ZoomIn, ZoomOut, RotateCw, Download, Printer, Maximize, FileText } from "lucide-react";
import { Button } from "../../../../../../components/ui/Button";

export function DocumentViewer() {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden relative">
      {/* Viewer Header */}
      <div className="h-14 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3 text-white">
          <FileText className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-medium">MWU_Student_ID_Front.jpg</h3>
          <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded">2.4 MB</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-700" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs text-slate-300 w-12 text-center font-mono">{Math.round(scale * 100)}%</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-700" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <div className="w-px h-4 bg-slate-600 mx-2"></div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-700" onClick={handleRotate}>
            <RotateCw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-700" title="Download">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-700" title="Print">
            <Printer className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-300 hover:text-white hover:bg-slate-700" title="Fullscreen">
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Document Display */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMWUxZTFlIi8+CjxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMxZTFlMWUiLz4KPC9zdmc+')]">
        <div 
          className="transition-transform duration-200 ease-out origin-center"
          style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
        >
          {/* Placeholder for the ID card image */}
          <div className="w-[400px] h-[250px] bg-slate-200 rounded-xl border-4 border-white shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 w-full h-8 bg-blue-800"></div>
            <div className="w-24 h-24 bg-slate-300 rounded-full border-4 border-white z-10 -mt-8 shadow-sm"></div>
            <h4 className="mt-4 font-bold text-slate-800 text-lg">Madda Walabu University</h4>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Student ID Card</p>
            <div className="mt-4 text-center">
              <p className="text-sm font-bold text-slate-900">Chala Merera</p>
              <p className="text-xs font-mono text-slate-600">UGR/8821/11</p>
            </div>
          </div>
        </div>
      </div>

      {/* Document Thumbnails */}
      <div className="h-24 bg-slate-800 border-t border-slate-700 p-2 flex gap-2 overflow-x-auto">
        <div className="w-28 h-full bg-slate-900 rounded border-2 border-blue-500 flex flex-col items-center justify-center cursor-pointer shrink-0">
          <FileText className="w-5 h-5 text-blue-400 mb-1" />
          <span className="text-[10px] text-blue-400 font-medium">ID Front</span>
        </div>
        <div className="w-28 h-full bg-slate-900 rounded border border-slate-700 hover:border-slate-500 flex flex-col items-center justify-center cursor-pointer shrink-0 transition-colors">
          <FileText className="w-5 h-5 text-slate-500 mb-1" />
          <span className="text-[10px] text-slate-400 font-medium">ID Back</span>
        </div>
        <div className="w-28 h-full bg-slate-900 rounded border border-slate-700 hover:border-slate-500 flex flex-col items-center justify-center cursor-pointer shrink-0 transition-colors">
          <FileText className="w-5 h-5 text-slate-500 mb-1" />
          <span className="text-[10px] text-slate-400 font-medium">Support Doc</span>
        </div>
      </div>
    </div>
  );
}
