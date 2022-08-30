import client from './client';

export default function getLandingPageDocument(options: Parameters<typeof client.queries.landingPage>[0]) {
  return client.queries.landingPage(options);
}
