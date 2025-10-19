## Quick context

This is an Expo (React Native) app using the Expo Router (file-based routing). It includes Firebase (auth + Firestore) initialized for React Native, custom theme hooks, and several small UI components under `components/` and `components/ui/`.

Work items an AI agent will commonly do here:
- Add or modify screens under `app/` (file-based routes).
- Update shared UI components in `components/`.
- Adjust theme/colors in `constants/theme.ts` and hooks in `hooks/`.
- Change Firebase usage in `firebaseConfig.ts` or use exported `auth`, `firestore`.

## Architecture notes (big-picture)

- Router: Uses `expo-router` with file-based routes in `app/`. Root layout is `app/_layout.tsx`; tab layout is `app/(tabs)/_layout.tsx`.
- Theme: Theme values and fonts are centralized under `constants/theme.ts`, with helpers `hooks/use-color-scheme.ts` and `hooks/use-theme-color.ts`. UI components consume these via `ThemedText` / `ThemedView`.
- Firebase: `firebaseConfig.ts` initializes Firebase app, Firestore (with persistent local cache + multi-tab manager) and Auth using React Native AsyncStorage. The module imports side-effects in `app/_layout.tsx` (see top: `import '../firebaseConfig';`).

## Important files to inspect before changing behavior

- `app/_layout.tsx` — loads fonts, controls splash screen, and imports `firebaseConfig` to ensure Firebase is initialized once.
- `firebaseConfig.ts` — Firebase initialization and exports: `app`, `auth`, `firestore`. Be careful: it uses a runtime require for `firebase/auth/react-native` and `@react-native-async-storage/async-storage`.
- `app/(tabs)/_layout.tsx` and `app/(tabs)/index.tsx` — tab navigator and example Home screen.
- `components/themed-*` and `hooks/use-theme-color.ts` — shared theming patterns.
- `components/ui/*` — small building blocks (icons, collapsible, parallax) used across screens.

## Project-specific conventions and patterns

- File-based routing: new screens are added as files under `app/`. To add a new tab, add a file and register it in `app/(tabs)/_layout.tsx` using `<Tabs.Screen name="<fileWithoutExt>" />`.
- Theme hooks: use `useColorScheme()` (project hook) and `useThemeColor()` to pick colors. Prefer `ThemedText` and `ThemedView` for consistent styling.
- Firebase side-effect import: `app/_layout.tsx` imports `../firebaseConfig` to run initialization. Avoid re-initializing Firebase elsewhere — import `auth`/`firestore` from `firebaseConfig.ts` when needed.
- TypeScript and runtime requires: `firebaseConfig.ts` uses `// @ts-ignore` plus `require(...)` for the React Native auth persistence package. Preserve this pattern when editing to avoid type errors; use the same runtime import if you need to change persistence behavior.

## Build / run / debug commands (from package.json)

- Install dependencies: `npm install`
- Start Metro / Expo: `npm start` or `npx expo start` (script `start`).
- Android + iOS + web helper scripts: `npm run android`, `npm run ios`, `npm run web`.
- Reset starter app: `npm run reset-project` (moves current `app` to `app-example`).

## Testing & linting

- Lint: `npm run lint` (uses `expo lint`). There are no test scripts by default.

## Examples of common edits and where to implement them

- Add a new modal route: create `app/modal.tsx` (already present in repo) and reference presentation in `app/_layout.tsx` if you want modal options.
- Use Firestore: import `{ firestore }` from `firebaseConfig.ts` and use the standard Firebase Web SDK APIs. Firestore here is initialized with `persistentLocalCache` and a multi-tab manager — expect cache behavior on mobile/web.
- Add a new tab: create `app/(tabs)/new.tsx` and add a `<Tabs.Screen name="new" />` entry in `app/(tabs)/_layout.tsx` to configure title/icon.

## Safety and gotchas for AI agents

- Do not copy Firebase credentials to public forks. The repo currently contains a firebaseConfig object — treat it as local development data.
- Avoid re-initializing Firebase. Always import from `firebaseConfig.ts` rather than calling `initializeApp` again.
- When changing native persistence or auth code paths, preserve the runtime `require(...)` usage and `// @ts-ignore` comment to avoid runtime/compile issues on some setups.

## Where to look for examples in the repo

- Themed components: `components/themed-text.tsx`, `components/themed-view.tsx`.
- Router/layout examples: `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`.
- Firebase initialization: `firebaseConfig.ts`.

If anything in this file is unclear or you'd like more detail (for example: common API call shapes, preferred test harness, or CI commands), tell me which area to expand and I'll iterate.
