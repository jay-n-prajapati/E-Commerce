import React from 'react';
import { Loader2 } from 'lucide-react';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import Heading5 from '@/components/ui/headings/Heading5';

export default function Loading() {
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent className="flex w-fit flex-col gap-4">
        <Loader2 className="mx-auto size-12 animate-spin text-primary repeat-infinite" />
        <Heading5 className="text-center text-sm">
          Please Wait for moment...
        </Heading5>
      </AlertDialogContent>
    </AlertDialog>
  );
}
