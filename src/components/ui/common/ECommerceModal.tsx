import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../dialog';
import Heading4 from '../headings/Heading4';

interface ECommerceModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function ECommerceModal({
  title = 'Modal title',
  children,
  description,
  onClose,
}: ECommerceModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <Heading4>{title}</Heading4>
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
