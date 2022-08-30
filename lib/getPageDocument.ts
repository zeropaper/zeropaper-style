import client from './client';

export default function getPageDocument(options: Parameters<typeof client.queries.page>[0]) {
  return client.queries.page(options);
}
