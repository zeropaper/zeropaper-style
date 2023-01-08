import { MDXRenderer } from "components/MDXRenderer/MDXRenderer";
import React from "react";

import type { LandingPage } from "../../.tina/__generated__/types";
import useLayoutStyles from "../Layout/Layout.styles";

import LinkCard from "../LinkCard/LinkCard";
import Wrapper from "./Wrapper/Wrapper";
import Timeline from "./Timeline";

const Debug = (props: any) => (
  <details>
    <summary>Details</summary>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </details>
);

const Features = LinkCard;
export type BlocksProps = {
  blocks: LandingPage["blocks"];
  tinaField?: string;
};

function tinaFieldName(tinaField: string, i: number, type: string) {
  return [tinaField, i]
    .filter((v) => typeof v !== undefined && v !== null)
    .join(".");
}
export const Blocks = (props: BlocksProps) => {
  const { classes } = useLayoutStyles();
  if (!props.blocks || !props.blocks.length) return null;
  const tinaField = props.tinaField || "";

  return (
    <>
      {props.blocks.map(function (block: any, i: number) {
        const type: string = (block?.__typename || "")
          .replace("Landing", "")
          .replace("PageBlocks", "");
        switch (type) {
          case "Feature":
          case "Hero":
            return (
              <Wrapper {...(block.deco || {})} key={i + type}>
                <Features
                  {...block}
                  tinaField={tinaFieldName(tinaField, i, type)}
                />
              </Wrapper>
            );
          case "Markdown":
            return (
              <Wrapper {...(block.deco || {})} key={i + type}>
                <div className={classes.inner}>
                  <MDXRenderer
                    content={block.content}
                    tinaField={tinaFieldName(tinaField, i, type)}
                  />
                </div>
              </Wrapper>
            );
          case "Timeline":
            return (
              <Wrapper plain key={i + type}>
                <Timeline block={block} />
              </Wrapper>
            );
          default:
            if (process.env.NODE_ENV === "development") {
              return <Debug key={i + type} block={block} />;
            }
            return null;
        }
      })}
    </>
  );
};

export default Blocks;
