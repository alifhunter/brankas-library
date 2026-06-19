import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextField, color, typography } from '@brankas/native';
import type { CaseMeta } from './_types';

export const meta: CaseMeta = {
  name: 'Open new savings account',
  category: 'Onboarding',
  type: 'flow',
  description: 'Three-step KYC: intro → form → success.',
};

type Step = 'intro' | 'form' | 'success';

export default function OpenAccountFlow() {
  const [step, setStep] = useState<Step>('intro');
  const [name, setName] = useState('');

  if (step === 'intro') {
    return (
      <View style={styles.root}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>2 minutes</Text>
          <Text style={styles.title}>Open a savings account</Text>
          <Text style={styles.body}>
            Free, no minimum balance, with a debit card delivered to your
            address within 3 business days.
          </Text>
        </View>
        <View style={styles.actions}>
          <Button onPress={() => setStep('form')}>Get started</Button>
        </View>
      </View>
    );
  }

  if (step === 'form') {
    return (
      <View style={styles.root}>
        <View style={{ gap: 4 }}>
          <Text style={styles.step}>Step 1 of 1</Text>
          <Text style={styles.title}>Your name</Text>
        </View>
        <TextField
          label="Full name (as on KTP)"
          value={name}
          onChangeText={setName}
          hint="We'll verify this against the national registry."
        />
        <View style={styles.actions}>
          <Button onPress={() => setStep('success')} disabled={name.trim().length < 2}>
            Continue
          </Button>
          <Button variant="secondary" onPress={() => setStep('intro')}>
            Back
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Welcome aboard</Text>
        <Text style={styles.title}>You're all set, {name || 'there'}!</Text>
        <Text style={styles.body}>
          Your new account number arrives via SMS within an hour. The debit
          card ships tomorrow.
        </Text>
      </View>
      <View style={styles.actions}>
        <Button onPress={() => setStep('intro')}>Restart flow</Button>
      </View>
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
    gap: 12,
    paddingTop: 24,
  },
  eyebrow: {
    ...typography.mobile.body.sm.semibold,
    color: color.text.subtle,
    textTransform: 'uppercase',
  },
  step: {
    ...typography.mobile.body.sm.regular,
    color: color.text.subtle,
  },
  title: {
    ...typography.mobile.heading.h3.bold,
    color: color.text.default,
  },
  body: {
    ...typography.mobile.body.md.regular,
    color: color.text.default,
  },
  actions: {
    gap: 8,
    marginTop: 'auto',
  },
});
