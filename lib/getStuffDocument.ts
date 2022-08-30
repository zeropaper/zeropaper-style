
import client from './client';

export default function getStuffDocument(options: Parameters<typeof client.queries.stuff>[0]) {
  return client.queries.stuff(options);
}
