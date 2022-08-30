type Publishable = { published?: boolean }

export default function filterUnpublished<T extends Publishable>(objs: T[]): T[] {
  return process.env.NODE_ENV !== 'production'
    ? objs
    : objs.filter((obj: T) => !!obj?.published);
}