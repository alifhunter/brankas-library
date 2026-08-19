import Link from 'next/link';
import { getSiteNavigation } from '../../../lib/site-navigation';
import { DocsShell } from '../docs-shell';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Example screens — Brankas Library',
};

const SCREENS = [
  {
    components: [
      'Accordion',
      'Avatar',
      'Badge',
      'Banner',
      'Breadcrumbs',
      'Button',
      'Carousel',
      'Chips',
      'Coachmark',
      'Dropdown',
      'Label',
      'Loader',
      'Progress bar',
      'Sidebar',
      'Skeleton',
      'Table',
      'Tooltip',
    ],
    description:
      'The morning view: what settled overnight, what is stuck above the approval threshold, and how much of the daily limit is gone. Loads through a real skeleton and loader pass.',
    href: '/examples/overview',
    name: 'Overview',
    watchFor:
      'Pill Chips for the date range sitting above 8px stat cards, and a Coachmark anchored to a pill Button.',
  },
  {
    components: [
      'Button',
      'Checkbox',
      'Chips',
      'Date picker',
      'Label',
      'Loader',
      'Pagination',
      'Search',
      'Search result panel',
      'Select',
      'Table',
      'Text field',
      'Toggle',
      'Tooltip',
    ],
    description:
      'Filter payouts by preset, status, bank, date and amount range. Filtering, sorting, selection, pagination and the empty state all work against the same dataset.',
    href: '/examples/transactions',
    name: 'Transaction search',
    watchFor:
      'The filter row is the densest shape mix in the console: pill Chips, then three 8px Select triggers, then two 8px Text fields, then a pill Reset. Two radii and two label positions in one row.',
  },
  {
    components: [
      'Avatar',
      'Banner',
      'Button',
      'Checkbox',
      'Dialog',
      'File upload',
      'Label',
      'Pagination',
      'Progress indicator',
      'Radio button',
      'Select',
      'Table',
      'Tabs',
      'Text area',
      'Text field',
      'Toast',
      'Tooltip',
    ],
    description:
      'A directory with tabs, bulk selection and pagination. "Add beneficiary" opens a three-step data-entry Dialog that ends in a Toast.',
    href: '/examples/beneficiaries',
    name: 'Beneficiary list',
    watchFor:
      'Inside the dialog, a Text field beside a Select — the pair that should match, and does. Both are 8px.',
  },
  {
    components: [
      'Banner',
      'Button',
      'Checkbox',
      'Date picker',
      'Dialog',
      'Label',
      'Progress indicator',
      'Radio button',
      'Search',
      'Search result panel',
      'Select',
      'Text area',
      'Text field',
      'Toast',
      'Toggle',
      'Tooltip',
    ],
    description:
      'A four-step payout wizard driven by Progress indicator, with a running summary, per-step validation that blocks Continue, a discard confirmation and a terminal success state.',
    href: '/examples/new-payout',
    name: 'Stepper flow',
    watchFor:
      'How far a form column should run before it stops. The fields cap at --size-field-max rather than stretching, and the step markers align to the same column.',
  },
  {
    components: [
      'Accordion',
      'Banner',
      'Button',
      'Checkbox',
      'Dialog',
      'File upload',
      'Label',
      'Radio button',
      'Select',
      'Text area',
      'Text field',
      'Toggle',
      'Tooltip',
    ],
    description:
      'One long sectioned form instead of a guided flow: many fields at once, mixed controls in a two-column grid, live inline validation, a dirty-state save bar, and a destructive action behind a confirmation.',
    href: '/examples/settings',
    name: 'Settings form',
    watchFor:
      'Two columns of mixed control types — Text field, Select, Toggle, Radio button, Checkbox — and whether their labels, heights and baselines line up across the grid.',
  },
] as const;

export default async function ExamplesPage() {
  const navigation = await getSiteNavigation();

  return (
    <DocsShell activeHref="/examples" navigation={navigation}>
      <div className="detail-page">
        <Link className="back-link" href="/">
          ← Home
        </Link>

        <section className="detail-hero">
          <div>
            <p className="eyebrow">Compositions</p>
            <h1>Example screens</h1>
            <p>
              Components reviewed one at a time all look correct. These screens exist to check the
              other thing — whether they still look like one system when they sit next to each
              other. Every screen below is a working page from the same fictional product, a
              Brankas Open Finance disbursements console for a business customer, and all of them
              read from one shared dataset.
            </p>
          </div>
          <div className="detail-status">
            <span>@brankas/react/desktop</span>
            <span>5 screens</span>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <h2>The screens</h2>
            <p>
              Open each one and look at the seams — control heights, corner radii, spacing between
              neighbours, and whether two adjacent components imply the same level of importance.
            </p>
          </div>

          <div className="example-screen-grid">
            {SCREENS.map((screen) => (
              <article className="example-screen-card" key={screen.href}>
                <header>
                  <h3>
                    <Link href={screen.href}>{screen.name}</Link>
                  </h3>
                  <p>{screen.description}</p>
                </header>

                <div className="example-screen-watch">
                  <h4>What to look at</h4>
                  <p>{screen.watchFor}</p>
                </div>

                <div className="example-screen-components">
                  <h4>Components on this screen</h4>
                  <ul>
                    {screen.components.map((component) => (
                      <li key={component}>{component}</li>
                    ))}
                  </ul>
                </div>

                <Link className="example-screen-link" href={screen.href}>
                  Open screen →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section text-block">
          <h2>Why these five</h2>
          <p>
            A dashboard, a search-with-filters page and a list page cover most of the adjacency
            problems a product team will hit. Between them they place every desktop component next
            to at least one neighbour it does not share a page with in isolation: pill actions
            against 8px inputs, dense table rows against roomy cards, floating panels against the
            surfaces they overlap.
          </p>
          <p>
            The two form screens exist as a pair on purpose. A stepper and a settings page are
            built from nearly the same components and answer opposite questions — one asks how to
            carry someone through a decision they make once, the other how to expose everything at
            once to someone who knows what they came to change. They also validate differently:
            the stepper gates each Continue and only shows errors after you try to advance, while
            the settings form validates live because it has no Continue to gate.
          </p>
          <p>
            These screens are deliberately code-owned rather than CMS-owned. They are a design
            review surface, so they should change in a pull request where the diff is visible,
            not in an admin form.
          </p>
        </section>
      </div>
    </DocsShell>
  );
}
