import { ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../accordion';

interface ECommerceAccordionProps {
  type: 'single' | 'multiple';
  collapsible?: boolean;
  accordionItems: { triggerText: string; content: ReactNode }[];
  defaultValue: string[];
}

export default function ECommerceAccordion({
  accordionItems = [],
  defaultValue = [],
}: ECommerceAccordionProps) {
  return (
    <Accordion type={'multiple'} defaultValue={defaultValue}>
      {accordionItems.map((item, idx) => (
        <AccordionItem value={`item-${idx + 1}`} key={idx} className="px-4">
          <AccordionTrigger>{item.triggerText}</AccordionTrigger>
          <AccordionContent className="px-1">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
