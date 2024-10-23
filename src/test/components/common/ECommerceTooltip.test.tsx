import ECommerceTooltip from '@/components/ui/common/ECommerceTooltip';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect, describe } from 'vitest';

describe('Tooltip Component', () => {
  it('should render the children', () => {
    render(
      <ECommerceTooltip>
        <p>Hover me</p>
      </ECommerceTooltip>
    );
    expect(screen.getByText(/hover me/i)).toBeInTheDocument();
  });

  it('should render the tooltip content on hover of children', async () => {
    render(
      <ECommerceTooltip tooltipContent="hovered content">
        <p>Hover me</p>
      </ECommerceTooltip>
    );

    await userEvent.hover(screen.getByText(/hover me/i));
    expect(
      await screen.findByRole('tooltip', { name: /hovered content/i })
    ).toBeInTheDocument();
  });
  it('should not render the tooltip content on no-hover of children', async () => {
    render(
      <ECommerceTooltip tooltipContent="hovered content">
        <p>Hover me</p>
      </ECommerceTooltip>
    );

    const tooltipTrigger = screen.getByText(/hover me/i);
    await userEvent.hover(tooltipTrigger);

    expect(
      await screen.findByRole('tooltip', {
        name: /hovered content/i,
      })
    ).toBeInTheDocument();
    await userEvent.unhover(tooltipTrigger);
  });
});
