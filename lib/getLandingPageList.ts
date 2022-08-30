import client from './client';

export default function getLandingPageList() {
  return client.queries.landingPageConnection();
}
