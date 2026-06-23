'use client';

import { useState } from 'react';
import { ComponentExample } from './component-example';
import { RichText } from '../../rich-text';
import type {
  ComponentPageContent,
  ComponentPlatformContent,
} from '../../../../lib/component-pages';

type Platform = 'desktop' | 'mobile';

export function ComponentDetailContent({ doc }: { doc: ComponentPageContent }) {
  const [platform, setPlatform] = useState<Platform>(doc.defaultPlatform);
  const isDesktop = platform === 'desktop';
  const activeDetail = isDesktop ? doc.desktop : doc.mobile;

  return (
    <>
      <div className="component-platform-tabs" role="tablist" aria-label="Component platform">
        <button
          aria-selected={isDesktop}
          className={isDesktop ? 'active' : undefined}
          onClick={() => setPlatform('desktop')}
          role="tab"
          type="button"
        >
          Desktop
        </button>
        <button
          aria-selected={!isDesktop}
          className={!isDesktop ? 'active' : undefined}
          onClick={() => setPlatform('mobile')}
          role="tab"
          type="button"
        >
          Mobile
        </button>
      </div>

      {activeDetail ? (
        <PlatformSection
          detail={activeDetail}
          platform={platform}
          slug={doc.slug}
        />
      ) : (
        <PlatformAbsent
          missingPlatform={platform}
          availablePlatform={platform === 'desktop' ? 'mobile' : 'desktop'}
        />
      )}
    </>
  );
}

function PlatformSection({
  detail,
  platform,
  slug,
}: {
  detail: ComponentPlatformContent;
  platform: Platform;
  slug: string;
}) {
  const showLivePreview = platform === 'desktop';

  return (
    <section className="detail-grid">
      {showLivePreview ? (
        <article className="detail-card detail-card-wide">
          <div className="detail-card-header">
            <h2>Live preview</h2>
            <p>Rendered from the component package, not copied into the website.</p>
          </div>
          <div className="component-preview-surface">
            <ComponentExample slug={slug} />
          </div>
        </article>
      ) : (
        <article className="detail-card detail-card-wide">
          <div className="detail-card-header">
            <h2>Mobile preview</h2>
            <p>
              Preview the live React Native component in Storybook — it renders via
              react-native-web with the same tokens used on device.
            </p>
          </div>
          <div className="component-preview-surface mobile-coming-soon">
            <span>Open in Storybook for an interactive preview</span>
          </div>
        </article>
      )}

      <article className="detail-card detail-card-wide">
        <h2>Import</h2>
        <pre className="code-sample">{`import { ${detail.importName} } from '${detail.packageName}';`}</pre>
      </article>

      <article className="detail-card detail-card-wide component-guidance">
        <RichText content={detail.content} fallback={detail.description} />
      </article>
    </section>
  );
}

function PlatformAbsent({
  missingPlatform,
  availablePlatform,
}: {
  missingPlatform: Platform;
  availablePlatform: Platform;
}) {
  const missingLabel = missingPlatform === 'desktop' ? 'desktop' : 'mobile';
  const availableLabel = availablePlatform === 'desktop' ? 'Desktop' : 'Mobile';

  return (
    <section className="detail-grid">
      <article className="detail-card detail-card-wide">
        <div className="detail-card-header">
          <h2>{availableLabel}-only component</h2>
          <p>
            This component does not have a {missingLabel} equivalent yet. Switch to the{' '}
            {availableLabel} tab to see its guidance.
          </p>
        </div>
        <div className="component-preview-surface mobile-coming-soon">
          <span>{availableLabel} only</span>
        </div>
      </article>
    </section>
  );
}

