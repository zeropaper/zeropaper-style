import {
  TinaMarkdown,
  TinaMarkdownContent,
  Components,
} from "tinacms/dist/rich-text";
import Link from "../Link/Link";

const mdComponents: Components<{
}> = {
  a: ({ href, children, ...props }: any) => (
    <Link {...props} href={href || "#"}>
      {children}
    </Link>
  ),
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
