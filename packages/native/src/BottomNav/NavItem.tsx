import { Pressable, Text, View } from 'react-native';
import { ICON_SIZE, styles, tone } from './BottomNav.styles';
import type { BottomNavItem } from './BottomNav.types';

export function NavItem({ item }: { item: BottomNavItem }) {
  const color = item.active ? tone.active : tone.inactive;
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityLabel={item.accessibilityLabel ?? item.label}
      accessibilityState={{ selected: !!item.active }}
      onPress={item.onPress}
      style={styles.item}
      testID={item.testID}
    >
      <View style={styles.iconWrap}>
        {item.icon({ color, size: ICON_SIZE })}
        {item.badge !== undefined && item.badge !== null ? (
          <View style={styles.badge} pointerEvents="none">
            <Text numberOfLines={1} style={styles.badgeText}>
              {String(item.badge)}
            </Text>
          </View>
        ) : null}
      </View>
      <Text numberOfLines={1} style={[styles.label, { color }]}>
        {item.label}
      </Text>
    </Pressable>
  );
}
