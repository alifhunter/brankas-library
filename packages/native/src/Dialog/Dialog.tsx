import { StyleSheet, Text, View } from 'react-native';
import { color, typography } from '../theme';
import { Overlay } from '../Overlay/Overlay';
import type { DialogProps } from './Dialog.types';

export function Dialog({
  open,
  onDismiss,
  title,
  description,
  children,
  footer,
  dismissOnBackdropPress = true,
  style,
  testID,
}: DialogProps) {
  return (
    <Overlay
      open={open}
      onDismiss={onDismiss}
      dismissOnBackdropPress={dismissOnBackdropPress}
      {...(testID ? { testID } : {})}
      accessibilityLabel={title ?? 'Dialog'}
    >
      <View pointerEvents="box-none" style={styles.center}>
        <View
          accessibilityViewIsModal
          accessibilityRole="alert"
          style={[styles.card, style ?? {}]}
        >
          {title ? (
            <Text accessibilityRole="header" style={styles.title}>
              {title}
            </Text>
          ) : null}
          {description ? <Text style={styles.description}>{description}</Text> : null}
          {children ? <View style={styles.content}>{children}</View> : null}
          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </View>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 328,
    backgroundColor: color.background.default,
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  title: {
    ...typography.mobile.heading.h3.bold,
    color: color.text.default,
  },
  description: {
    ...typography.mobile.body.md.regular,
    color: color.text.default,
  },
  content: {
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
});
