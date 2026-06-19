# native-prototype

Local Expo (SDK 55) app that consumes `@brankas/native` so designers can
prototype real flows on iOS / Android using the actual mobile components.

The app lives inside the monorepo, links `@brankas/native` as a workspace dep,
and uses your local Xcode toolchain to build native binaries.

The simulator opens to a **grouped list of cases**. Drop a `.tsx` file in
`cases/` and it shows up in the list on the next reload — no registry to edit.
A case can be a single screen or a multi-step flow.

## One-time machine setup

1. **Install Xcode** from the App Store.

2. **Xcode command-line tools + license + simulator runtime**:

   ```bash
   xcode-select --install
   sudo xcodebuild -license accept
   xcodebuild -downloadPlatform iOS
   sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
   ```

   Open Xcode at least once so it finishes "installing additional components",
   then under `Xcode → Settings → Platforms`, confirm an iOS simulator runtime
   is installed.

3. **CocoaPods** (Expo uses it for native module installs):

   ```bash
   brew install cocoapods
   ```

4. **Grant automation permission to your terminal** (one-time, otherwise the
   Simulator won't auto-focus after build):

   ```bash
   osascript -e 'tell app "System Events" to count processes'
   ```

   macOS will prompt — approve. Or open
   `System Settings → Privacy & Security → Automation`, find your terminal
   (Terminal / iTerm / VS Code), and toggle **System Events** on.

## First-time project setup

From the **repo root**:

```bash
pnpm install
pnpm --filter @brankas/native build
```

The first command links the workspace packages; the second compiles
`@brankas/native` to `dist/` so Metro can consume it.

> **Note**: this project depends on `expo-dev-client` (already declared in
> `package.json`). Without it, `expo run:ios --port 8082` can't inject the
> Metro URL into the native build and the app boots with `unsanitizedScriptURLString = (null)`.
> If you ever see that error, the dev client is missing — see
> [Troubleshooting](#troubleshooting).

## Run on iOS

```bash
cd apps/native-prototype
pnpm ios
```

> The `ios` script runs `expo run:ios --port 8082`. We use **8082** instead of
> the React Native default 8081 because corporate-managed Macs have McAfee
> Agent (`macmnsvc`) listening on 8081 — see [Troubleshooting](#troubleshooting).

What happens, in order:

1. Expo prebuilds an `ios/` folder (Xcode workspace + Podfile).
2. CocoaPods installs native dependencies (~1–3 min the first time).
3. Xcode builds the app and boots the iOS Simulator.
4. The Metro bundler starts and the app loads JS from it.

When the demo screen appears in the simulator, you're set.

## Daily dev loop

Two terminals, both rooted in the repo.

**Terminal 1 — rebuild `@brankas/native` on every source edit:**

```bash
pnpm --filter @brankas/native dev
```

**Terminal 2 — Metro bundler:**

```bash
cd apps/native-prototype
pnpm start
```

> `pnpm start` runs `expo start --dev-client --port 8082`. The port matters
> because of the McAfee 8081 conflict on corporate Macs (see
> [Troubleshooting](#troubleshooting)).

**Then open the simulator and launch the app.** You have three ways:

- **Easiest** — in the Metro terminal, press `i`. Expo opens the Simulator
  (booting it if needed) and launches the prototype app.
- **Manual** — open the Simulator first, then launch the app:

  ```bash
  open -a Simulator
  ```

  Once the simulator is up, tap the **native-prototype** icon on its home
  screen.
- **Pick a specific device** — list booted simulators with
  `xcrun simctl list devices booted`, or pick any device:

  ```bash
  xcrun simctl boot "iPhone 17 Pro"      # name from `xcrun simctl list devices`
  open -a Simulator
  ```

  Then press `i` in the Metro terminal (or tap the app icon).

After that, edits to either `apps/native-prototype/App.tsx` or anything under
`packages/native/src/` show up on the simulator within a second or two via
fast refresh.

If a change doesn't appear, shake the simulator (`Device → Shake` or
`Ctrl + Cmd + Z`) and tap **Reload**. To switch to a different simulator
without closing Metro, press `shift + i` in the Metro terminal — Expo lists
all available devices.

## Authoring cases

Drop a file like `cases/my-screen.tsx`. Two requirements:

```tsx
// cases/transfer-success.tsx
import { View, Text } from 'react-native';
import { Button } from '@brankas/native';
import type { CaseMeta } from './_types';

export const meta: CaseMeta = {
  name: 'Transfer success',
  category: 'Transfer',
  type: 'screen',                                  // 'screen' or 'flow'
  description: 'Confirmation after a successful transfer.',
};

export default function TransferSuccess() {
  return (
    <View style={{ padding: 16 }}>
      <Text>Sent Rp 250.000</Text>
      <Button onPress={() => undefined}>Done</Button>
    </View>
  );
}
```

That's the whole API. Save the file, the simulator hot-reloads, and the case
appears in its `category` section on the landing page.

**Single screen** — return one View. Done.

**Multi-step flow** — manage steps with `useState` inside the case component:

```tsx
export default function OpenAccountFlow() {
  const [step, setStep] = useState<'intro' | 'form' | 'done'>('intro');
  if (step === 'intro') return <Intro onNext={() => setStep('form')} />;
  if (step === 'form') return <Form onNext={() => setStep('done')} />;
  return <Done onRestart={() => setStep('intro')} />;
}
```

See `cases/open-account-flow.tsx` for a working example.

**Conventions**:
- Filename becomes the case id (URL-safe slug recommended).
- Files starting with `_` are ignored (used for shared helpers).
- Each case is wrapped in a header with a back button — don't render your own
  top app bar.
- Use tokens from `@brankas/native` (`color`, `typography`, `spacing`) so your
  case stays on-system.

## Run on Android

You need Android Studio installed with an emulator image set up. Then from
`apps/native-prototype`:

```bash
pnpm android
```

## Troubleshooting

### `pod install` fails with "Failed to validate worklets version"

`react-native-reanimated`'s compatibility table doesn't match the installed
`react-native-worklets` version. Bump or pin reanimated to a version whose
`compatibility.json` lists the installed worklets minor. Check
`node_modules/react-native-reanimated/compatibility.json` for the current
matrix.

### `osascript ... System Events ... exited with non-zero code: 1`

Build succeeded; macOS just won't let your terminal control the Simulator.
Either run `open -a Simulator` before retrying, or grant automation
permission (see step 4 in *One-time machine setup*).

### Simulator shows "No script URL provided"

Two distinct shapes of this error:

**a) `unsanitizedScriptURLString = (null)`** — the native build has no
Metro URL baked in *at all*. Root cause: `expo-dev-client` is missing.
A non-dev-client build relies on `RCT_METRO_PORT` set at native build time;
without the dev-client, Expo can't inject the URL. Fix:

```bash
cd apps/native-prototype
pnpm dlx expo install expo-dev-client
xcrun simctl uninstall booted com.anonymous.native-prototype
rm -rf ios
pnpm ios
```

After this, first launch will show the **Expo dev-client launcher**, which
auto-discovers Metro and connects.

**b) URL is set but app can't reach Metro** — Metro isn't running, or the
port doesn't match the baked-in port. Start Metro:

```bash
pnpm start
```

Leave it running, then shake-reload the simulator. If Metro is up but the
app still can't reach it, open the dev menu → **Settings → Debug server
host & port**, set `localhost:8082`, reload.

### `expo run:ios` says "port 8081 is used by another process"

On corporate-managed Macs, **McAfee Agent** (`macmnsvc`, the endpoint
management daemon) listens on port 8081 — the same port React Native's Metro
uses by default. You can't kill `macmnsvc`; it's protected and restarts on
its own.

That's why every script in this project uses `--port 8082` (see
`package.json`). If you ever invoke `expo run:ios` / `expo start` directly,
add `--port 8082` yourself. Verify with:

```bash
lsof -iTCP -sTCP:LISTEN -nP | grep :8081
```

If you see `macmnsvc` in the output, that's the culprit.

### Editing `packages/native/src/...` doesn't update the app

You're not running the watch build. Start it in another terminal:

```bash
pnpm --filter @brankas/native dev
```

### After bumping a peer dep (reanimated, svg, gesture-handler, …)

Regenerate native code:

```bash
cd apps/native-prototype
rm -rf ios android
pnpm ios
```

## File map

| Path | Purpose |
| --- | --- |
| `App.tsx` | Root: landing-page ↔ case shell state machine |
| `cases/` | One file per prototype case (auto-discovered by Metro) |
| `cases/_types.ts` | Shared `CaseMeta` type — imported by every case |
| `cases/index.ts` | Discovers case files via `require.context`, sorts, exports list |
| `components/CaseList.tsx` | Grouped list landing page |
| `components/CaseShell.tsx` | Header + back button wrapping the active case |
| `metro.config.js` | Monorepo Metro setup + `unstable_allowRequireContext` |
| `babel.config.js` | Babel preset + `react-native-worklets/plugin` (required by reanimated 4) |
| `app.json` | Expo app config (bundle id, splash, icons) |
| `ios/` | Auto-generated by `expo prebuild`; safe to delete and regenerate |
