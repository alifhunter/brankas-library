import { Fragment } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { color, typography } from '../theme';
import { CheckIcon } from '../internal/icons';
import type {
  TrackerProps,
  TrackerSize,
  TrackerStep,
  TrackerStepStatus,
} from './Tracker.types';

const SELECTED = color.background.selected;
const NEUTRAL_LINE = color.neutral['300'];
const TEXT_DEFAULT = color.text.default;
const TEXT_GRAY = color.text.gray;
const TEXT_SUBTLEST = color.text.subtlest;
const TEXT_DEFAULT_DARK = color.neutral['700'];

const SIZE_MAP: Record<
  TrackerSize,
  { icon: number; activeBorder: number; rowGap: number; rowPadBottom: number; checkSize: number; arrowSize: number }
> = {
  medium: { icon: 16, activeBorder: 1, rowGap: 4, rowPadBottom: 16, checkSize: 10, arrowSize: 12 },
  large: { icon: 24, activeBorder: 1.8, rowGap: 4, rowPadBottom: 20, checkSize: 14, arrowSize: 16 },
};

function CompletedIcon({ size, checkSize }: { size: number; checkSize: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: SELECTED,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CheckIcon size={checkSize} color={color.background.default} />
    </View>
  );
}

function ActiveIcon({ size, borderWidth, arrowSize }: { size: number; borderWidth: number; arrowSize: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth,
        borderColor: SELECTED,
        backgroundColor: color.background.default,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={arrowSize} height={arrowSize} viewBox="0 0 24 24" fill="none">
        <Path
          d="M4 12a8 8 0 0 1 13.66-5.66L20 4"
          stroke={SELECTED}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M20 4v5h-5" stroke={SELECTED} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <Path
          d="M20 12a8 8 0 0 1-13.66 5.66L4 20"
          stroke={SELECTED}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M4 20v-5h5" stroke={SELECTED} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
}

function PendingIcon({ size, borderWidth }: { size: number; borderWidth: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={11} stroke={NEUTRAL_LINE} strokeWidth={2 / borderWidth} fill={color.background.default} />
    </Svg>
  );
}

function StatusIcon({
  status,
  size,
  borderWidth,
  checkSize,
  arrowSize,
}: {
  status: TrackerStepStatus;
  size: number;
  borderWidth: number;
  checkSize: number;
  arrowSize: number;
}) {
  if (status === 'completed') return <CompletedIcon size={size} checkSize={checkSize} />;
  if (status === 'active')
    return <ActiveIcon size={size} borderWidth={borderWidth} arrowSize={arrowSize} />;
  return <PendingIcon size={size} borderWidth={borderWidth} />;
}

function DefaultTrailingArrow({ size, color: c }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12h14"
        stroke={c}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13 6l6 6-6 6"
        stroke={c}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function StepRow({
  step,
  dims,
  isLast,
}: {
  step: TrackerStep;
  dims: typeof SIZE_MAP[TrackerSize];
  isLast: boolean;
}) {
  const isPending = step.status === 'pending';
  const labelColor = isPending ? TEXT_SUBTLEST : TEXT_DEFAULT;
  const supportingColor = isPending ? TEXT_GRAY : TEXT_SUBTLEST;
  const arrowColor = isPending ? TEXT_GRAY : TEXT_DEFAULT_DARK;
  const trailing = step.trailingIcon ?? (
    <DefaultTrailingArrow size={16} color={arrowColor} />
  );

  return (
    <Pressable
      accessibilityRole={step.onPress ? 'button' : undefined}
      accessibilityState={{ disabled: !step.onPress }}
      onPress={step.onPress}
      style={({ pressed }) => [styles.row, pressed && step.onPress ? styles.rowPressed : null]}
      testID={step.testID}
    >
      <View style={[styles.iconColumn, { width: dims.icon, paddingTop: 2, gap: dims.rowGap }]}>
        <StatusIcon
          status={step.status}
          size={dims.icon}
          borderWidth={dims.activeBorder}
          checkSize={dims.checkSize}
          arrowSize={dims.arrowSize}
        />
        {!isLast ? <View style={styles.connector} /> : null}
      </View>
      <View
        style={[
          styles.body,
          {
            paddingBottom: isLast ? 0 : dims.rowPadBottom,
          },
        ]}
      >
        <Text style={[styles.label, { color: labelColor }]}>{step.label}</Text>
        {step.supportingText ? (
          <Text style={[styles.supporting, { color: supportingColor }]}>{step.supportingText}</Text>
        ) : null}
      </View>
      <View style={styles.trailing}>{trailing}</View>
    </Pressable>
  );
}

export function Tracker({ steps, size = 'medium', style, testID }: TrackerProps) {
  const dims = SIZE_MAP[size];
  return (
    <View style={[styles.root, style ?? {}]} testID={testID}>
      {steps.map((step, i) => (
        <Fragment key={step.key}>
          <StepRow step={step} dims={dims} isLast={i === steps.length - 1} />
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12,
  },
  rowPressed: {
    opacity: 0.7,
  },
  iconColumn: {
    alignItems: 'center',
  },
  connector: {
    flex: 1,
    minHeight: 4,
    borderLeftWidth: 1,
    borderLeftColor: NEUTRAL_LINE,
    borderStyle: 'dashed',
  },
  body: {
    flex: 1,
    gap: 4,
    paddingTop: 0,
  },
  label: {
    ...typography.mobile.body.md.semibold,
  },
  supporting: {
    ...typography.mobile.body.sm.regular,
  },
  trailing: {
    width: 16,
    height: 16,
    paddingTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
