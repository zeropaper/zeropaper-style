import {
  TinaMarkdown,
  TinaMarkdownContent,
  Components,
} from 'tinacms/dist/rich-text';
import Link from '../Link/Link';
import Timeline from '../Timeline/Timeline';

const mdComponents: Components<{
  Timeline: {
    [any: string]: any;
  };
}> = {
  a: ({ href, children, ...props }: any) => (
    <Link {...props} href={href || '#'}>
      {children}
    </Link>
  ),
  Timeline,
};

export type MDXRendererProps = {
  content: TinaMarkdownContent | TinaMarkdownContent[];
  components?: Components<{ [name: string]: any }>;
  tinaField?: string;
};

export const MDXRenderer = ({ content, tinaField }: MDXRendererProps) => {
  return (
    <TinaMarkdown
      data-tinafield={tinaField}
      components={mdComponents}
      content={content}
    />
  );
};
