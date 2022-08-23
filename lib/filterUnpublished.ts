type Publishable = { published?: boolean }

export default function filterUnpublished<T = Publishable>(objs: T[]): T[] {
  return process.env.NODE_ENV !== 'production' ? objs : objs.filter((obj: Publishable) => obj.published);
}