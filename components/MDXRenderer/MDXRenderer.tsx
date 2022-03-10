import { useMemo } from 'react'
import { TinaMarkdown, TinaMarkdownContent, Components } from 'tinacms/dist/rich-text'
import Link from '../Link/Link'
import Image from 'next/image'

const mdComponents: Components<{
  BlockQuote: {
    children: TinaMarkdownContent;
    authorName: string;
  };
  DateTime: {
    format?: string;
  };
  br: {},
  break: {},
  lineBreak: {},
  NewsletterSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
  };
}> = {
  BlockQuote: (props: {
    children: TinaMarkdownContent;
    authorName: string;
  }) => {
    return (
      <div>
        <blockquote>
          <TinaMarkdown content={props.children} />
          {props.authorName}
        </blockquote>
      </div>
    );
  },
  DateTime: (props) => {
    const dt = useMemo(() => {
      return new Date();
    }, []);

    switch (props.format) {
      case "iso":
        return <span>{dt.toISOString()}</span>;
      case "utc":
        return <span>{dt.toUTCString()}</span>;
      case "local":
        return <span>{dt.toLocaleDateString()}</span>;
      default:
        return <span>{dt.toLocaleDateString()}</span>;
    }
  },
  NewsletterSignup: (props) => {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-16 lg:px-8 md:flex md:items-center">
          <div className="md:w-0 md:flex-1">
            <TinaMarkdown content={props.children} />
          </div>
          <div className="mt-8 md:mt-0 md:ml-8">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs rounded-md"
                placeholder={props.placeholder}
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {props.buttonText}
                </button>
              </div>
            </form>
            <div className="mt-3 text-sm text-gray-500">
              {props.disclaimer && <TinaMarkdown content={props.disclaimer} />}
            </div>
          </div>
        </div>
      </div>
    );
  },
  break: (props) => <br {...props} />,
  lineBreak: (props) => <br {...props} />,
  br: (props) => <br {...props} />,
  a: ({ href, children, ...props }: any) => <Link {...props} href={href || '#'}>{children}</Link>,
}

export type MDXRendererProps = {
  content: TinaMarkdownContent | TinaMarkdownContent[];
  components?: Components<{}>;
  tinaField?: string;
}

export const MDXRenderer = ({ content, tinaField }: MDXRendererProps) => {
  return (
    <TinaMarkdown
      data-tinafield={tinaField}
      components={mdComponents}
      content={content}
    />
  )
}