import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { color, shadow, typography } from '../theme';
import { ChevronRightIcon, ErrorIcon } from '../internal/icons';
import type { SourceOfFundProps } from './SourceOfFund.types';

const LABEL_TYPE = typography.mobile.body.lg.semibold;
const EMPTY_TYPE = typography.mobile.body.md.semibold;
const ERROR_TYPE = typography.mobile.body.sm.regular;

const LABEL_COLOR = color.text.subtlest;
const EMPTY_COLOR = color.text.subtle;
const BORDER_ERROR = color.border.error;
const TEXT_ERROR = color.text.error;
const CARD_BG = color.background.default;

function EmptyCardIcon({ size = 36 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <Rect
        x={4}
        y={9}
        width={28}
        height={18}
        rx={3}
        stroke={color.neutral['400']}
        strokeWidth={1.5}
        fill={color.background.subtle}
      />
      <Path d="M4 14h28" stroke={color.neutral['400']} strokeWidth={1.5} />
    </Svg>
  );
}

export function SourceOfFund({
  label = 'Source account',
  variant = 'card',
  children,
  emptyText = 'No account selected',
  error,
  disabled = false,
  onPress,
  style,
  testID,
}: SourceOfFundProps) {
  const hasError = !!error;
  const showLabel = variant !== 'selector';
  const Container = onPress && !disabled ? Pressable : View;

  return (
    <View style={[styles.root, style ?? {}]} testID={testID}>
      <Container
        onPress={onPress as () => void}
        disabled={disabled}
        accessibilityRole={onPress ? 'button' : undefined}
        style={[
          styles.card,
          hasError ? styles.cardError : null,
          disabled ? styles.cardDisabled : null,
        ]}
      >
        {showLabel ? <Text style={[LABEL_TYPE, { color: LABEL_COLOR }]}>{label}</Text> : null}

        {variant === 'empty' ? (
          <View style={styles.emptyRow}>
            <EmptyCardIcon />
            <Text style={[EMPTY_TYPE, { color: EMPTY_COLOR }]}>{emptyText}</Text>
            {onPress ? (
              <View style={styles.cornerChevron}>
                <ChevronRightIcon size={16} color={color.text.default} />
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.contentRow}>
            <View style={styles.contentSlot}>{children}</View>
            {onPress ? (
              <View style={styles.chevronSlot}>
                <ChevronRightIcon size={16} color={color.text.default} />
              </View>
            ) : null}
          </View>
        )}
      </Container>

      {hasError ? (
        <View style={styles.errorRow}>
          <ErrorIcon size={14} color={TEXT_ERROR} />
          <Text style={[ERROR_TYPE, { color: TEXT_ERROR, flex: 1 }]}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 8,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
    ...shadow.mobile.selection,
  },
  cardError: {
    borderWidth: 0.5,
    borderColor: BORDER_ERROR,
  },
  cardDisabled: {
    opacity: 0.7,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 0,
  },
  contentSlot: {
    flex: 1,
    minWidth: 0,
  },
  chevronSlot: {
    width: 32,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    minHeight: 44,
  },
  cornerChevron: {
    position: 'absolute',
    top: -4,
    right: 0,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 4,
  },
});
