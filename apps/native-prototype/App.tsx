import { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { color } from '@brankas/native';
import { cases, type CaseEntry } from './cases';
import { CaseList } from './components/CaseList';
import { CaseShell } from './components/CaseShell';

export default function App() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active: CaseEntry | undefined = activeId
    ? cases.find((c) => c.id === activeId)
    : undefined;

  const chrome = active?.meta.chrome ?? 'shell';
  // Fullscreen cases manage their own safe areas (status bar inset at the
  // top, BottomNav handles its own bottom inset). Shell cases get both
  // insets so floating content doesn't sit under chrome.
  const edges = chrome === 'fullscreen' ? ([] as const) : (['top', 'bottom'] as const);
  const statusBarStyle = chrome === 'fullscreen' ? 'light-content' : 'dark-content';

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <SafeAreaView edges={edges} style={styles.root}>
          <StatusBar barStyle={statusBarStyle} />
          {active ? (
            <CaseShell
              title={active.meta.name}
              onBack={() => setActiveId(null)}
              chrome={chrome}
            >
              <active.Component />
            </CaseShell>
          ) : (
            <CaseList cases={cases} onSelect={(entry) => setActiveId(entry.id)} />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: color.background.subtle,
    flex: 1,
  },
});
