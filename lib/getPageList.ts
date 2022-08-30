import client from './client';

export default function getPageList() {
  return client.queries.pageConnection();
}
