import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import Thanks from './Thanks';
import supporters from '@/data/supporters.json';

test('lists every supporter, grouped by tier', () => {
  render(<Thanks />);
  const total = supporters.tiers.reduce((n, tier) => n + tier.length, 0);
  expect(total).toBe(supporters.people);
  expect(screen.getByRole('heading', { name: /1,000,000\+ sats/ })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /.+/ }).filter((a) => a.getAttribute('href')?.startsWith('https://brainstorm.world/p/npub1'))).toHaveLength(total);
});

test('finds a supporter by name', () => {
  render(<Thanks />);
  const [name] = supporters.tiers[0][0];
  fireEvent.change(screen.getByLabelText('Find your name'), { target: { value: name } });
  expect(screen.getByText(/found/)).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name })[0]).toBeInTheDocument();
});
