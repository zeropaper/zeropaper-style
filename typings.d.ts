declare module '@palmabit/react-cookie-law' {
  export const CookieBanner: any
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

declare module '*.module.css' {
  const content: { readonly [k: string]: string }
  export default content
}

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.csv' {
  const content: any
  export default content
}

declare type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any

declare type ClassNames<US> = Partial<ReturnType<US>['classes']>
