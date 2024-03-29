import {
  TinaMarkdown,
  TinaMarkdownContent,
  Components,
} from "tinacms/dist/rich-text";
import Link from "../Link/Link";

const mdComponents: Components<{}> = {
  a: ({ type, url, children, ...props }: any) => (
    <Link {...props} href={url || "#"}>
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
