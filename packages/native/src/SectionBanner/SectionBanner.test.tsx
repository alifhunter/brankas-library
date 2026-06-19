import { render, screen } from '@testing-library/react-native';
import { SectionBanner } from './SectionBanner';

describe('SectionBanner', () => {
  it('renders body text for each tone', () => {
    for (const tone of ['info', 'warning', 'error'] as const) {
      const { unmount } = render(<SectionBanner tone={tone}>Hello</SectionBanner>);
      expect(screen.getByText('Hello')).toBeTruthy();
      unmount();
    }
  });
});
