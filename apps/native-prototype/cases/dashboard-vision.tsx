import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Path, Polyline, Rect, Stop } from 'react-native-svg';
import { BottomNav, TabsChip, color, typography } from '@brankas/native';
import type { CaseMeta } from './_types';

export const meta: CaseMeta = {
  name: 'Dashboard vision',
  category: 'Dashboard',
  type: 'screen',
  description: 'Simobi+ home screen — balance, quick actions, favorites, promos, watchlist.',
  chrome: 'fullscreen',
};

const NAV_HEIGHT = 84;

export default function DashboardVision() {
  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: NAV_HEIGHT + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero section + balance card composite. The card is absolutely
            positioned so its dark navy footer extends past the red curve into
            the white section below. zIndex keeps it above QuickActions. */}
        <View style={styles.heroSection}>
          <BalanceHero />
        </View>
        <QuickActions />
        <Divider />
        <FavoritesSection />
        <Divider />
        <PromosSection />
        <WatchlistSection />
      </ScrollView>
      <DashboardBottomNav />
    </View>
  );
}

// ============================================================================
// Hero balance card
// ============================================================================

const HERO_BASE_HEIGHT = 244;
// Reduced curve so the red bottom + 20px gap to QuickActions fits naturally.
// A larger curve forces a bigger gap because the curve max must clear the
// action icons.
const HERO_CURVE = 12;
const CARD_OFFSET_TOP = 80;

function BalanceHero() {
  const [hidden, setHidden] = useState(false);
  const insets = useSafeAreaInsets();
  // Hero extends under the status bar; pad inside so the simobi+ row clears
  // the notch / Dynamic Island.
  const heroHeight = HERO_BASE_HEIGHT + insets.top;
  const cardTop = CARD_OFFSET_TOP + insets.top;

  return (
    <>
      <View style={[styles.heroBg, { height: heroHeight + HERO_CURVE, paddingTop: insets.top }]}>
        {/* Red gradient with a curved bottom edge — inlined because the
            existing CurveBackground component only supports a solid color. */}
        <Svg
          height="100%"
          preserveAspectRatio="none"
          style={StyleSheet.absoluteFillObject}
          viewBox={`0 0 360 ${heroHeight + HERO_CURVE}`}
          width="100%"
        >
          <Defs>
            <LinearGradient id="hero" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#330B03" />
              <Stop offset="1" stopColor="#B50000" />
            </LinearGradient>
          </Defs>
          <Path
            d={`M0 0 H360 V${heroHeight} C 240 ${heroHeight + HERO_CURVE}, 120 ${heroHeight + HERO_CURVE}, 0 ${heroHeight} Z`}
            fill="url(#hero)"
          />
        </Svg>

        <View style={styles.topBar}>
          <Text style={styles.simobiLogo}>
            simobi<Text style={{ color: '#FFD24D' }}>+</Text>
          </Text>
          <View style={styles.topBarActions}>
            <ChatIcon />
            <BellIcon />
            <LogoutIcon />
          </View>
        </View>
      </View>

      {/* Absolute-positioned card straddling the red→white boundary. Its dark
          navy footer hangs into the white area below. */}
      <View style={[styles.balanceCard, { top: cardTop }]}>
        <View style={styles.balanceCardTop}>
          <View style={styles.balanceRow}>
            <View style={styles.accountRow}>
              <Text style={styles.accountNumber}>0056161597</Text>
              <CopyIcon />
            </View>
            <View style={styles.defaultPill}>
              <Text style={styles.defaultPillText}>Default</Text>
              <View style={styles.defaultPillChevron}>
                <ChevronDownGlyph />
              </View>
            </View>
          </View>

          <View style={{ gap: 2, marginTop: 10 }}>
            <Text style={styles.balanceLabel}>Simas Digi balance</Text>
            <View style={styles.balanceValueRow}>
              <Text style={styles.balanceValue}>
                {hidden ? '••••••••••' : 'Rp280.000.000'}
              </Text>
              <Pressable hitSlop={8} onPress={() => setHidden((v) => !v)}>
                <EyeOffIcon />
              </Pressable>
            </View>
          </View>
        </View>

        <Pressable style={styles.viewDetails}>
          <Text style={styles.viewDetailsText}>View account details</Text>
          <Text style={styles.viewDetailsChevron}>›</Text>
        </Pressable>
      </View>
    </>
  );
}

// Minimal SVG icons — replace the emoji placeholders that were rendering
// inconsistently across devices.
function ChatIcon() {
  return (
    <Svg height={22} width={22} viewBox="0 0 24 24">
      <Path
        d="M4 6.5C4 5.12 5.12 4 6.5 4h11C18.88 4 20 5.12 20 6.5v8c0 1.38-1.12 2.5-2.5 2.5H10l-4 3v-3h-.5C4.12 17 3 15.88 3 14.5z"
        fill="white"
      />
    </Svg>
  );
}
function BellIcon() {
  return (
    <Svg height={22} width={22} viewBox="0 0 24 24">
      <Path
        d="M12 22a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 22zm7-6V11a7 7 0 1 0-14 0v5l-2 2v1h18v-1z"
        fill="white"
      />
    </Svg>
  );
}
function LogoutIcon() {
  return (
    <Svg height={22} width={22} viewBox="0 0 24 24">
      <Path
        d="M10 17l-1.5-1.5L11 13H3v-2h8L8.5 8.5 10 7l5 5zm9-14H5c-1.1 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        fill="white"
      />
    </Svg>
  );
}
function CopyIcon() {
  return (
    <Svg height={14} width={14} viewBox="0 0 24 24">
      <Path
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11z"
        fill="rgba(255,255,255,0.85)"
      />
    </Svg>
  );
}
function ChevronDownGlyph() {
  return (
    <Svg height={8} width={8} viewBox="0 0 24 24">
      <Path d="M7 10l5 5 5-5z" fill={color.text.default} />
    </Svg>
  );
}
function EyeOffIcon() {
  return (
    <Svg height={18} width={18} viewBox="0 0 24 24">
      <Path
        d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92C21.07 15.4 22.49 13.83 23.5 12 21.27 7.61 16.97 4.5 12 4.5c-1.4 0-2.74.23-4 .65l2.17 2.17C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.7 11.7 0 0 0 .5 12c2.23 4.39 6.53 7.5 11.5 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16C15.01 10.34 13.67 9 12 9z"
        fill="white"
      />
    </Svg>
  );
}

// ============================================================================
// Quick action grid
// ============================================================================

type Action = {
  label: string;
  glyph: string;
  tint?: string;
  badge?: string;
};

const ACTIONS_ROW_1: Action[] = [
  { label: 'Transfer', glyph: '✈', tint: '#C10E0E' },
  { label: 'Bills & Top-ups', glyph: '🧾', tint: '#C10E0E' },
  { label: 'QRIS Tap', glyph: '◉', tint: '#C10E0E' },
  { label: 'Exchange Rates', glyph: '$', tint: '#C10E0E' },
];
const ACTIONS_ROW_2: Action[] = [
  { label: 'Cardless Transactions', glyph: '💳', tint: '#C10E0E' },
  { label: 'Mutual Fund', glyph: '📊', tint: '#C10E0E' },
  { label: 'Time Deposit', glyph: '🌱', tint: '#C10E0E', badge: '8% p.a.' },
  { label: 'More', glyph: '⋯', tint: '#C10E0E' },
];

function QuickActions() {
  return (
    <View style={styles.actionsWrap}>
      <ActionsRow items={ACTIONS_ROW_1} />
      <ActionsRow items={ACTIONS_ROW_2} />
    </View>
  );
}

function ActionsRow({ items }: { items: Action[] }) {
  return (
    <View style={styles.actionsRow}>
      {items.map((item) => (
        <View key={item.label} style={styles.actionItem}>
          <View style={styles.actionBubble}>
            <Text style={[styles.actionGlyph, item.tint ? { color: item.tint } : null]}>
              {item.glyph}
            </Text>
            {item.badge ? (
              <View style={styles.actionBadge}>
                <Text style={styles.actionBadgeText}>{item.badge}</Text>
              </View>
            ) : null}
          </View>
          <Text numberOfLines={2} style={styles.actionLabel}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

// ============================================================================
// Favorites
// ============================================================================

const FAVORITES = [
  { tag: 'Top up', tagGlyph: '💰', name: 'Star Investama' },
  { tag: 'Pay CC', tagGlyph: '💳', name: 'Visa Platinum' },
  { tag: 'Pay bill', tagGlyph: '⚡', name: 'PLN 277612...' },
];

function FavoritesSection() {
  return (
    <View style={styles.section}>
      <SectionHeader title="Favorites" linkLabel="View all" />
      <View style={styles.favoritesRow}>
        {FAVORITES.map((fav) => (
          <View key={fav.name} style={styles.favoriteCard}>
            <View style={styles.favoriteTagRow}>
              <Text style={styles.favoriteGlyph}>{fav.tagGlyph}</Text>
              <Text style={styles.favoriteTag}>{fav.tag}</Text>
            </View>
            <Text numberOfLines={1} style={styles.favoriteName}>
              {fav.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ============================================================================
// Promos
// ============================================================================

const PROMOS = [
  {
    title: '10% Cashback',
    subtitle: 'Restaurants, Bars, Free for Life',
    gradient: ['#3A2A2A', '#7A3A3A'] as const,
  },
  {
    title: 'Travel rewards',
    subtitle: 'Earn miles on every spend',
    gradient: ['#1B4965', '#5FA8D3'] as const,
  },
];

function PromosSection() {
  return (
    <View style={[styles.section, { backgroundColor: 'rgba(245,215,215,0.4)' }]}>
      <SectionHeader title="Special for you" linkLabel="View all promos" />
      <ScrollView
        contentContainerStyle={styles.promosScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {PROMOS.map((promo) => (
          <View
            key={promo.title}
            style={[styles.promoCard, { backgroundColor: promo.gradient[1] }]}
          >
            <View style={styles.promoOverlay}>
              <Svg height="100%" width="100%">
                <Defs>
                  <LinearGradient id={`pg-${promo.title}`} x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor={promo.gradient[0]} />
                    <Stop offset="1" stopColor={promo.gradient[1]} />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill={`url(#pg-${promo.title})`} />
              </Svg>
            </View>
            <View style={styles.promoCopy}>
              <Text style={styles.promoTitle}>{promo.title}</Text>
              <Text style={styles.promoSubtitle}>{promo.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ============================================================================
// Watchlist
// ============================================================================

const STOCKS = [
  { ticker: 'BUMI', name: 'PT Bumi Resources TBK', price: '12,345.67', change: '+4.50', color: '#4F8B3A' },
  { ticker: 'PTRO', name: 'Petrosea Tbk PT', price: '12,345.67', change: '+4.50', color: '#3C8772' },
  { ticker: 'ANTM', name: 'Aneka Tambang Tbk PT', price: '12,345.67', change: '+4.50', color: '#E7A93B' },
];

const WATCHLIST_OPTIONS = [
  { value: 'stocks', label: 'Stocks' },
  { value: 'forex', label: 'Forex' },
  { value: 'mutual-fund', label: 'Mutual Fund' },
  { value: 'bonds', label: 'Bonds' },
] as const;

function WatchlistSection() {
  const [tab, setTab] = useState<(typeof WATCHLIST_OPTIONS)[number]['value']>('stocks');

  return (
    <View style={[styles.section, { paddingBottom: 16 }]}>
      <SectionHeader title="Watchlist" linkLabel="Edit" />
      <TabsChip
        options={WATCHLIST_OPTIONS}
        value={tab}
        onValueChange={setTab}
        tone="dark"
        style={{ marginBottom: 12 }}
      />

      <View style={styles.watchlistCard}>
        {STOCKS.map((stock, idx) => (
          <View key={stock.ticker}>
            <View style={styles.stockRow}>
              <View style={[styles.stockLogo, { backgroundColor: stock.color }]}>
                <Text style={styles.stockLogoText}>{stock.ticker[0]}</Text>
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Text numberOfLines={1} style={styles.stockName}>
                  {stock.name}
                </Text>
                <Text style={styles.stockTicker}>{stock.ticker}</Text>
              </View>
              <Sparkline />
              <View style={{ alignItems: 'flex-end', gap: 3 }}>
                <Text style={styles.stockPrice}>{stock.price}</Text>
                <View style={styles.stockChangeBadge}>
                  <Text style={styles.stockChangeText}>{stock.change}</Text>
                </View>
              </View>
            </View>
            {idx < STOCKS.length - 1 ? <View style={styles.stockDivider} /> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

function Sparkline() {
  return (
    <Svg width={56} height={28} viewBox="0 0 56 28">
      <Polyline
        fill="none"
        points="0,22 8,18 16,20 24,12 32,14 40,8 48,10 56,4"
        stroke="#00B817"
        strokeWidth="2"
      />
    </Svg>
  );
}

// ============================================================================
// Section helpers
// ============================================================================

function SectionHeader({ title, linkLabel }: { title: string; linkLabel: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionLink}>{linkLabel}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

// ============================================================================
// Bottom navigation
// ============================================================================

function DashboardBottomNav() {
  return (
    <View style={styles.bottomNavWrap}>
      <BottomNav
        items={[
          { key: 'home', label: 'Home', icon: NavGlyph('⌂'), active: true },
          { key: 'wealth', label: 'Wealth', icon: NavGlyph('📈') },
          { key: 'credit', label: 'Credit', icon: NavGlyph('💳') },
          { key: 'profile', label: 'Profile', icon: NavGlyph('👤') },
        ]}
        qris={{
          icon: ({ color: c, size }) => (
            <Text style={{ color: c, fontSize: size * 0.55, fontWeight: '700' }}>QRIS</Text>
          ),
        }}
      />
    </View>
  );
}

function NavGlyph(glyph: string) {
  return ({ color: c, size }: { color: string; size: number }) => (
    <Text style={{ color: c, fontSize: size }}>{glyph}</Text>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  root: {
    backgroundColor: color.background.default,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 0,
  },

  // Hero — wrapper for red bg + absolute card. zIndex keeps the card above
  // the white sections below it so the dark navy footer "floats" over them.
  heroSection: {
    elevation: 2,
    position: 'relative',
    zIndex: 2,
  },
  heroBg: {
    overflow: 'visible',
    position: 'relative',
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  simobiLogo: {
    color: color.background.default,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  topBarActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },

  // Balance card — absolutely positioned, with its own solid red background
  // so the curve+ScrollView white behind the hero can't bleed through the
  // translucent top section.
  balanceCard: {
    backgroundColor: '#7A0E08',
    borderColor: 'rgba(255,255,255,0.22)',
    borderRadius: 16,
    borderWidth: 1,
    elevation: 3,
    left: 16,
    overflow: 'hidden',
    position: 'absolute',
    right: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    zIndex: 3,
  },
  balanceCardTop: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  balanceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  accountNumber: {
    color: color.background.default,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  defaultPill: {
    alignItems: 'center',
    backgroundColor: '#820D0D',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 6,
    paddingLeft: 12,
    paddingRight: 3,
    paddingVertical: 3,
  },
  defaultPillText: {
    color: color.background.default,
    fontSize: 11,
    fontWeight: '600',
  },
  defaultPillChevron: {
    alignItems: 'center',
    backgroundColor: color.background.default,
    borderRadius: 999,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },

  balanceLabel: {
    color: color.background.default,
    fontSize: 13,
    opacity: 0.85,
  },
  balanceValueRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  balanceValue: {
    color: color.background.default,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  // Dark footer flush at the bottom of the balance card
  viewDetails: {
    alignItems: 'center',
    backgroundColor: '#152433',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  viewDetailsText: {
    color: color.background.default,
    fontSize: 13,
    fontWeight: '600',
  },
  viewDetailsChevron: {
    color: color.background.default,
    fontSize: 20,
    fontWeight: '700',
    marginTop: -2,
  },

  // Quick actions. paddingTop is tight (0) so the gap from the balance
  // card's footer to the first action row is ~20pt. Bottom padding stays
  // normal.
  actionsWrap: {
    backgroundColor: color.background.default,
    gap: 16,
    paddingBottom: 16,
    paddingHorizontal: 8,
    paddingTop: 0,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  actionBubble: {
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 999,
    height: 56,
    justifyContent: 'center',
    position: 'relative',
    width: 56,
  },
  actionGlyph: {
    fontSize: 24,
  },
  actionBadge: {
    backgroundColor: '#C60000',
    borderRadius: 999,
    paddingHorizontal: 4,
    position: 'absolute',
    right: -4,
    top: -4,
  },
  actionBadgeText: {
    color: color.background.default,
    fontSize: 9,
    fontWeight: '700',
  },
  actionLabel: {
    color: color.text.default,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Generic
  divider: {
    backgroundColor: '#EFF2F7',
    height: 8,
  },
  section: {
    backgroundColor: color.background.default,
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: color.text.default,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  sectionLink: {
    color: '#1C77C3',
    fontSize: 12,
    fontWeight: '600',
  },

  // Favorites
  favoritesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  favoriteCard: {
    backgroundColor: color.background.default,
    borderColor: '#EEF0F6',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    gap: 6,
    padding: 8,
  },
  favoriteTagRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  favoriteGlyph: {
    fontSize: 12,
  },
  favoriteTag: {
    color: '#373D3F',
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.7,
  },
  favoriteName: {
    color: color.text.default,
    fontSize: 12,
    fontWeight: '600',
  },

  // Promos
  promosScroll: {
    gap: 12,
    paddingRight: 16,
  },
  promoCard: {
    borderRadius: 16,
    height: 149,
    overflow: 'hidden',
    width: 263,
  },
  promoOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  promoCopy: {
    alignSelf: 'flex-start',
    gap: 4,
    padding: 16,
  },
  promoTitle: {
    color: color.background.default,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  promoSubtitle: {
    color: color.background.default,
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.9,
  },

  // Watchlist
  watchlistCard: {
    backgroundColor: color.background.default,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    borderWidth: 1,
    padding: 4,
  },
  stockRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    padding: 12,
  },
  stockLogo: {
    alignItems: 'center',
    borderRadius: 999,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  stockLogoText: {
    color: color.background.default,
    fontSize: 16,
    fontWeight: '700',
  },
  stockName: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
  },
  stockTicker: {
    color: color.text.default,
    fontSize: 14,
    fontWeight: '700',
  },
  stockPrice: {
    color: color.text.default,
    fontSize: 12,
    fontWeight: '600',
  },
  stockChangeBadge: {
    backgroundColor: '#00B817',
    borderRadius: 2,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  stockChangeText: {
    color: color.background.default,
    fontSize: 11,
    fontWeight: '700',
  },
  stockDivider: {
    backgroundColor: '#EFEFEF',
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 12,
  },

  // Bottom nav
  bottomNavWrap: {
    backgroundColor: color.background.default,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
});
