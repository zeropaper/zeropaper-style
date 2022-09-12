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

type PageMDBody = any

type PageMDXBody = any

export type PageBlock = {
  id: string
  wrapper: PageBlockWrapper
  component: string | ElementType
  props: any
  // preset: string
}

export type PageBlocks = PageBlock[]

// export type PageBody = PageBlocks | PageMDBody | PageMDXBody

export type Tag = {
  name: string
  description: string
  slug: string
}

export type PageProps = {
  path: string
  title: string
  description: string
  // body: PageBody
  blocks: PageBlocks
  keywords?: string[]
  image?: string
  canonical?: string
  // tags?: Tag[]
  template?: string
}

declare type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any

declare type ClassNames<US> = Partial<ReturnType<US>['classes']>
