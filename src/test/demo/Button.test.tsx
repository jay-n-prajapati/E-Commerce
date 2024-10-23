import { Button } from '@/components/ui/button';
import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
  it('should be rendered with children', async () => {
    render(<Button>click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('should render loader when loading is true', () => {
    render(
      <Button isLoading disabled>
        click me
      </Button>
    );

    expect(screen.getByLabelText(/loader/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });

  it('should perform some action on click', async () => {
    // arrange
    const mockHandleClick = vi.fn();
    render(<Button onClick={() => mockHandleClick()}>click me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    // action
    await userEvent.click(buttonElement);

    // assert
    expect(mockHandleClick).toHaveBeenCalledOnce();
  });
});
