import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavItem } from './NavItem';
import { QrisButton } from './QrisButton';
import { styles } from './BottomNav.styles';
import type { BottomNavProps } from './BottomNav.types';

export function BottomNav({ items, qris, style, testID }: BottomNavProps) {
  const insets = useSafeAreaInsets();

  if (!qris) {
    return (
      <View
        accessibilityRole="tablist"
        style={[styles.container, { paddingBottom: insets.bottom }, style ?? {}]}
        testID={testID}
      >
        {items.map((item) => (
          <NavItem key={item.key} item={item} />
        ))}
      </View>
    );
  }

  const half = Math.floor(items.length / 2);
  const leftItems = items.slice(0, half);
  const rightItems = items.slice(half);

  return (
    <View
      accessibilityRole="tablist"
      style={[styles.container, { paddingBottom: insets.bottom }, style ?? {}]}
      testID={testID}
    >
      <View style={[styles.menuContainer, { paddingLeft: 4 }]}>
        {leftItems.map((item) => (
          <NavItem key={item.key} item={item} />
        ))}
      </View>
      <View style={styles.qrisSlot}>
        <QrisButton qris={qris} />
      </View>
      <View style={[styles.menuContainer, { paddingLeft: 4 }]}>
        {rightItems.map((item) => (
          <NavItem key={item.key} item={item} />
        ))}
      </View>
    </View>
  );
}
