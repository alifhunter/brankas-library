export type ComponentDoc = {
  slug: string;
  name: string;
  status: 'Draft' | 'Ready';
  platform: 'Desktop' | 'Mobile';
  description: string;
  importName: string;
  packageName?: string;
  anatomy: string[];
  usage: string[];
  accessibility: string[];
};

export type PatternDoc = {
  slug: string;
  name: string;
  description: string;
  importName: string;
  usage: string[];
  avoid: string[];
};

export type TokenDoc = {
  category: string;
  description: string;
  references: Array<{
    name: string;
    css: string;
    ts: string;
    preview?: string;
  }>;
};

export const componentDocs: ComponentDoc[] = [
  {
    slug: 'accordion',
    name: 'Accordion',
    status: 'Ready',
    platform: 'Desktop',
    description:
      'Progressively disclose supporting content without leaving the page.',
    importName: 'Accordion',
    anatomy: [
      'Header with leading icon, title, optional action button, and chevron',
      'Disclosure panel that mounts when expanded',
      'Hover and focus states on the header',
    ],
    usage: [
      'Use for optional details or long supporting content that not every user needs.',
      'Keep titles short and specific to what is hidden.',
      'Allow more than one section open at a time when sections are independent.',
    ],
    accessibility: [
      'Header is a button with `aria-expanded` and controls the panel via `aria-controls`.',
      'Chevron rotation is presentational; state is announced via `aria-expanded`.',
      'Header is keyboard focusable with visible focus ring.',
    ],
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    status: 'Ready',
    platform: 'Desktop',
    description:
      'Represent people, accounts, or entities in compact identity surfaces.',
    importName: 'Avatar',
    anatomy: [
      'Circular frame in three sizes (small / medium / large)',
      'Image fallback chain: image → initials → fallback icon',
    ],
    usage: [
      'Pair with a visible name when identity must be unambiguous.',
      'Use consistent sizes within a single list.',
      'Use initials only when an image is unavailable.',
    ],
    accessibility: [
      'Image avatars need a meaningful `alt`; decorative avatars set `alt=""`.',
      'Do not rely on avatar color alone to identify a person.',
      'Provide adjacent text labels when identity matters.',
    ],
  },
  {
    slug: 'badge',
    name: 'Badge',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Counts, short labels, or lightweight emphasis on a parent element.',
    importName: 'Badge',
    anatomy: [
      'Pill container with `number`, `dot`, or `new` style',
      'Color variants: gray, primary, blue, red',
    ],
    usage: [
      'Keep badge text very short (1–2 chars for counts, ≤6 for words).',
      'Use Label / Status for richer state descriptions.',
      'Place badges relative to the element they describe, not floating elsewhere.',
    ],
    accessibility: [
      'Badge text must remain readable at small sizes.',
      'Do not encode meaning by color alone — include text or `aria-label`.',
    ],
  },
  {
    slug: 'banner',
    name: 'Banner',
    status: 'Ready',
    platform: 'Desktop',
    description:
      'Page, section, or message-level feedback that needs more space than a toast.',
    importName: 'Banner',
    anatomy: [
      'Three variants: section, page, message',
      'Intent: informational, warning, error, orange, red, blue',
      'Icon, title, message, optional action link, optional close button',
    ],
    usage: [
      'Place near the content it affects.',
      'Use one clear action when an action is required.',
      'Prefer toast for short transient feedback after an action.',
    ],
    accessibility: [
      'Intent must be clear from text as well as color.',
      'Dismiss controls need accessible labels.',
      'Error banners use `role="alert"`; informational banners use `role="status"`.',
    ],
  },
  {
    slug: 'breadcrumbs',
    name: 'Breadcrumbs',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Show hierarchy and let users navigate to parent pages.',
    importName: 'Breadcrumbs',
    anatomy: [
      'Navigation landmark wrapping breadcrumb list',
      'Items with separator icon between',
      'Current page marked as non-link',
      'Automatic collapse after `collapseAfter` items',
    ],
    usage: [
      'Use for nested pages where the parent path matters.',
      'Keep labels concise and recognizable.',
      'Truncate via `collapseAfter` when paths get long.',
    ],
    accessibility: [
      'Exposed as `nav` with an accessible name.',
      'Current page marked with `aria-current="page"`.',
      'Separator icons hidden from assistive technology.',
    ],
  },
  {
    slug: 'button',
    name: 'Button',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Explicit actions that submit, continue, confirm, or change UI state.',
    importName: 'Button',
    anatomy: [
      'Variants: primary, secondary, tertiary, blue-primary/secondary/tertiary, danger-primary/secondary/tertiary',
      'Sizes: small, medium, large, extra-large',
      'Slots: leadingIcon, trailingIcon, label, optional loading spinner',
    ],
    usage: [
      'Use one primary action per surface.',
      'Use secondary or tertiary for lower-emphasis actions.',
      'Use the loading state for inflight requests; do not block the entire UI.',
    ],
    accessibility: [
      'Button text describes the action; icon-only buttons need `aria-label`.',
      'Loading state exposes `aria-busy`.',
      'Disabled buttons are not focusable and do not receive click events.',
    ],
  },
  {
    slug: 'carousel',
    name: 'Carousel indicator',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Position indicator for a short, bounded set of slides.',
    importName: 'Carousel',
    anatomy: ['Indicator group', 'Indicator dots', 'Active state'],
    usage: [
      'Use for short slide sets (≤ ~5).',
      'Keep position visible while slides change.',
      'Pair with prev/next buttons or swipe gestures for slide navigation.',
    ],
    accessibility: [
      'Expose the active slide position.',
      'Do not rely on auto-advancing content for critical information.',
      'Provide pause/manual controls.',
    ],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Independent binary choices or multi-select groups.',
    importName: 'Checkbox',
    anatomy: [
      'Native `<input type="checkbox">` with custom control',
      'Label, optional description, optional helperText',
      'Indeterminate state (set imperatively via `indeterminate` prop)',
      'Error state with optional errorMessage',
    ],
    usage: [
      'Use for choices that can be toggled independently.',
      'Prefer radio buttons for mutually exclusive options.',
      'Use indeterminate for "some children selected" in select-all rows.',
    ],
    accessibility: [
      'Every checkbox needs a visible or `aria-label` label.',
      'Indeterminate state exposed via `aria-checked="mixed"`.',
      'Error rows linked via `aria-describedby`; `aria-invalid` set on the input.',
    ],
  },
  {
    slug: 'chips',
    name: 'Chip',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Pill-shaped toggle for filters, removable criteria, or category selection.',
    importName: 'Chip',
    anatomy: [
      'Pill container with selected/unselected visual',
      'Optional `leadingIcon`, `trailingIcon`, `badge`',
      'Pressed button with `aria-pressed` reflecting `selected`',
    ],
    usage: [
      'Use for short labels (1–3 words).',
      'Combine multiple chips into a filter group for multi-select.',
      'Use trailing X icon for removable applied filters.',
    ],
    accessibility: [
      'Selected state announced via `aria-pressed`.',
      'Icon-only removal affordances need an accessible name.',
      'Trailing-icon click stops propagation so it does not toggle the chip.',
    ],
  },
  {
    slug: 'coachmark',
    name: 'Coachmark',
    status: 'Ready',
    platform: 'Desktop',
    description:
      'Floating popover that introduces a feature, used during onboarding or product tours.',
    importName: 'Coachmark',
    anatomy: [
      'White panel with arrow pointer (8 placements)',
      'Title, body, optional close button',
      'Optional carousel dots and Button 1 / Button 2 footer',
    ],
    usage: [
      'Anchor guidance near the related UI control.',
      'Keep each step short and actionable.',
      'Chain coachmarks via the carousel dots to walk through a multi-step tour.',
    ],
    accessibility: [
      'Role is `dialog` with `aria-label` derived from the title.',
      'Provide a clear, labeled dismiss control.',
      'Focus the first interactive element when the coachmark opens.',
    ],
  },
  {
    slug: 'date-picker',
    name: 'Date picker',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Calendar for selecting a date, month, or year — controlled or uncontrolled.',
    importName: 'DatePicker',
    anatomy: [
      'Month/year pill controls + prev/next arrows',
      'Three views: date grid (6×7), month grid (3×4), year grid (3×6 paged)',
      'Optional info row and Reset / Cancel / Confirm actions',
      'Configurable week start (Sunday / Monday)',
    ],
    usage: [
      'Use when typed entry is error-prone (booking, scheduling).',
      'Constrain available dates via `min` / `max` props.',
      'Open in month or year view for far-past dates (birthdays).',
    ],
    accessibility: [
      'Day cells are `gridcell` with `aria-selected`.',
      'Today is marked with `aria-current="date"`.',
      'Out-of-range dates are disabled and skipped by keyboard nav.',
    ],
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Focused decisions, confirmations, and short data-entry flows.',
    importName: 'Dialog',
    anatomy: [
      'Backdrop, modal panel, header (title + subtitle + close), body, footer actions',
      'Three sizes: small (432px), medium (720px), large (1152px)',
      'Four types: informational, confirmation, destructive, data-entry',
    ],
    usage: [
      'Use for blocking decisions that must be acknowledged.',
      'Keep destructive actions explicit and visually separated.',
      'Use data-entry only for short flows; prefer a dedicated page for long forms.',
    ],
    accessibility: [
      '`role="dialog"`, `aria-modal="true"`, labelled by the title.',
      'Focus moves into the dialog on open; trapped while open.',
      'Escape closes (unless `closeOnEsc={false}`); overlay click closes (configurable).',
    ],
  },
  {
    slug: 'dropdown',
    name: 'Dropdown',
    status: 'Ready',
    platform: 'Desktop',
    description:
      'Floating menu of actions triggered by a button. Choosing an item performs the action and closes.',
    importName: 'DropdownPanel',
    anatomy: [
      'Panel surface with overflow scroll',
      'Menu items (`DropdownItem`) with optional leading/trailing icons',
      'Item variants: default, danger; disabled items render muted and skip activation',
    ],
    usage: [
      'Use for contextual actions (Edit, Duplicate, Delete).',
      'Use Select for value selection that persists.',
      'Keep destructive items at the bottom and visually distinct.',
    ],
    accessibility: [
      'Panel is `role="menu"`; items are `role="menuitem"`.',
      'Enter or Space activates an item.',
      'Disabled items expose `aria-disabled`.',
    ],
  },
  {
    slug: 'file-upload',
    name: 'File upload',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Button trigger or drag-and-drop dropzone for selecting and reviewing files.',
    importName: 'FileUpload',
    anatomy: [
      'Two variants: `button` (compact trigger) and `dropzone` (drag-and-drop area)',
      'File card row showing name, meta, progress bar, optional remove button',
      'Status states: uploading, done, error',
      'Optional secondary action like "Take Photo" (webcam)',
    ],
    usage: [
      'State accepted formats and limits in the description.',
      'Show upload progress and errors close to the file card.',
      'Pass a real `accept`/`multiple` so the browser picker filters correctly.',
    ],
    accessibility: [
      'Hidden `<input type="file">` triggered by the visible button.',
      'Drag-and-drop must have a non-drag alternative (the button).',
      'Remove button has `aria-label="Remove <filename>"`.',
    ],
  },
  {
    slug: 'label',
    name: 'Label / Status',
    status: 'Ready',
    platform: 'Desktop',
    description:
      'Pill-shaped label for status, sentiment, or classification. Optionally clickable as a tag.',
    importName: 'Label',
    anatomy: [
      'Five variants: neutral, information, positive, warning, negative',
      'Optional leading icon (variant default or custom)',
      'Pill container with background tinted to variant',
    ],
    usage: [
      'Use for short state values (Active, Pending, Failed).',
      'Pair with supporting copy for complex states.',
      'Use `onClick` for interactive tag behaviour (adds button semantics + hover).',
    ],
    accessibility: [
      'Status meaning must be available in text, not just color.',
      'Interactive labels get `role="button"` and keyboard support automatically.',
      'Decorative icons are aria-hidden so screen readers read only the text.',
    ],
  },
  {
    slug: 'loader',
    name: 'Loader',
    status: 'Ready',
    platform: 'Desktop',
    description:
      'Indeterminate spinner for short waits when total progress is unknown.',
    importName: 'Loader',
    anatomy: [
      'Animated SVG arc spinning at 900ms linear infinite',
      'Configurable size, stroke thickness, and color',
      'Inverse variant for dark backgrounds',
    ],
    usage: [
      'Use near the content being loaded.',
      'Prefer Skeleton when you can preserve the final layout.',
      'For long determinate work, prefer ProgressBar with a value.',
    ],
    accessibility: [
      '`role="status"` with an `aria-label` ("Loading" by default).',
      '`prefers-reduced-motion` slows the spin from 900ms to 4s.',
      'Off-screen text node ensures screen readers announce the loading state.',
    ],
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Move through long, ordered sets of results with optional rows-per-page selector.',
    importName: 'Pagination',
    anatomy: [
      'Prev / next chevron buttons',
      'Page number buttons with auto-ellipsis around current page',
      'Optional rows-per-page selector on the right',
    ],
    usage: [
      'Use when results are ordered and the count is large.',
      'Configure `siblingCount` and `boundaryCount` to taste.',
      'Show current page clearly; do not hide it on mobile.',
    ],
    accessibility: [
      'Container is `nav aria-label="Pagination"`.',
      'Current page exposes `aria-current="page"`.',
      'Disabled prev/next at edges; rows-per-page uses native `<select>` for keyboard support.',
    ],
  },
  {
    slug: 'progress',
    name: 'Progress bar',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Horizontal bar showing 0–100% completion of a determinate task.',
    importName: 'ProgressBar',
    anatomy: [
      'Track with rounded ends',
      'Gradient fill (blue spectrum) sized to value',
      'Two sizes (small 4px, large 12px) and two variants (default, inverse for dark surfaces)',
    ],
    usage: [
      'Use for measurable completion (uploads, imports, jobs).',
      'Use Loader for indeterminate spinners.',
      'Use ProgressIndicator for multi-step flows.',
    ],
    accessibility: [
      '`role="progressbar"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`.',
      'Values clamped 0–100; consumers can pass any `aria-label` for context.',
    ],
  },
  {
    slug: 'progress-indicator',
    name: 'Progress indicator',
    status: 'Ready',
    platform: 'Desktop',
    description:
      'Horizontal step sequence showing where the user is in a multi-step flow.',
    importName: 'ProgressIndicator',
    anatomy: [
      'Ordered list of steps with circular markers (number or check)',
      'Three states per step: completed (check), current (number + underline), upcoming (gray)',
      'Optional `onStepClick` lets users jump back to completed steps',
    ],
    usage: [
      'Use for sequential, page-by-page flows (onboarding, KYC, checkout).',
      'Drive `currentStep` from your routing/state — the component is presentational.',
      'Do not let users jump forward to upcoming steps; pass `onStepClick` for back navigation only.',
    ],
    accessibility: [
      'Wrapped in `nav aria-label="Progress"`.',
      'Current step uses `aria-current="step"`.',
      'Upcoming steps render as `<span>`, not buttons, so they are not focusable.',
    ],
  },
  {
    slug: 'radio',
    name: 'Radio button',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Mutually exclusive choices in a visible option set.',
    importName: 'Radio',
    anatomy: [
      'Native `<input type="radio">` with custom control',
      'Label, optional description, optional helperText',
      'Two sizes (default, small)',
    ],
    usage: [
      'Use when users can choose exactly one option.',
      'Show all key options together; prefer Select when the list is long.',
      'Group via the standard `name` prop.',
    ],
    accessibility: [
      'Each radio needs a visible or `aria-label` label.',
      'Group related radios with `name` and consider a `fieldset` + `legend`.',
      'Arrow keys move between radios in the same group (browser default).',
    ],
  },
  {
    slug: 'search',
    name: 'Search',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Search input with optional dropdown trigger, action button, and result panel.',
    importName: 'Search',
    anatomy: [
      'Real `<input type="search">` with focus/hover visual states',
      'Optional left dropdown segment ("Search by: All ▼")',
      'Optional right "Cari" button and clear (X) affordance',
      'Companion `SearchResultPanel` with default / loading / result / empty states',
    ],
    usage: [
      'Use placeholder text to clarify scope.',
      'Show the result panel near the field when results are contextual.',
      'Combine Search + ResultPanel for live "type-to-find" experiences.',
    ],
    accessibility: [
      'Native `searchbox` role from `type="search"`.',
      'Result panel exposes items as `role="option"`.',
      'Clear button has `aria-label="Clear search"`.',
    ],
  },
  {
    slug: 'sidebar',
    name: 'Sidebar',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Primary vertical navigation for desktop product shells.',
    importName: 'Sidebar',
    anatomy: [
      'Brand header (logo slot) above a scrollable menu group',
      'Menu items render as links (`href`) or buttons, each with an optional 24×24 icon',
      'Nested groups via `children` — parent → child → grandchild — with indentation, a branch glyph, and an expand/collapse chevron',
      'Active item — and its ancestor groups — are highlighted: 2px brand left-border (parent) or bold brand label (nested)',
      'Optional bottom "Minimize" control collapses the sidebar to an icon rail',
    ],
    usage: [
      'Use for top-level destinations, not for in-page filters or settings groups.',
      'Group related destinations under a parent; keep nesting to three levels at most.',
      'Keep labels short; pair every item with an icon so the collapsed rail stays scannable.',
      'Reserve the active state for the current section only.',
    ],
    accessibility: [
      'Wraps items in a `<nav>` landmark; the active item carries `aria-current="page"`.',
      'Groups expose `aria-expanded` / `aria-controls`; ancestors of the active item auto-expand.',
      'Arrow Up/Down move focus; Arrow Right/Left expand/collapse a group; disabled items are skipped.',
      'The collapse control exposes `aria-expanded` and a clear Collapse/Expand label.',
    ],
  },
  {
    slug: 'select',
    name: 'Select',
    status: 'Ready',
    platform: 'Desktop',
    description:
      'Choose one or more values from a known option set — trigger reflects current selection.',
    importName: 'SelectButton',
    anatomy: [
      'Trigger (`SelectButton`) with optional label, value, badge, leading/trailing icons, helper text',
      'Panel (`SelectPanel`) with optional searchable input, scrollable list, optional Terapkan apply button',
      'Items (`SelectItem`) with selected/disabled visual + leading/trailing icon slots',
      'Empty state with illustration when no items match',
    ],
    usage: [
      'Use Select for persisted selection (filter, form value).',
      'Use Dropdown for one-shot actions, not value selection.',
      'Add `searchable` when the option list is long.',
    ],
    accessibility: [
      'Trigger uses `aria-haspopup="listbox"` and `aria-expanded`.',
      'Panel is `role="dialog"` containing `role="listbox"` with `role="option"` items.',
      'Selected items announce via `aria-selected="true"`.',
    ],
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Layout-preserving placeholder shown while content is loading.',
    importName: 'Skeleton',
    anatomy: [
      'Two shapes: rectangle and circle',
      'Configurable width, height, radius',
      'Subtle gradient shimmer animation (1.4s ease-in-out)',
    ],
    usage: [
      'Match the shape of the content being loaded.',
      'Use Loader for short waits where the layout cannot be predicted.',
      'Compose skeletons to mock cards, table rows, list items.',
    ],
    accessibility: [
      'Skeletons are decorative — set `aria-hidden="true"`.',
      'Pair with an `aria-live` region for the loading announcement.',
      '`prefers-reduced-motion` disables the shimmer.',
    ],
  },
  {
    slug: 'table',
    name: 'Table',
    status: 'Ready',
    platform: 'Desktop',
    description:
      'Compositional table primitives that render as semantic `<table>` markup.',
    importName: 'Table',
    anatomy: [
      'Six primitives: Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell',
      'Three sizes (small / medium / large) cascade via context',
      'Optional sortable header (chevron + aria-sort) and selected row visual',
      'Optional sticky header inside a scroll container; zebra striping prop',
    ],
    usage: [
      'Compose primitives like HTML — Table > TableHead > TableRow > TableHeaderCell.',
      'Drive sortable headers from your state via `onSort` + `sortDirection`.',
      'Use `selected` rows with the Checkbox column pattern for bulk actions.',
    ],
    accessibility: [
      'Renders semantic `<table>` so screen readers announce row/column relationships.',
      'Sortable headers expose `aria-sort` (`ascending`/`descending`/`none`).',
      'Selected rows use `aria-selected="true"`.',
    ],
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Switch between related sections at the same hierarchy level.',
    importName: 'Tabs',
    anatomy: [
      'Three layouts: horizontal (underline), vertical (left-border), chips (pill)',
      'Optional badge per tab (renders via Badge component)',
      'Disabled tabs are dimmed and skipped in keyboard nav',
      'All panels stay mounted (inactive ones get the `hidden` attribute)',
    ],
    usage: [
      'Keep labels parallel and concise.',
      'Use tabs for related, peer-level content — not for sequential workflows (use ProgressIndicator).',
      'Use chips for filter-style tab strips.',
    ],
    accessibility: [
      'Tablist is `role="tablist"`; tabs are `role="tab"` with `aria-selected`.',
      'Roving tabindex; arrow keys + Home/End navigate per WAI-ARIA tabs spec.',
      'Panels have `aria-labelledby` pointing to their tab id.',
    ],
  },
  {
    slug: 'text-area',
    name: 'Text area',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Multi-line free-form input with helper text, counter, and validation.',
    importName: 'TextArea',
    anatomy: [
      'Label, optional helper text (above or below), required asterisk',
      'Textarea with vertical resize handle',
      'Character counter (manual `counterText`)',
      'Error row with icon + message replacing the helper row',
    ],
    usage: [
      'Use when input can span multiple lines.',
      'Show character constraints with `counterText` (e.g. `${value.length}/250`).',
      'Switch `helperPosition` to `above` when the helper is instructional, `below` for hints.',
    ],
    accessibility: [
      'Every textarea is associated with a label via `htmlFor`.',
      'Error state sets `aria-invalid="true"` and links the message via `aria-describedby`.',
      'Counter and helper text are also linked via `aria-describedby`.',
    ],
  },
  {
    slug: 'text-field',
    name: 'Text field',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Single-line free-form input for short text, IDs, emails, and similar entries.',
    importName: 'TextField',
    anatomy: [
      'Label, optional helper text (above or below)',
      'Input with optional leading/trailing icon slots',
      'Counter and validation states (error / focused / filled)',
    ],
    usage: [
      'Use helper text for constraints (format, length, examples).',
      'Use TextArea for multi-line content.',
      'Prefer Search for typed lookup against a result list.',
    ],
    accessibility: [
      'Label is always associated via `htmlFor`.',
      'Errors are text-based and programmatic, not color-only.',
      'Trailing icons that act as buttons need an accessible name.',
    ],
  },
  {
    slug: 'toast',
    name: 'Toast',
    status: 'Ready',
    platform: 'Desktop',
    description:
      'Temporary, non-blocking feedback. Includes both the visual primitive and a `<Toaster>` manager with auto-dismiss.',
    importName: 'Toast',
    anatomy: [
      'Visual primitive with 5 types: general, success, warning, information, error',
      'Optional inline action button (e.g. Undo) and X close button',
      '`<Toaster position="..." />` provider + imperative `toast.success()` API',
      'Auto-dismiss with hover-pause; 6 placements',
    ],
    usage: [
      'Drop one `<Toaster />` at the app root, then call `toast.success(...)` from anywhere.',
      'Pair destructive actions with an Undo toast.',
      'Do not put critical information only in a toast — pair with a banner or dialog.',
    ],
    accessibility: [
      'Error toasts use `role="alert"`; others use `role="status"`.',
      'Auto-dismiss timers pause on hover so screen-reader/slow-reader users have time.',
      'Toaster container is `aria-live="polite"`.',
    ],
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Immediate on/off setting that takes effect without form submission.',
    importName: 'Toggle',
    anatomy: ['Track, thumb, label, optional description and helper text'],
    usage: [
      'Use for instant setting changes.',
      'Use Checkbox when changes are submitted as part of a form.',
      'Pair with a description when the on/off implication is non-obvious.',
    ],
    accessibility: [
      'Renders a native `<input type="checkbox">` with `role="switch"`.',
      'Every toggle needs a clear label.',
      'On/off state exposed via `aria-checked`.',
    ],
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    status: 'Ready',
    platform: 'Desktop',
    description: 'Short supplemental information shown on hover or focus.',
    importName: 'Tooltip',
    anatomy: [
      'Wraps a single trigger element via `cloneElement`',
      'Black bubble with arrow pointer on 4 placements (top, bottom, left, right)',
      'Smart auto-flip to opposite side when near viewport edges',
      'Configurable open / close delays and controlled / uncontrolled open state',
    ],
    usage: [
      'Use for brief clarification only.',
      'Do not put critical instructions or interactive controls inside tooltips.',
      'For longer content or interaction, use a Popover or inline helper text.',
    ],
    accessibility: [
      '`role="tooltip"` with `aria-describedby` on the trigger while open.',
      'Triggers on hover and focus (Escape dismisses).',
      'Skipped for disabled triggers and under `prefers-reduced-motion`.',
    ],
  },
  {
    slug: 'mobile-accordion',
    name: 'Accordion',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Disclosure card that reveals supporting content on tap.',
    importName: 'Accordion',
    packageName: '@brankas/native',
    anatomy: [
      'Card surface with leading icon, title, optional action button, chevron',
      'Disclosure panel that mounts when expanded',
      'Mobile-tuned padding, radius, and shadow',
    ],
    usage: [
      'Use for optional details inside a scrolling page.',
      'Keep titles short — long titles wrap and crowd the chevron.',
      'Place independent accordions in a list when sections do not relate.',
    ],
    accessibility: [
      'Header is a Pressable with `accessibilityRole="button"` and `accessibilityState.expanded`.',
      'Chevron rotation is presentational; state is announced via accessibility props.',
      'Tap target spans the full header row.',
    ],
  },
  {
    slug: 'mobile-account-item',
    name: 'Account item',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Row showing a payment source, account number, and balance.',
    importName: 'AccountItem',
    packageName: '@brankas/native',
    anatomy: [
      'Leading thumbnail (logo or color tile)',
      'Title, masked account number, optional balance',
      'Optional trailing chevron, badge, or custom slot',
    ],
    usage: [
      'Use inside picker sheets and account lists.',
      'Mask account numbers to the last 4 digits.',
      'Pair with SourceOfFund for compose patterns; pass `chevron={false}` when nested.',
    ],
    accessibility: [
      'Row is a Pressable with `accessibilityRole="button"`.',
      'Accessibility label summarizes account name + masked number + balance.',
      'Visible state matches `accessibilityState` for selected rows.',
    ],
  },
  {
    slug: 'mobile-announcement-banner',
    name: 'Announcement banner',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Promotional or informational banner anchored to the top of a screen.',
    importName: 'AnnouncementBanner',
    packageName: '@brankas/native',
    anatomy: [
      'Background illustration or solid intent surface',
      'Title, message, optional action button',
      'Optional close button',
    ],
    usage: [
      'Use sparingly — at most one announcement per screen.',
      'Keep the message under two lines on a 360px viewport.',
      'Pair with a single, low-risk action (link or button).',
    ],
    accessibility: [
      'Container is `accessibilityRole="summary"` so screen readers group content.',
      'Close button has a descriptive `accessibilityLabel`.',
      'Action button uses standard button semantics.',
    ],
  },
  {
    slug: 'mobile-avatar',
    name: 'Avatar',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Identity surface for people, accounts, or entities.',
    importName: 'Avatar',
    packageName: '@brankas/native',
    anatomy: [
      'Circular frame in small (24), medium (40), large (56) sizes',
      'Image → initials → fallback icon chain',
      'Optional ring color and presence dot',
    ],
    usage: [
      'Use small in dense lists, large for profile headers.',
      'Use initials only when no image is available.',
      'Pair with a visible name in the same row.',
    ],
    accessibility: [
      'Image avatars include a meaningful `accessibilityLabel`.',
      'Decorative avatars set `accessibilityElementsHidden`.',
      'Color alone never carries identity meaning.',
    ],
  },
  {
    slug: 'mobile-badge',
    name: 'Badge',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Counts, dots, and tiny labels on parent elements.',
    importName: 'Badge',
    packageName: '@brankas/native',
    anatomy: [
      'Pill container with `number`, `dot`, or `new` style',
      'Color variants: gray, red, blue, primary',
      'Auto-clamps numbers above 99 to "99+"',
    ],
    usage: [
      'Keep text very short (1–2 chars for counts, ≤6 for words).',
      'Use the dot variant when an exact count is not useful.',
      'Place near the element the badge describes.',
    ],
    accessibility: [
      'Provide an `accessibilityLabel` like "3 unread" rather than the raw number.',
      'Do not encode meaning by color alone.',
    ],
  },
  {
    slug: 'mobile-bottom-nav',
    name: 'Bottom navigation',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Persistent app-level navigation pinned to the bottom of the screen.',
    importName: 'BottomNav',
    packageName: '@brankas/native',
    anatomy: [
      'Up to 5 navigation items with icon + label + optional badge',
      'Optional center QRIS button (raised, gradient surface)',
      'Active and inactive icon tones from the mobile palette',
    ],
    usage: [
      'Use for top-level app destinations only.',
      'Keep labels to one word.',
      'Use the QRIS slot for the most common transactional action.',
    ],
    accessibility: [
      'Each item is `accessibilityRole="tab"` with `accessibilityState.selected`.',
      'Badges surface their count via `accessibilityLabel`.',
      'QRIS button has its own descriptive label.',
    ],
  },
  {
    slug: 'mobile-bottom-sheet',
    name: 'Bottom sheet',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Modal sheet that slides up from the bottom for focused actions.',
    importName: 'BottomSheet',
    packageName: '@brankas/native',
    anatomy: [
      'Backdrop overlay (composed from Overlay)',
      'Sheet surface with grab handle, header (title + supporting text), body, footer',
      'Auto-sizes to content up to a max height',
    ],
    usage: [
      'Use for short flows that should not navigate away from the page.',
      'Keep the footer to one or two buttons.',
      'Use Dialog when the device is treated as a tablet.',
    ],
    accessibility: [
      'Backdrop dismisses on tap (configurable).',
      'Handle area is purely visual; the sheet has `accessibilityViewIsModal`.',
      'Focus moves into the sheet on open.',
    ],
  },
  {
    slug: 'mobile-button',
    name: 'Button',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Touch-optimized button with brand variants and large hit targets.',
    importName: 'Button',
    packageName: '@brankas/native',
    anatomy: [
      'Variants: primary, secondary, tertiary, tertiary-blue, tertiary-red, tertiary-invert, glassmorphism',
      'Sizes: small, medium, large, extra-large (minimum 44pt hit target)',
      'Slots: leadingIcon, trailingIcon, label, loading spinner',
    ],
    usage: [
      'Use one primary action per screen.',
      'Use extra-large for primary CTAs in onboarding and confirmation flows.',
      'Use the glassmorphism variant only over media or branded surfaces.',
    ],
    accessibility: [
      'Renders as Pressable with `accessibilityRole="button"`.',
      'Loading exposes `accessibilityState.busy`.',
      'Icon-only buttons must set `accessibilityLabel`.',
    ],
  },
  {
    slug: 'mobile-checkbox',
    name: 'Checkbox',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Independent binary choices and multi-select rows.',
    importName: 'Checkbox',
    packageName: '@brankas/native',
    anatomy: [
      'Square control with rounded corners',
      'Indeterminate, error, and disabled states',
      'No built-in label — compose with adjacent Text',
    ],
    usage: [
      'Use for choices that toggle independently.',
      'Use Toggle for instant on/off settings.',
      'Use indeterminate for "some children selected" rows.',
    ],
    accessibility: [
      'Pressable with `role="checkbox"` and `accessibilityState.checked` (or `"mixed"`).',
      'Disabled state exposed via `accessibilityState.disabled`.',
      'Hit target padded to 24×24.',
    ],
  },
  {
    slug: 'mobile-curve-background',
    name: 'Curve background',
    status: 'Ready',
    platform: 'Mobile',
    description: 'SVG curved backdrop used behind hero and header surfaces.',
    importName: 'CurveBackground',
    packageName: '@brankas/native',
    anatomy: [
      'Full-width SVG with brand curve path',
      'Configurable color and height',
      'Optional gradient overlay',
    ],
    usage: [
      'Use behind Header on dashboard-style screens.',
      'Pair with white content on top for legible foreground text.',
      'Keep content padding above the curve so the curve does not crop important UI.',
    ],
    accessibility: [
      'Decorative — set `accessibilityElementsHidden` and `importantForAccessibility="no-hide-descendants"`.',
    ],
  },
  {
    slug: 'mobile-dialog',
    name: 'Dialog',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Centered modal for blocking decisions and confirmations.',
    importName: 'Dialog',
    packageName: '@brankas/native',
    anatomy: [
      'Backdrop overlay (composed from Overlay)',
      'Centered panel with optional illustration, title, body, footer',
      'Footer with one or two stacked or side-by-side buttons',
    ],
    usage: [
      'Use for irreversible or confirmation decisions.',
      'Prefer BottomSheet for short flows that fit at the bottom.',
      'Keep the body to two short paragraphs.',
    ],
    accessibility: [
      '`accessibilityViewIsModal` set on the panel.',
      'Focus moves into the dialog on mount.',
      'Backdrop tap is configurable; primary action is autofocused.',
    ],
  },
  {
    slug: 'mobile-header',
    name: 'Header',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Top-of-screen app bar with title, back action, and optional scroll-shrink.',
    importName: 'Header',
    packageName: '@brankas/native',
    anatomy: [
      'Three variants: default, centered, large',
      'Leading back / close action, title, optional trailing actions',
      'Optional subtitle and scroll-shrink animation',
      'Optional curve background composition slot',
    ],
    usage: [
      'Use the centered variant for primary destinations.',
      'Use scroll-shrink on long content pages.',
      'Limit trailing icons to two.',
    ],
    accessibility: [
      'Back action is `accessibilityRole="button"` with a descriptive label.',
      'Title is a heading — pair with `accessibilityRole="header"`.',
      'Scroll-shrink respects `reduceMotion`.',
    ],
  },
  {
    slug: 'mobile-input-amount',
    name: 'Input amount',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Large currency input with auto-scaling type and optional currency picker.',
    importName: 'InputAmount',
    packageName: '@brankas/native',
    anatomy: [
      'Card surface with label, prefix (e.g. Rp), amount field, divider, helper or error caption',
      'Auto-scaling font from 32 → 16pt as digits grow',
      'Optional currency picker row (flag + code + chevron + rate)',
      'Optional clear (X) button while focused',
    ],
    usage: [
      'Use for transfer / payment amount entry.',
      'Pair with a currency picker only on multi-currency flows.',
      'Localize digit grouping via the `locale` prop.',
    ],
    accessibility: [
      'Field is a real `TextInput` with `keyboardType="numeric"`.',
      'Clear button has `accessibilityLabel="Clear amount"`.',
      'Currency picker exposes the active code in its label.',
    ],
  },
  {
    slug: 'mobile-overlay',
    name: 'Overlay',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Backdrop primitive composed by BottomSheet and Dialog.',
    importName: 'Overlay',
    packageName: '@brankas/native',
    anatomy: [
      'Full-screen Pressable with translucent background',
      'Fade animation tied to mount and unmount',
      'Optional tap-to-dismiss',
    ],
    usage: [
      'Compose into modal-like primitives — do not render alone.',
      'Use the standard tint; do not customize opacity per surface.',
      'Disable tap-to-dismiss for destructive confirmations.',
    ],
    accessibility: [
      'Sets `accessibilityViewIsModal` so screen readers stay inside the modal.',
      'Tap area exposes an "Dismiss" label when dismissible.',
    ],
  },
  {
    slug: 'mobile-search',
    name: 'Search',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Mobile search field in white or grey surface, often docked under a Header.',
    importName: 'Search',
    packageName: '@brankas/native',
    anatomy: [
      'Leading search icon, placeholder, optional clear (X) icon',
      'Two surface tones: white (on light page) and grey (on white page)',
      'Standard mobile field height and radius',
    ],
    usage: [
      'Use under a Header for in-page search.',
      'Match the surface tone to the page background.',
      'Pair with a result list rendered below.',
    ],
    accessibility: [
      'Renders a `TextInput` with `accessibilityRole="search"`.',
      'Clear button has `accessibilityLabel="Clear search"`.',
      'Placeholder is informative, not the only label.',
    ],
  },
  {
    slug: 'mobile-section-banner',
    name: 'Section banner',
    status: 'Ready',
    platform: 'Mobile',
    description: 'In-page banner that flags status or context inside a content section.',
    importName: 'SectionBanner',
    packageName: '@brankas/native',
    anatomy: [
      'Intent: informational, success, warning, error',
      'Leading icon, title, message, optional inline action',
      'Optional close button',
    ],
    usage: [
      'Place near the content the banner explains.',
      'Use one action max — do not cram multiple CTAs.',
      'Use Toast for transient feedback after an action.',
    ],
    accessibility: [
      'Error banners use `accessibilityLiveRegion="assertive"`.',
      'Other intents use `polite` so they do not interrupt focus.',
      'Close button has a clear `accessibilityLabel`.',
    ],
  },
  {
    slug: 'mobile-source-of-fund',
    name: 'Source of fund',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Selector card that displays the currently picked funding account.',
    importName: 'SourceOfFund',
    packageName: '@brankas/native',
    anatomy: [
      'Wraps an AccountItem with picker chrome',
      'Optional eyebrow label ("Pay with")',
      'Trailing chevron to open the account picker',
    ],
    usage: [
      'Use on transaction confirmation and amount-entry screens.',
      'Tap opens a BottomSheet listing available accounts.',
      'Inner AccountItem renders with `chevron={false}`.',
    ],
    accessibility: [
      'Card is `accessibilityRole="button"`.',
      'Accessibility label combines the eyebrow + selected account name.',
    ],
  },
  {
    slug: 'mobile-tabs',
    name: 'Tabs',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Underline tabs for switching between peer sections.',
    importName: 'Tabs',
    packageName: '@brankas/native',
    anatomy: [
      'Horizontal list of tabs with active underline',
      'Two levels: page-level (level 1) and sub-section (level 2)',
      'Roving active state',
    ],
    usage: [
      'Use for related content at the same hierarchy level.',
      'Keep labels short (one or two words).',
      'Use TabsChip for filter-style selection.',
    ],
    accessibility: [
      'Tabs expose `accessibilityRole="tab"` with `accessibilityState.selected`.',
      'Active tab is announced before the panel content.',
      'Tab list is `accessibilityRole="tablist"`.',
    ],
  },
  {
    slug: 'mobile-tabs-chip',
    name: 'Tabs (chip)',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Pill-shaped tabs for filter-style selection on mobile.',
    importName: 'TabsChip',
    packageName: '@brankas/native',
    anatomy: [
      'Horizontal scroll row of selectable chip tabs',
      'Selected chip uses primary tone; unselected uses subtle tone',
      'Optional leading icon per chip',
    ],
    usage: [
      'Use for filter or category strips above lists.',
      'Allow horizontal scroll when chips overflow.',
      'Use Tabs (underline) for primary navigation.',
    ],
    accessibility: [
      'Each chip is `accessibilityRole="tab"` with selected state.',
      'Container is `accessibilityRole="tablist"`.',
    ],
  },
  {
    slug: 'mobile-text-area',
    name: 'Text area',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Multi-line input with helper text, counter, and validation states.',
    importName: 'TextArea',
    packageName: '@brankas/native',
    anatomy: [
      'Label, multi-line `TextInput`, optional helper or error caption',
      'Auto-grows up to a configurable max height',
      'Character counter slot',
    ],
    usage: [
      'Use for free-form messages, notes, and addresses.',
      'Show a counter for length-limited fields.',
      'Pair with a clear submit affordance below.',
    ],
    accessibility: [
      'TextInput is associated with the visible label.',
      'Error state sets `accessibilityState.invalid`.',
      'Counter and helper text linked via `accessibilityLabelledBy`.',
    ],
  },
  {
    slug: 'mobile-text-field',
    name: 'Text field',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Single-line input with floating label and tap-to-clear affordance.',
    importName: 'TextField',
    packageName: '@brankas/native',
    anatomy: [
      'Label that floats above the field when filled or focused',
      'Optional leading and trailing icon slots',
      'Clear (X) icon while typing',
      'Error / focused / filled / disabled states',
    ],
    usage: [
      'Use for short text entries (name, email, account number).',
      'Use Search for query-style fields.',
      'Use TextArea for multi-line content.',
    ],
    accessibility: [
      'Label is associated with the input and announced as part of the field name.',
      'Error state sets `accessibilityState.invalid` and links the message.',
      'Trailing icon buttons need their own `accessibilityLabel`.',
    ],
  },
  {
    slug: 'mobile-toast',
    name: 'Toast',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Transient feedback surface anchored at the top or bottom of the screen.',
    importName: 'Toast',
    packageName: '@brankas/native',
    anatomy: [
      'Five types: general, success, warning, information, error',
      'Optional inline action and close button',
      'Auto-dismiss with pause on touch',
    ],
    usage: [
      'Pair destructive actions with an Undo toast.',
      'Do not put critical instructions only in a toast.',
      'Use one toast at a time.',
    ],
    accessibility: [
      'Error toasts set `accessibilityLiveRegion="assertive"`.',
      'Other toasts use `polite`.',
      'Auto-dismiss pauses while focused or hovered.',
    ],
  },
  {
    slug: 'mobile-toggle',
    name: 'Toggle',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Switch control for immediate on/off settings.',
    importName: 'Toggle',
    packageName: '@brankas/native',
    anatomy: [
      'Track and thumb with animated transition',
      'Active and inactive states, with disabled visual',
      'No built-in label — compose with adjacent Text',
    ],
    usage: [
      'Use for immediate settings (notifications on/off).',
      'Use Checkbox when the value is committed via form submit.',
      'Place the label to the left of the switch.',
    ],
    accessibility: [
      'Renders Pressable with `accessibilityRole="switch"`.',
      'State exposed via `accessibilityState.checked`.',
      'Animation respects `reduceMotion`.',
    ],
  },
  {
    slug: 'mobile-toggle-text',
    name: 'Toggle (text)',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Segmented two-option toggle with labels for picker-style choices.',
    importName: 'ToggleText',
    packageName: '@brankas/native',
    anatomy: [
      'Pill container with two adjacent options',
      'Active option painted with primary tone',
      'Inactive option painted with subtle tone',
    ],
    usage: [
      'Use for binary or two-mode selections (Monthly / Yearly, IDR / USD).',
      'Use Tabs (chip) when there are more than two options.',
      'Keep option labels short.',
    ],
    accessibility: [
      'Container is `accessibilityRole="radiogroup"`.',
      'Each option is `accessibilityRole="radio"` with selected state.',
    ],
  },
  {
    slug: 'mobile-tooltip',
    name: 'Tooltip',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Tap-triggered hint bubble for brief clarification.',
    importName: 'Tooltip',
    packageName: '@brankas/native',
    anatomy: [
      'Pressable info trigger',
      'Dark bubble with arrow pointer (auto-flips near screen edges)',
      'Auto-dismiss on outside tap',
    ],
    usage: [
      'Use for short clarification only.',
      'Avoid putting critical instructions inside tooltips.',
      'Pair with a long-press hint on touch devices.',
    ],
    accessibility: [
      'Trigger has `accessibilityRole="button"` with a descriptive label.',
      'Tooltip content is mirrored into the trigger\'s `accessibilityHint`.',
      'Skipped under `reduceMotion`.',
    ],
  },
  {
    slug: 'mobile-tracker',
    name: 'Tracker',
    status: 'Ready',
    platform: 'Mobile',
    description: 'Vertical progress tracker with connector line for multi-step status flows.',
    importName: 'Tracker',
    packageName: '@brankas/native',
    anatomy: [
      'Vertical list of steps with icon column and content column',
      'Dotted connector line between steps',
      'Per-step state: completed, current, upcoming, error',
      'Two sizes: medium and large',
    ],
    usage: [
      'Use for transaction status, KYC progress, and delivery flows.',
      'Use medium inside compact cards, large on dedicated status screens.',
      'Keep step descriptions to one or two lines.',
    ],
    accessibility: [
      'List is `accessibilityRole="list"`; steps are `listitem`.',
      'Current step exposes `accessibilityState.selected`.',
      'Error steps surface the error message via `accessibilityHint`.',
    ],
  },
];

export const tokenDocs: TokenDoc[] = [
  {
    category: 'Color',
    description: 'Brand, semantic, and surface colors generated from canonical token JSON.',
    references: [
      {
        name: 'Primary red',
        css: '--brankas-color-background-primary-red',
        ts: 'tokens.color.background.primaryRed',
        preview: 'var(--brankas-color-background-primary-red, #ed1c24)',
      },
      {
        name: 'Primary blue',
        css: '--brankas-color-primary-blue',
        ts: 'tokens.color.primaryBlue',
        preview: 'var(--brankas-color-primary-blue, #152433)',
      },
      {
        name: 'Success background',
        css: '--brankas-color-background-success',
        ts: 'tokens.color.background.success',
        preview: 'var(--brankas-color-background-success, #2daa50)',
      },
    ],
  },
  {
    category: 'Typography',
    description: 'Desktop and mobile typography are platform-specific semantic tokens.',
    references: [
      {
        name: 'Desktop body medium',
        css: '--brankas-typography-desktop-body-md-regular-font-size',
        ts: 'tokens.typography.desktop.body.md.regular',
      },
      {
        name: 'Mobile body medium',
        css: '--brankas-typography-mobile-body-md-regular-font-size',
        ts: 'tokens.typography.mobile.body.md.regular',
      },
    ],
  },
  {
    category: 'Spacing, radius, and shadow',
    description: 'Layout and elevation values are shared across desktop and mobile components.',
    references: [
      { name: 'Spacing scale', css: '--brankas-spacing-*', ts: 'tokens.spacing' },
      { name: 'Radius scale', css: '--brankas-radius-*', ts: 'tokens.radius' },
      { name: 'Shadow scale', css: '--brankas-shadow-*', ts: 'tokens.shadow' },
    ],
  },
];

export const patternDocs: PatternDoc[] = [
  {
    slug: 'multi-step-flow',
    name: 'Multi-step flow',
    description:
      'A page-driven wizard using ProgressIndicator + Button to advance through Back / Continue / Submit.',
    importName: 'ProgressIndicator',
    usage: [
      'Use for sequential workflows (KYC, onboarding, checkout).',
      'Drive `currentStep` from the parent so deep links and refresh work.',
    ],
    avoid: [
      'Do not use for peer-level navigation — that is Tabs.',
      'Do not let users jump forward to unvisited steps.',
    ],
  },
  {
    slug: 'undo-toast',
    name: 'Undo toast',
    description:
      'Destructive button → toast with an Undo action that fires before the auto-dismiss timer.',
    importName: 'Toast',
    usage: [
      'Pair every destructive action with an Undo affordance.',
      'Give users at least 5–8 seconds before the toast auto-dismisses.',
    ],
    avoid: [
      'Do not rely on Undo for irreversible operations (use a Dialog instead).',
      'Do not show multiple competing toasts for the same action.',
    ],
  },
  {
    slug: 'searchable-multi-select',
    name: 'Searchable multi-select',
    description:
      'SelectButton + SelectPanel with search input, draft state, and Apply commit. Badge on the trigger shows applied count.',
    importName: 'SelectPanel',
    usage: [
      'Use for filter chips with long option lists.',
      'Keep a draft state separate from applied state and commit on Apply.',
    ],
    avoid: [
      'Do not auto-apply on every checkbox toggle — surprises users.',
      'Do not omit search for short lists (use Checkbox group instead).',
    ],
  },
  {
    slug: 'sortable-table',
    name: 'Sortable + selectable table',
    description:
      'Table with sortable column headers, select-all checkbox row, and selected-row visual.',
    importName: 'Table',
    usage: [
      'Use for data lists with comparable columns and bulk actions.',
      'Show the active sort direction on the header chevron and `aria-sort`.',
    ],
    avoid: [
      'Do not paginate AND sort large datasets client-side — sort server-side.',
      'Do not hide the select-all checkbox; users need to act on the whole list.',
    ],
  },
  {
    slug: 'live-search-results',
    name: 'Live search results',
    description:
      'Search input with debounced loading → result panel → empty state. Three SearchResultPanel modes.',
    importName: 'Search',
    usage: [
      'Show the loading skeleton after ~150ms to avoid flicker on fast queries.',
      'Use the empty state to suggest alternative searches, not just "no results".',
    ],
    avoid: [
      'Do not search on every keystroke without debounce.',
      'Do not omit the default prompt; "type 3+ chars" tells users when the search activates.',
    ],
  },
  {
    slug: 'card-skeleton',
    name: 'Card placeholder',
    description:
      'Compose Skeleton shapes to mirror the final card layout — avatar + name + meta + body lines.',
    importName: 'Skeleton',
    usage: [
      'Match the proportions of the final content so layout does not shift on load.',
      'Use for content that takes more than ~300ms to render.',
    ],
    avoid: [
      'Do not use full-page skeletons that animate for many seconds — that triggers anxiety.',
      'Do not animate skeletons under `prefers-reduced-motion`.',
    ],
  },
];

export function findPatternDoc(slug: string) {
  return patternDocs.find((doc) => doc.slug === slug);
}

/**
 * Canonical slug — the URL segment used for /components/[slug].
 * Mobile entries are stored with a `mobile-` prefix to avoid colliding
 * with desktop slugs in the flat array; the canonical slug drops it.
 */
export function canonicalSlugOf(doc: ComponentDoc): string {
  if (doc.platform === 'Mobile' && doc.slug.startsWith('mobile-')) {
    return doc.slug.slice('mobile-'.length);
  }
  return doc.slug;
}

export type ComponentPlatformDetail = {
  description: string;
  importName: string;
  packageName: string;
  anatomy: string[];
  usage: string[];
  accessibility: string[];
  status: 'Draft' | 'Ready';
};

export type MergedComponentDoc = {
  slug: string;       // canonical slug (no mobile- prefix)
  name: string;
  defaultPlatform: 'desktop' | 'mobile';
  desktop: ComponentPlatformDetail | null;
  mobile: ComponentPlatformDetail | null;
};

function toPlatformDetail(doc: ComponentDoc, fallbackPackage: string): ComponentPlatformDetail {
  return {
    accessibility: doc.accessibility,
    anatomy: doc.anatomy,
    description: doc.description,
    importName: doc.importName,
    packageName: doc.packageName ?? fallbackPackage,
    status: doc.status,
    usage: doc.usage,
  };
}

/**
 * Merge desktop + mobile entries sharing a canonical slug into one document.
 * Returns one entry per canonical slug, ordered by the first occurrence
 * in `componentDocs`.
 */
export function getMergedComponentDocs(): MergedComponentDoc[] {
  const byCanonical = new Map<string, MergedComponentDoc>();
  const order: string[] = [];

  for (const doc of componentDocs) {
    const canonical = canonicalSlugOf(doc);
    let merged = byCanonical.get(canonical);
    if (!merged) {
      merged = {
        defaultPlatform: doc.platform === 'Mobile' ? 'mobile' : 'desktop',
        desktop: null,
        mobile: null,
        name: doc.name,
        slug: canonical,
      };
      byCanonical.set(canonical, merged);
      order.push(canonical);
    }
    if (doc.platform === 'Desktop') {
      merged.desktop = toPlatformDetail(doc, '@brankas/react/desktop');
      // If a desktop variant exists, prefer desktop as the default tab.
      merged.defaultPlatform = 'desktop';
    } else {
      merged.mobile = toPlatformDetail(doc, '@brankas/native');
    }
  }

  return order.map((slug) => byCanonical.get(slug)!);
}

export function findMergedComponentDoc(slug: string): MergedComponentDoc | undefined {
  return getMergedComponentDocs().find((doc) => doc.slug === slug);
}
