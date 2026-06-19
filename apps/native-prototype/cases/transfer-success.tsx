import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, color, typography } from '@brankas/native';
import type { CaseMeta } from './_types';

export const meta: CaseMeta = {
  name: 'Transfer success',
  category: 'Transfer',
  type: 'screen',
  description: 'Confirmation screen after a successful transfer.',
};

export default function TransferSuccess() {
  return (
    <View style={styles.root}>
      <View style={styles.hero}>
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
        <Text style={styles.title}>Transfer successful</Text>
        <Text style={styles.amount}>Rp 250.000</Text>
        <Text style={styles.caption}>Sent to Lazuardi Putra</Text>
      </View>

      <View style={styles.receipt}>
        <ReceiptRow label="Reference" value="TRX-204781" />
        <ReceiptRow label="To" value="BCA · 1234 5678" />
        <ReceiptRow label="Fee" value="Free" />
        <ReceiptRow label="When" value="Today, 9:42 PM" />
      </View>

      <View style={styles.actions}>
        <Button onPress={() => undefined}>Done</Button>
        <Button variant="secondary" onPress={() => undefined}>
          Share receipt
        </Button>
      </View>
    </View>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.receiptRow}>
      <Text style={styles.receiptLabel}>{label}</Text>
      <Text style={styles.receiptValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 24,
    padding: 16,
  },
  hero: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 32,
  },
  checkCircle: {
    alignItems: 'center',
    backgroundColor: color.background.success,
    borderRadius: 999,
    height: 64,
    justifyContent: 'center',
    marginBottom: 8,
    width: 64,
  },
  checkMark: {
    color: color.background.default,
    fontSize: 32,
    fontWeight: '700',
  },
  title: {
    ...typography.mobile.heading.h4.bold,
    color: color.text.default,
  },
  amount: {
    ...typography.mobile.heading.h2.bold,
    color: color.text.default,
  },
  caption: {
    ...typography.mobile.body.md.regular,
    color: color.text.subtle,
  },
  receipt: {
    backgroundColor: color.background.default,
    borderRadius: 12,
    gap: 12,
    padding: 16,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  receiptLabel: {
    ...typography.mobile.body.sm.regular,
    color: color.text.subtle,
  },
  receiptValue: {
    ...typography.mobile.body.sm.semibold,
    color: color.text.default,
  },
  actions: {
    gap: 8,
    marginTop: 'auto',
  },
});
