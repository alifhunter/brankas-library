import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  it('renders title and is closed by default', () => {
    render(
      <Accordion title="Title">
        <Text>body</Text>
      </Accordion>,
    );
    expect(screen.getByText('Title')).toBeTruthy();
    expect(screen.queryByText('body')).toBeNull();
  });

  it('expands when pressed', () => {
    render(
      <Accordion title="Title">
        <Text>body</Text>
      </Accordion>,
    );
    fireEvent.press(screen.getByRole('button'));
    expect(screen.getByText('body')).toBeTruthy();
  });

  it('reflects controlled open prop', () => {
    render(
      <Accordion title="Title" open>
        <Text>body</Text>
      </Accordion>,
    );
    expect(screen.getByText('body')).toBeTruthy();
  });

  it('does not toggle when disabled', () => {
    const onOpenChange = jest.fn();
    render(
      <Accordion title="Title" disabled onOpenChange={onOpenChange}>
        <Text>body</Text>
      </Accordion>,
    );
    fireEvent.press(screen.getByRole('button'));
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
