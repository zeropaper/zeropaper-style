import client from './client';

export default function getStuffList() {
  return client.queries.stuffConnection();
}
