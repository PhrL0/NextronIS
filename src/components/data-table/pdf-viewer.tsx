import { Flex } from "../layout";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

interface PDFViewerProps {
  pdfUrl: string;
  onClose: () => void;
}

export function DataTablePDFViewer({ pdfUrl, onClose }: PDFViewerProps) {
  return (
    <Sheet
      open={pdfUrl != ""}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent className="sm:max-w-screen w-full">
        <SheetHeader>
          <SheetTitle>Visualizador de PDF</SheetTitle>
          <SheetDescription>Verifique se o PDF esta correto</SheetDescription>
          <SheetClose className="absolute top-4 right-4" />
        </SheetHeader>
        <Flex className="size-full px-4 pb-4">
          <iframe
            src={pdfUrl}
            className="size-full"
            title="PDF Viewer"
          ></iframe>
        </Flex>
      </SheetContent>
    </Sheet>
  );
}
