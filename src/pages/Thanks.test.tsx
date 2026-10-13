import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import Thanks from './Thanks';
import data from '@/data/supporters.json';

const profileLinks = () => screen.getAllByRole('link').filter((a) => a.getAttribute('href')?.startsWith('https://brainstorm.world/p/npub1'));

test('ranks supporters by total, largest first', () => {
  const totals = data.supporters.map((s) => s[2] as number);
  expect(totals).toEqual([...totals].sort((a, b) => b - a));
  expect(data.supporters).toHaveLength(data.people);

  render(<Thanks />);
  expect(profileLinks()).toHaveLength(200);
  expect(profileLinks()[0]).toHaveAttribute('href', `https://brainstorm.world/p/${data.supporters[0][1]}`);
});

test('shows everyone on request', () => {
  render(<Thanks />);
  fireEvent.click(screen.getByRole('button', { name: /Show all/ }));
  expect(profileLinks()).toHaveLength(data.people);
});

test('finds a supporter by name and keeps their place', () => {
  render(<Thanks />);
  const [name, npub] = data.supporters[2] as [string, string];
  fireEvent.change(screen.getByLabelText('Find your name'), { target: { value: npub } });
  expect(screen.getByText('1 found')).toBeInTheDocument();
  expect(profileLinks()).toHaveLength(1);
  expect(screen.getByRole('listitem')).toHaveTextContent(new RegExp(`^3${name}`));
});
