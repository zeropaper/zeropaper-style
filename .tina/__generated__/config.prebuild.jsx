var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// .tina/config.ts
import { defineConfig } from "tinacms";

// .tina/schema.ts
import { defineSchema } from "tinacms";

// components/Layout/Footer.tsx
import * as React3 from "react";
import { createStyles as createUseStyles2 } from "@mantine/core";

// components/Link/Link.tsx
var Link_exports = {};
__export(Link_exports, {
  ButtonLink: () => ButtonLink,
  DraftLink: () => DraftLink,
  Link: () => Link,
  default: () => Link_default,
  useStyles: () => useStyles
});
__reExport(Link_exports, link_star);
import NextLink from "next/link";
import { Button, createStyles } from "@mantine/core";
import * as link_star from "next/link";
var useStyles = createStyles(
  ({ fn, colors, colorScheme, primaryColor }) => ({
    root: {
      ...fn.focusStyles(),
      color: colors?.[primaryColor][5],
      transition: "color 162ms ease-in-out",
      "&:hover,&:focus": {
        color: colors[primaryColor][3]
      },
      "&.draft": {
        color: colors?.["orange"][5]
      },
      "&.draft:hover,&.draft:focus": {
        color: colors["orange"][3]
      }
    }
  })
);
var Link = ({
  // children,
  className,
  component: Component = "a",
  // Next Link Props
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  //
  ...rest
}) => {
  const { classes, cx } = useStyles();
  const linkProps = {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
    locale
  };
  return React.createElement(NextLink, { ...linkProps, legacyBehavior: true }, React.createElement(Component, { ...rest, className: cx(className, classes.root) }));
};
var ButtonLink = (props) => React.createElement(Link, { ...props, component: Button });
var DraftLink = ({
  unpublished,
  className,
  ...props
}) => React.createElement(
  Link,
  {
    ...props,
    className: [className, unpublished && "draft"].filter(Boolean).join(" ")
  }
);
var Link_default = Link;

// components/Layout/SocialNetworks.tsx
import { createStyles as createUseStyles } from "@mantine/core";
import * as React2 from "react";
var useStyles2 = createUseStyles({
  root: {
    overflow: "hidden"
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "flex"
  },
  item: {
    padding: 0,
    margin: "0 0.5em",
    "&:first-of-type": {
      marginLeft: 0
    },
    "&:last-child": {
      marginRight: 0
    }
  },
  link: {
    display: "flex"
  },
  icon: {
    width: "1.25em",
    height: "1.25em",
    "& path": {
      fill: "currentColor"
    }
  }
});

// components/Layout/Footer.tsx
var useStyles3 = createUseStyles2(
  ({ fn, spacing, colorScheme, white, colors }) => ({
    root: {
      position: "sticky",
      bottom: 0,
      backgroundColor: colorScheme === "light" ? white : colors.dark[7],
      [fn.smallerThan("xs")]: {
        fontSize: "1rem",
        flexDirection: "column",
        alignItems: "center"
      }
    },
    inner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: spacing.xs,
      paddingBottom: spacing.xs
    },
    column: {},
    snList: {
      marginLeft: "auto"
    }
  })
);
var footerSchema = {
  type: "object",
  label: "Footer",
  name: "footer",
  fields: [
    {
      name: "hideSocialNetworks",
      label: "Hide Social Networks",
      type: "boolean",
      ui: {
        defaultValue: true
      }
    }
  ]
};

// components/Layout/Header.tsx
import * as React6 from "react";
import {
  createStyles as createUseStyles4,
  useMantineColorScheme,
  keyframes
} from "@mantine/core";

// components/Logo/Logo.tsx
import React4 from "react";

// components/Logo/assets/zeropaper-slim.svg
var zeropaper_slim_default = "./zeropaper-slim-LMI3ZNYN.svg";

// components/Logo/assets/zeropaper-fat.svg
var zeropaper_fat_default = "./zeropaper-fat-TLISD56V.svg";

// components/Logo/Logo.tsx
var Logo = ({ slim, className }) => {
  const Comp = slim ? zeropaper_slim_default : zeropaper_fat_default;
  return React4.createElement(Comp, { className: `${className} .site-logo` });
};
Logo.defaultProps = {
  slim: false,
  className: null
};

// components/Layout/Menu.tsx
import * as React5 from "react";
import { createStyles as createUseStyles3 } from "@mantine/core";
var useStyles4 = createUseStyles3({
  root: {},
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "flex"
  },
  item: {
    margin: "0 0.5em",
    "&:first-of-type": {
      marginLeft: 0
    },
    "&:last-of-type": {
      marginRight: 0
    }
  },
  link: {
    display: "flex"
  }
});
var menuSchema = {
  type: "object",
  label: "Menu",
  name: "menu",
  fields: [
    {
      type: "object",
      name: "links",
      label: "Links",
      list: true,
      ui: {
        defaultItem: {
          href: "/",
          label: "Home"
        }
      },
      fields: [
        {
          type: "string",
          label: "Link",
          name: "href"
        },
        {
          type: "string",
          label: "Label",
          name: "label"
        }
      ]
    }
  ]
};

// components/Layout/Header.tsx
var drawStroke = keyframes({
  "0%": {
    strokeDasharray: "200%",
    strokeDashoffset: "0%"
  },
  "100%": {
    strokeDasharray: "200%",
    strokeDashoffset: "400%"
  }
});
var useStyles5 = createUseStyles4(({ spacing, fn }, _params, getRef) => {
  const logo = getRef("logo");
  return {
    root: {},
    inner: {
      display: "flex",
      alignItems: "center",
      paddingTop: spacing.sm,
      paddingBottom: spacing.sm
    },
    title: {
      fontWeight: 300,
      fontSize: "min(32px, 7vw)",
      flexGrow: 1,
      margin: 0,
      [fn.smallerThan("md")]: {
        width: "25%"
      }
    },
    titleLink: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      borderBottom: "none",
      [`&:hover .${logo} path`]: {
        animationName: drawStroke
      }
    },
    logo: {
      ref: logo,
      marginRight: spacing.sm,
      maxHeight: "1em",
      maxWidth: "1em",
      [fn.smallerThan("md")]: {
        transform: "translateX(-6px)"
      },
      "& path": {
        stroke: "currentColor",
        strokeWidth: 40,
        fill: "none",
        animationDuration: "2s",
        // animationIterationCount: 'infinite',
        animationFillMode: "forwards",
        animationTimingFunction: "linear"
      }
    },
    linkText: {
      [fn.smallerThan("sm")]: {
        display: "none"
      }
    },
    menu: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [fn.smallerThan("md")]: {
        width: "50%"
        // flexGrow: 2,
      }
    },
    themeToggleWrapper: {
      width: "33%",
      textAlign: "right",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      [fn.smallerThan("md")]: {
        // width: '25%',
        // flexGrow: 1,
      }
    },
    themeToggle: {
      background: "none",
      border: "none",
      textDecoration: "underline",
      font: "inherit",
      cursor: "pointer",
      color: "inherit",
      display: "inline-flex",
      alignItems: "baseline",
      margin: 0,
      padding: 0
    },
    themeModeIcon: {
      "& path": {
        fill: "currentColor"
      }
    }
  };
});
var headerSchema = {
  type: "object",
  label: "Header",
  name: "header",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title"
    },
    {
      type: "string",
      name: "linkTitle",
      label: "Link Title"
    }
  ]
};

// .tina/schema.ts
var dateField = {
  label: "Date",
  name: "date",
  type: "datetime",
  ui: {
    dateFormat: "YYYY-MM-DD"
  }
};
var tagsField = {
  label: "Tags",
  name: "tags",
  // type: "reference",
  // collections: ['tags'],
  type: "string",
  list: true,
  ui: {
    component: "tags"
  }
};
var mdxBodyField = {
  type: "rich-text",
  label: "Body",
  name: "body",
  isBody: true
};
var slugField = {
  type: "string",
  label: "Slug",
  name: "slug"
};
var publishedField = {
  type: "boolean",
  name: "published",
  label: "Published"
};
var titleField = {
  type: "string",
  name: "title",
  label: "Title"
};
var descriptionField = {
  type: "string",
  name: "description",
  label: "Description"
};
var pageFields = [
  titleField,
  descriptionField,
  publishedField
];
var deco = {
  name: "deco",
  label: "Deco",
  type: "object",
  fields: [
    { name: "slant", label: "Slant", type: "boolean" },
    {
      name: "background",
      label: "Background",
      type: "string",
      options: ["dark", "gray", "red", "pink", "grape", "violet", "indigo", "blue", "cyan", "green", "lime", "yellow", "orange", "teal"]
    }
  ]
};
var feature = {
  label: "Feature",
  name: "feature",
  fields: [
    { name: "href", label: "HREF", type: "string" },
    { name: "title", label: "Title", type: "string" },
    { name: "description", label: "Description", type: "string" },
    deco
  ]
};
var hero = {
  label: "Hero",
  name: "hero",
  fields: [
    { name: "href", label: "HREF", type: "string" },
    { name: "title", label: "Title", type: "string" },
    { name: "description", label: "Description", type: "string" },
    deco
  ]
};
var markdown = {
  label: "Markdown",
  name: "markdown",
  fields: [
    {
      name: "content",
      label: "Content",
      type: "rich-text",
      isBody: false
    },
    deco
  ]
};
var timelineItem = {
  label: "Timeline Item",
  name: "timelineItem",
  ui: {
    itemProps: (item) => ({
      label: [item?.from, item?.employer].filter(Boolean).join(" - ")
    })
  },
  fields: [
    titleField,
    {
      name: "employer",
      label: "Employer",
      type: "string"
    },
    {
      name: "text",
      label: "Text",
      type: "rich-text",
      isBody: false
    },
    {
      name: "from",
      label: "From",
      type: "string"
    },
    {
      name: "to",
      label: "To",
      type: "string"
    },
    {
      name: "stack",
      label: "Stack",
      type: "string",
      list: true
    },
    {
      name: "links",
      label: "Links",
      type: "string",
      list: true
    }
  ]
};
var timeline = {
  label: "Timeline",
  name: "timeline",
  fields: [
    {
      name: "introduction",
      label: "Introduction",
      type: "rich-text",
      isBody: false
    },
    {
      label: "Items",
      name: "items",
      type: "object",
      list: true,
      templates: [
        timelineItem
      ]
    }
  ]
};
var globals = {
  label: "Global",
  name: "global",
  path: "content/global",
  ui: {
    global: true
  },
  format: "json",
  fields: [
    headerSchema,
    footerSchema,
    menuSchema
  ]
};
var landingPages = {
  label: "Landing Pages",
  name: "landingPage",
  path: "content/landing",
  format: "json",
  fields: [
    ...pageFields,
    {
      label: "Blocks",
      name: "blocks",
      type: "object",
      list: true,
      templates: [
        hero,
        feature,
        markdown,
        timeline
      ]
    }
  ]
};
var pages = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  fields: [
    ...pageFields,
    mdxBodyField
  ]
};
var tags = {
  label: "Tags",
  name: "tag",
  path: "content/tags",
  format: "json",
  fields: [
    { type: "string", name: "name" },
    { type: "string", name: "slug" },
    { type: "string", name: "description" }
  ]
};
var stuff = {
  label: "Stuff",
  name: "stuff",
  path: "content/stuff",
  format: "mdx",
  fields: [
    ...pageFields,
    slugField,
    dateField,
    // seoFields,
    tagsField,
    {
      type: "image",
      label: "Picture",
      name: "picture"
    },
    {
      type: "string",
      label: "Iframe",
      name: "iframe"
    },
    {
      type: "string",
      label: "Source",
      name: "source"
    },
    mdxBodyField
  ]
};
var schema = defineSchema({
  collections: [
    globals,
    landingPages,
    pages,
    tags,
    stuff
  ]
});

// .tina/config.ts
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "next";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema
});
export {
  config_default as default
};
