import ECommerceSelect from '@/components/ui/common/ECommerceSelect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect, describe } from 'vitest';

describe('Select Component', () => {
  const items = [
    { label: 'item 1', value: '1' },
    { label: 'item 2', value: '2' },
  ];

  const mockOnChange = vi.fn();

  const renderSelect = (value = '') => {
    render(
      <ECommerceSelect
        placeholder="select items"
        value={value}
        onChange={mockOnChange}
        selectItems={items}
      />
    );
  };

  it('should render its trigger with placeholder', () => {
    renderSelect();
    expect(screen.getByText(/select/i)).toBeInTheDocument();
  });

  it.each(items)(
    'should render trigger with : if value=$value then label=$label',
    async ({ label, value }) => {
      renderSelect(value);
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  );

  it('should render options when click the trigger', async () => {
    renderSelect();
    await userEvent.click(screen.getByRole('combobox'));
    expect(await screen.findAllByRole('option')).toHaveLength(items.length);
  });

  it.each(items)(
    'should execute onChange with selected item and trigger has text=$label',
    async ({ label, value }) => {
      renderSelect();
      await userEvent.click(screen.getByRole('combobox'));
      const option = await screen.findByRole('option', { name: label });
      await userEvent.click(option);
      expect(mockOnChange).toBeCalledWith(value);
    }
  );
});
