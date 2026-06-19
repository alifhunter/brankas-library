import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('render image ketika type=image dan src tersedia', () => {
    render(<Avatar type="image" src="https://example.com/avatar.png" alt="Profile avatar" />);

    expect(screen.getByRole('img', { name: 'Profile avatar' })).toBeInTheDocument();
  });

  it('fallback ke icon ketika type=image tapi src kosong', () => {
    render(<Avatar type="image" src="" />);

    expect(document.querySelector('.ui-avatar__icon')).toBeInTheDocument();
  });

  it('render initials dengan format uppercase dua karakter', () => {
    render(<Avatar type="initial" initials="alex" />);

    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('menerapkan size class yang benar', () => {
    render(<Avatar type="icon" size="small" data-testid="avatar" />);

    expect(screen.getByTestId('avatar')).toHaveClass('ui-avatar--size-small');
  });
});
