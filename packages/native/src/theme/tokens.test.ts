import { color, spacing, radius, shadow, typography } from './index';

describe('theme', () => {
  it('exposes semantic color groups as hex strings', () => {
    expect(color.text.default).toMatch(/^#[0-9a-f]{6}$/i);
    expect(color.text.brand).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('exposes numeric spacing and radius', () => {
    expect(typeof spacing[16]).toBe('number');
    expect(typeof radius[8]).toBe('number');
  });

  it('converts typography to RN-friendly numbers', () => {
    const display = typography.desktop.display.large.semibold;
    expect(typeof display.fontSize).toBe('number');
    expect(typeof display.lineHeight).toBe('number');
    expect(typeof display.letterSpacing).toBe('number');
  });

  it('converts shadow to RN shape', () => {
    expect(shadow.md).toMatchObject({
      shadowColor: expect.stringMatching(/^#/),
      shadowOffset: { width: expect.any(Number), height: expect.any(Number) },
      shadowOpacity: expect.any(Number),
      shadowRadius: expect.any(Number),
      elevation: expect.any(Number),
    });
  });

  it('exposes nested shadow.mobile.* group', () => {
    expect(shadow.mobile.selection).toMatchObject({
      shadowOffset: { width: 10, height: 10 },
      shadowRadius: 30,
    });
    expect(shadow.mobile.button).toMatchObject({
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 4,
      shadowOpacity: 0.06,
    });
    expect(shadow.mobile.bottomNav).toMatchObject({
      shadowOffset: { width: 10, height: 10 },
      shadowRadius: 34,
      shadowOpacity: 0.82,
    });
    expect(shadow.mobile.collapsiblePanel).toMatchObject({
      shadowOffset: { width: 4, height: -10 },
      shadowRadius: 8,
      shadowOpacity: 0.12,
    });
  });
});
