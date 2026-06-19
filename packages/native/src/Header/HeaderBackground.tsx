import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { color } from '../theme';

/**
 * Brand red gradient used behind every page header. We don't render the
 * Sinarmas logo watermark from the Figma source (it's a raster asset); a
 * solid red gradient covers the same visual intent and stays vector-clean.
 */
export function HeaderBackground({ height = 220 }: { height?: number }) {
  return (
    <View style={[styles.root, { height }]} pointerEvents="none">
      <Svg width="100%" height={height} preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="hdr-grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#c10e0e" />
            <Stop offset="1" stopColor="#7a0a0a" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#hdr-grad)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: color.background['primary-red'],
    overflow: 'hidden',
  },
});
