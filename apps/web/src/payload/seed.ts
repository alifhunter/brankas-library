import { getPayload } from 'payload';

import config from '../payload.config';

const payload = await getPayload({ config });
const componentPages = await payload.find({
  collection: 'component-pages',
  depth: 0,
  limit: 1,
});

await payload.destroy();

console.log(`Payload seed complete. Component pages: ${componentPages.totalDocs}.`);
