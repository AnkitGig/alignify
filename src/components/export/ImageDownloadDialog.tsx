
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";

interface ImageDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageDownloadDialog({ open, onOpenChange }: ImageDownloadDialogProps) {
  const [selectedScreen, setSelectedScreen] = useState<'all' | 'current'>('current');
  const [selectedFormat, setSelectedFormat] = useState<'PNG' | 'JPEG' | 'PDF'>('PNG');
  const [exportCount] = useState(1);
  const [isExporting, setIsExporting] = useState(false);

  const captureCanvasOnly = async (format: string): Promise<string> => {
    // Use html2canvas to capture only the canvas area
    const html2canvas = (await import('html2canvas')).default;
    
    // Find the Canvas component specifically
    const canvasElement = document.querySelector('.flex-1.overflow-auto.bg-gray-100.h-full.relative') as HTMLElement;
    
    if (!canvasElement) {
      throw new Error('Could not find canvas area to export');
    }

    const canvas = await html2canvas(canvasElement, {
      backgroundColor: '#f3f4f6', // Match the canvas bg-gray-100
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      width: canvasElement.offsetWidth,
      height: canvasElement.offsetHeight,
    });

    if (format === 'JPEG') {
      return canvas.toDataURL('image/jpeg', 0.9);
    } else {
      return canvas.toDataURL('image/png');
    }
  };

  const generatePDF = async (imageDataUrl: string) => {
    const jsPDF = (await import('jspdf')).jsPDF;
    const pdf = new jsPDF();
    
    // Get image dimensions
    const img = new Image();
    img.src = imageDataUrl;
    
    return new Promise<string>((resolve) => {
      img.onload = () => {
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (img.height * pdfWidth) / img.width;
        
        pdf.addImage(imageDataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        const pdfDataUrl = pdf.output('datauristring');
        resolve(pdfDataUrl);
      };
    });
  };

  const downloadFile = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      let dataUrl: string;
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      
      if (selectedFormat === 'PDF') {
        // First capture as PNG, then convert to PDF
        const pngDataUrl = await captureCanvasOnly('PNG');
        dataUrl = await generatePDF(pngDataUrl);
        downloadFile(dataUrl, `alignify-canvas-${timestamp}.pdf`);
      } else {
        // Direct image export
        dataUrl = await captureCanvasOnly(selectedFormat);
        const extension = selectedFormat.toLowerCase();
        downloadFile(dataUrl, `alignify-canvas-${timestamp}.${extension}`);
      }

      toast.success(`Successfully exported canvas as ${selectedFormat}`);
      onOpenChange(false);
      
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed. Please make sure you are in the editor with an active canvas.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Image Download</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">Screen</Label>
            <div className="text-sm text-gray-600 mb-4">Select the screens which you want to export</div>
            
            <div className="grid grid-cols-2 gap-4">
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer text-center ${
                  selectedScreen === 'all' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedScreen('all')}
              >
                <div className="w-16 h-12 bg-gray-100 rounded mx-auto mb-2 flex items-center justify-center">
                  <span className="text-xs">...</span>
                </div>
                <div className="text-sm font-medium">All screens</div>
              </div>
              
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer text-center relative ${
                  selectedScreen === 'current' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedScreen('current')}
              >
                <div className="w-16 h-12 bg-gray-100 rounded mx-auto mb-2 flex items-center justify-center">
                  <span className="text-xs">...</span>
                </div>
                <div className="text-sm font-medium">Current screen</div>
                {selectedScreen === 'current' && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                    ✓
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-base font-medium mb-3 block">Export format</Label>
            <div className="text-sm text-gray-600 mb-4">Select the export format</div>
            
            <div className="flex gap-2">
              {(['PNG', 'JPEG', 'PDF'] as const).map((format) => (
                <Button
                  key={format}
                  variant={selectedFormat === format ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFormat(format)}
                >
                  {format}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
            <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
              ⚡
            </div>
            <span>{exportCount} of 3 free exports used.</span>
            <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
              Upgrade to pro
            </Button>
          </div>
          
          <Button 
            onClick={handleExport} 
            className="w-full"
            disabled={isExporting}
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
