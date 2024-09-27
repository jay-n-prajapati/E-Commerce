import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import React, { HTMLProps, useState } from 'react';
import Heading4 from '../headings/Heading4';
import { Loader2 } from 'lucide-react';
import Heading5 from '../headings/Heading5';
import useDisClosure from '@/hooks/useDisClosure';
import { cn } from '@/lib/utils';
import { Button } from '../button';

interface ECommerceAlertDialogProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onConfirm: () => Promise<boolean>; // Changed to async
  triggerClassName?: HTMLProps<HTMLElement>['className'];
}

export default function ECommerceAlertDialog({
  title,
  description,
  children,
  onConfirm,
  triggerClassName,
}: ECommerceAlertDialogProps) {
  const { open, close, setIsOpen, isOpen } = useDisClosure();
  // const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Track loading state

  const handleConfirm = async () => {
    setIsProcessing(true); // Show loading spinner
    const success = await onConfirm(); // Wait for onConfirm to complete
    setIsProcessing(false); // Hide loading spinner

    if (success) {
      close(); // Close the dialog if operation succeeded
    }
  };

  return (
    <>
      <div
        className={cn(
          'cursor-pointer px-2 py-1.5 hover:bg-secondary',
          triggerClassName
        )}
        onClick={() => open()}
      >
        {children}
      </div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="w-[95%]">
          <AlertDialogHeader>
            <Heading4 className="text-destructive">{title}</Heading4>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant={'outline'}
              onClick={() => close()}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              variant={'destructive'}
              disabled={isProcessing}
              className="mb-2 sm:mb-0"
            >
              Continue
            </Button>
          </AlertDialogFooter>
          {isProcessing && (
            <div className="absolute left-0 top-0 flex size-full flex-col items-center justify-center gap-2 bg-secondary/70">
              <Loader2 className="size-10 animate-spin text-secondary-foreground repeat-infinite" />
              <Heading5 className="text-secondary-foreground">
                Please Wait...
              </Heading5>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
