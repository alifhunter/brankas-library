import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { color } from '../theme';
import { QRIS_SIZE, styles, tone } from './BottomNav.styles';
import type { BottomNavQris } from './BottomNav.types';

export function QrisButton({ qris }: { qris: BottomNavQris }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={qris.accessibilityLabel ?? 'QRIS'}
      onPress={qris.onPress}
      style={styles.qrisButton}
      testID={qris.testID}
    >
      <View style={styles.qrisGradientLayer} pointerEvents="none">
        <Svg width={QRIS_SIZE} height={QRIS_SIZE}>
          <Defs>
            <LinearGradient id="qris-gradient" x1="0.5" y1="0" x2="0.5" y2="1">
              <Stop offset="0" stopColor={tone.qrisStart} />
              <Stop offset="1" stopColor={tone.qrisEnd} />
            </LinearGradient>
          </Defs>
          <Rect width={QRIS_SIZE} height={QRIS_SIZE} fill="url(#qris-gradient)" />
        </Svg>
      </View>
      <View style={styles.qrisIconWrap} pointerEvents="none">
        {qris.icon({ color: color.background.default, size: 40 })}
      </View>
    </Pressable>
  );
}
