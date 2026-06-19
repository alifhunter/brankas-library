import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, typography } from '../theme';
import { ChevronRightIcon } from '../internal/icons';
import type { AccountItemProps } from './AccountItem.types';

const NAME_TYPE = typography.mobile.body.lg.bold;
const ACCOUNT_NUMBER_TYPE = typography.mobile.body.md.regular;
const BALANCE_TYPE = typography.mobile.body.md.semibold;
const BADGE_TYPE = typography.mobile.body.sm.semibold;

const TEXT_NAME = color.text.default;
const TEXT_NUMBER = color.text.subtlest;
const TEXT_BALANCE = color.text.subtle;
const TEXT_BADGE = color.text.subtlest;
const TEXT_DISABLED = color.neutral['300'];
const BADGE_BG = color.background.subtle;
const ARTWORK_BG = color.background.subtle;

export function AccountItem({
  name,
  accountNumber,
  balance,
  badge,
  artwork,
  chevron = true,
  onPress,
  disabled = false,
  style,
  testID,
  accessibilityLabel,
}: AccountItemProps) {
  const nameColor = disabled ? TEXT_DISABLED : TEXT_NAME;
  const numberColor = disabled ? TEXT_DISABLED : TEXT_NUMBER;
  const balanceColor = disabled ? TEXT_DISABLED : TEXT_BALANCE;
  const chevronColor = disabled ? TEXT_DISABLED : color.text.default;

  const Container = onPress ? Pressable : View;
  return (
    <Container
      onPress={onPress as () => void}
      disabled={disabled}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={accessibilityLabel ?? `${name}, account ${accountNumber}`}
      style={[styles.root, style ?? {}]}
      testID={testID}
    >
      <View style={[styles.artwork, disabled ? styles.artworkDisabled : null]}>
        {artwork}
      </View>
      <View style={styles.content}>
        <View style={styles.identity}>
          <Text numberOfLines={2} style={[NAME_TYPE, { color: nameColor }]}>
            {name}
          </Text>
          <Text
            numberOfLines={1}
            style={[ACCOUNT_NUMBER_TYPE, { color: numberColor }]}
          >
            {accountNumber}
          </Text>
        </View>
        {balance ? (
          <Text numberOfLines={1} style={[BALANCE_TYPE, { color: balanceColor }]}>
            {balance}
          </Text>
        ) : null}
      </View>
      {badge || chevron ? (
        <View style={styles.trailing}>
          {badge ? (
            <View style={styles.badge}>
              <Text style={[BADGE_TYPE, { color: TEXT_BADGE }]}>{badge}</Text>
            </View>
          ) : null}
          {chevron ? (
            <View style={styles.chevronSlot}>
              <ChevronRightIcon size={16} color={chevronColor} />
            </View>
          ) : null}
        </View>
      ) : null}
    </Container>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    minWidth: 0,
  },
  artwork: {
    width: 36,
    height: 44,
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ARTWORK_BG,
  },
  artworkDisabled: {
    opacity: 0.4,
  },
  content: {
    flex: 1,
    minWidth: 0,
    gap: 12,
  },
  identity: {
    gap: 0,
  },
  trailing: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 0,
  },
  badge: {
    height: 24,
    paddingHorizontal: 16,
    borderRadius: 65,
    backgroundColor: BADGE_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronSlot: {
    width: 32,
    height: 44,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
