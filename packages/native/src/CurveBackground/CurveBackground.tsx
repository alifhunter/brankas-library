import { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { color as palette } from '../theme';
import type { CurveBackgroundProps } from './CurveBackground.types';

export function CurveBackground({
  color = palette.background['primary-blue'],
  height = 200,
  curveDepth = 28,
  direction = 'down',
  width,
  style,
  children,
  testID,
}: CurveBackgroundProps) {
  const [measuredWidth, setMeasuredWidth] = useState<number>(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    setMeasuredWidth(event.nativeEvent.layout.width);
  };

  const w = typeof width === 'number' ? width : measuredWidth || 360;
  const totalH = height + curveDepth;

  // Cubic curve along the bottom (direction=down) or top (direction=up).
  const path =
    direction === 'down'
      ? `M0 0 H${w} V${height} C ${w * 0.66} ${height + curveDepth}, ${w * 0.33} ${height + curveDepth}, 0 ${height} Z`
      : `M0 ${curveDepth} C ${w * 0.33} 0, ${w * 0.66} 0, ${w} ${curveDepth} V${totalH} H0 Z`;

  return (
    <View
      style={[styles.root, { height: totalH }, style ?? {}]}
      onLayout={handleLayout}
      testID={testID}
    >
      {measuredWidth > 0 ? (
        <Svg
          width={w}
          height={totalH}
          viewBox={`0 0 ${w} ${totalH}`}
          style={StyleSheet.absoluteFill}
        >
          <Path d={path} fill={color} />
        </Svg>
      ) : null}
      {children ? <View style={styles.content}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
});
