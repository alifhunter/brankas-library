import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TextField } from './TextField';

describe('TextField', () => {
  it('menghubungkan label ke input', () => {
    render(<TextField label="Email" helperText="Gunakan email kantor" />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('memanggil onChange saat user mengetik', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<TextField label="Username" onChange={onChange} />);

    await user.type(screen.getByLabelText('Username'), 'brankas');

    expect(onChange).toHaveBeenCalled();
  });

  it('menampilkan error message ketika validasi gagal', () => {
    render(<TextField label="Name" errorMessage="Harus diisi" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Harus diisi');
  });
});
