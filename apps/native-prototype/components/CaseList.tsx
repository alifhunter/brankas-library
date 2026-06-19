import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { color, typography } from '@brankas/native';
import type { CaseEntry } from '../cases';

export function CaseList({
  cases,
  onSelect,
}: {
  cases: CaseEntry[];
  onSelect: (entry: CaseEntry) => void;
}) {
  const grouped = groupByCategory(cases);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <Text style={styles.title}>Prototypes</Text>
        <Text style={styles.subtitle}>
          {cases.length} {cases.length === 1 ? 'case' : 'cases'} · drop a file in
          /cases to add more
        </Text>
      </View>

      {grouped.map((group) => (
        <View key={group.category} style={styles.section}>
          <Text style={styles.sectionHeader}>{group.category}</Text>
          <View style={styles.sectionBody}>
            {group.entries.map((entry, idx) => (
              <Pressable
                key={entry.id}
                onPress={() => onSelect(entry)}
                style={({ pressed }) => [
                  styles.row,
                  idx !== group.entries.length - 1 && styles.rowDivider,
                  pressed && styles.rowPressed,
                ]}
              >
                <View style={{ flex: 1, gap: 4 }}>
                  <View style={styles.rowHead}>
                    <Text style={styles.rowName}>{entry.meta.name}</Text>
                    <View
                      style={[
                        styles.typeBadge,
                        entry.meta.type === 'flow' && styles.typeBadgeFlow,
                      ]}
                    >
                      <Text
                        style={[
                          styles.typeBadgeText,
                          entry.meta.type === 'flow' && styles.typeBadgeTextFlow,
                        ]}
                      >
                        {entry.meta.type}
                      </Text>
                    </View>
                  </View>
                  {entry.meta.description ? (
                    <Text style={styles.rowDesc}>{entry.meta.description}</Text>
                  ) : null}
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function groupByCategory(cases: CaseEntry[]) {
  const map = new Map<string, CaseEntry[]>();
  for (const entry of cases) {
    const list = map.get(entry.meta.category) ?? [];
    list.push(entry);
    map.set(entry.meta.category, list);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, entries]) => ({ category, entries }));
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 24,
  },
  header: {
    gap: 4,
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    ...typography.mobile.heading.h3.bold,
    color: color.text.default,
  },
  subtitle: {
    ...typography.mobile.body.sm.regular,
    color: color.text.subtle,
  },
  section: {
    gap: 8,
    paddingTop: 16,
  },
  sectionHeader: {
    ...typography.mobile.body.sm.semibold,
    color: color.text.subtle,
    paddingHorizontal: 16,
    textTransform: 'uppercase',
  },
  sectionBody: {
    backgroundColor: color.background.default,
    marginHorizontal: 0,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowDivider: {
    borderBottomColor: color.border.subtle,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowPressed: {
    backgroundColor: color.background.subtle,
  },
  rowHead: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  rowName: {
    ...typography.mobile.body.md.semibold,
    color: color.text.default,
  },
  rowDesc: {
    ...typography.mobile.body.sm.regular,
    color: color.text.subtle,
  },
  typeBadge: {
    backgroundColor: color.background.subtle,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  typeBadgeFlow: {
    backgroundColor: color.background.selected,
  },
  typeBadgeText: {
    ...typography.mobile.body.xs.semibold,
    color: color.text.subtle,
    textTransform: 'uppercase',
  },
  typeBadgeTextFlow: {
    color: color.background.default,
  },
  chevron: {
    color: color.text.subtle,
    fontSize: 24,
    lineHeight: 24,
  },
});
