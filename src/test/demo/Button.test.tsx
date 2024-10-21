import { Button } from '@/components/ui/button';
import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

describe('button component', () => {
  it('should be rendered', async () => {
    render(<Button>click me</Button>);

    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
    screen.debug();
  });
});
