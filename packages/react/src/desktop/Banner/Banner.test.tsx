import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Banner } from './Banner';

const MESSAGE =
  'Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan untuk mendemostrasikan elemen grafis.';

describe('Banner', () => {
  it('render variant section default', () => {
    render(<Banner variant="section" intent="informational" size="default" message={MESSAGE} />);

    expect(screen.getByText(MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(MESSAGE).closest('.ui-banner')).toHaveClass('ui-banner--variant-section');
  });

  it('render variant page warning', () => {
    render(<Banner variant="page" intent="warning" message="Sedang ada kendala di server..." />);

    expect(screen.getByText('Sedang ada kendala di server...').closest('.ui-banner')).toHaveClass(
      'ui-banner--page-intent-warning',
    );
  });

  it('toggle read more/show less untuk variant message', async () => {
    const user = userEvent.setup();

    render(<Banner variant="message" intent="orange" message={MESSAGE} showReadMore />);

    const readMore = screen.getByRole('button', { name: 'Read more' });
    await user.click(readMore);
    expect(screen.getByRole('button', { name: 'Show less' })).toBeInTheDocument();
  });

  it('memanggil onClose saat close button ditekan', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Banner
        variant="section"
        intent="error"
        size="default"
        message={MESSAGE}
        showCloseButton
        onClose={onClose}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Close banner' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
