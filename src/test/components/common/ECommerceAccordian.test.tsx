import ECommerceAccordion, {
  ItemValue,
} from '@/components/ui/common/ECommerceAccordian';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect, describe } from 'vitest';

describe('Accordion Component', () => {
  const items = [
    { triggerText: 'item 1', content: <p>content 1</p> },
    { triggerText: 'item 2', content: <p>content 2</p> },
  ];

  const renderAccordion = (defaultValue: ItemValue[] = []) =>
    render(
      <ECommerceAccordion accordionItems={items} defaultValue={defaultValue} />
    );

  it('should render into the DOM', () => {
    renderAccordion();
    const accordionTriggers = screen.getAllByText(/item/i);
    expect(accordionTriggers).toHaveLength(items.length);
  });

  it('should render content by default when defaultValues are provided', () => {
    renderAccordion(['item-1']);
    expect(screen.getByText(/content 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/content 2/i)).not.toBeInTheDocument();
  });

  it.each(items)(
    'should open the content when clicked on $triggerText',
    async ({ triggerText, content }) => {
      renderAccordion();
      expect(
        screen.queryByText(content.props.children)
      ).not.toBeInTheDocument();

      // Open content
      await userEvent.click(screen.getByText(triggerText));
      expect(
        await screen.findByText(content.props.children)
      ).toBeInTheDocument();
    }
  );

  it.each(items)(
    'should close the content when clicked again on $triggerText',
    async ({ triggerText, content }) => {
      renderAccordion();
      const accordionTrigger = screen.getByText(triggerText);

      // Open content
      await userEvent.click(accordionTrigger);
      expect(
        await screen.findByText(content.props.children)
      ).toBeInTheDocument();

      // Close content
      await userEvent.click(accordionTrigger);
      expect(
        screen.queryByText(content.props.children)
      ).not.toBeInTheDocument();
    }
  );
});
