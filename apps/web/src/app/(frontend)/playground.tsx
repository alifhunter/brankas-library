'use client';

import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Search,
  type ButtonSize,
  type ButtonVariant,
} from '@brankas/react/desktop';

const buttonVariants: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'danger-primary'];
const buttonSizes: ButtonSize[] = ['small', 'medium', 'large', 'extra-large'];

export function ComponentPlayground() {
  const [buttonVariant, setButtonVariant] = useState<ButtonVariant>('primary');
  const [buttonSize, setButtonSize] = useState<ButtonSize>('large');

  const code = useMemo(
    () => `import { Button, Search } from '@brankas/react/desktop';

<Button variant="${buttonVariant}" size="${buttonSize}">
  Button
</Button>

<Search showButton showShortcutHint={false} placeholder="Search records" />`,
    [buttonSize, buttonVariant],
  );

  return (
    <div className="playground">
      <div className="control-panel">
        <SegmentedControl
          label="Button variant"
          options={buttonVariants}
          value={buttonVariant}
          onChange={setButtonVariant}
        />
        <SegmentedControl
          label="Button size"
          options={buttonSizes}
          value={buttonSize}
          onChange={setButtonSize}
        />
      </div>
      <div className="playground-canvas">
        <div className="component-row">
          <Button size={buttonSize} variant={buttonVariant}>
            Button
          </Button>
          <Button size={buttonSize} variant="secondary">
            Secondary
          </Button>
          <Badge color="blue" type="number" text={9} />
        </div>
        <Search showButton showDropdown showShortcutHint={false} defaultValue="Sinarmas Terang Silau" />
        <pre className="code-sample">{code}</pre>
      </div>
    </div>
  );
}

function SegmentedControl<T extends string>({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: T) => void;
  options: readonly T[];
  value: T;
}) {
  return (
    <div className="control-group">
      <label>{label}</label>
      <div className="segmented">
        {options.map((option) => (
          <button
            data-active={option === value}
            key={option}
            onClick={() => onChange(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
