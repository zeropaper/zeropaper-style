import { TinaMarkdown, TinaMarkdownContent, Components } from 'tinacms/dist/rich-text'
import Link from '../Link/Link'
import Image from 'next/image'

const mdComponents: { [k:string]: React.FunctionComponent<any> } = {
  h1: ({ children }) => <h1>{children}</h1>,
  h2: ({ children }) => <h2>{children}</h2>,
  h3: ({ children }) => <h3>{children}</h3>,
  h4: ({ children }) => <h4>{children}</h4>,
  h5: ({ children }) => <h5>{children}</h5>,
  h6: ({ children }) => <h6>{children}</h6>,
  p: ({ children }) => <p>{children}</p>,
  a: ({ href, children }) => <Link href={href || '/'}>{children}</Link>,
  img: ({ src, alt }) => <Image src={src} alt={alt} />,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  hr: () => <hr />,
  br: () => <br />,
  pre: ({ children }) => <pre>{children}</pre>,
  code: ({ children }) => <code>{children}</code>,
  inlineCode: ({ children }) => <code>{children}</code>,
  table: ({ children }) => <table>{children} </table>,
}

export type MDXRendererProps = {
  content: TinaMarkdownContent | TinaMarkdownContent[];
  components?: Components<{}>;
  tinaField?: string;
}

export const MDXRenderer = ({ content, tinaField }: MDXRendererProps) => (
  <TinaMarkdown
    data-tinafield={tinaField}
    components={mdComponents}
    content={content}
  />
)