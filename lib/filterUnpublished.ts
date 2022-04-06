const { NODE_ENV = 'development' } = process.env;

type Publishable = { published?: boolean }

export default function filterUnpublished<T = Publishable>(objs: T[]): T[] {
  return NODE_ENV !== 'production' ? objs : objs.filter((obj: Publishable) => obj.published);
}