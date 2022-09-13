import client from './client';

export default function getGlobal() {
  return client.queries.global({ relativePath: 'index.json' });
}