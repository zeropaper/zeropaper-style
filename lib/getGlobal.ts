import client from './client';

export default function getGlobal() {
  return client.queries.global({ relativePath: 'index.json' });
}

// TODO: that?
// import globals from '../content/global/index.json'

// export default async function getGlobal() {
//   return globals
// }