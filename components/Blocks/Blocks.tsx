import { MDXRenderer } from "components/MDXRenderer/MDXRenderer";
import React from "react";

import type { LandingPage } from "../../.tina/__generated__/types";

import LinkCard from "../LinkCard/LinkCard";
import Wrapper from "./Wrapper/Wrapper";
import Timeline from "../Timeline/Timeline";

const Debug = (props: any) => (
  <details>
    <summary>Details</summary>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </details>
);

const Hero = LinkCard;
const Features = LinkCard;
export type BlocksProps = {
  blocks: LandingPage["blocks"];
  tinaField?: string;
};

function tinaFieldName(tinaField: string, i: number, type: string) {
  return [tinaField, i]
    .filter((v) => typeof v !== undefined && v !== null)
    .join(".")
}
export const Blocks = (props: BlocksProps) => {
  if (!props.blocks || !props.blocks.length) return <>no blocks</>;

  const tinaField = props.tinaField || "";

  return (
    <>
      {props.blocks.map(function (block: any, i: number) {
        const type: string = (block?.__typename || "")
          .replace("Landing", "")
          .replace("PageBlocks", "");
        switch (type) {
          case "Feature":
            return (
              <React.Fragment key={i + type}>
                <Hero
                  {...block}
                  tinaField={tinaFieldName(tinaField, i, type)}
                />
              </React.Fragment>
            );
          case "Hero":
            return (
              <Wrapper {...(block.deco || {})} key={i + type}>
                <Features
                  {...block}
                  tinaField={tinaFieldName(tinaField, i, type)}
                />
              </Wrapper>
            );
          case "Timeline":
            return (
              <Wrapper plain key={i + type}>
                <Timeline block={block} />
              </Wrapper>
            );
          default:
            return (
              <React.Fragment
                key={i + type}
              >{`Unknown "${type}" block type`}</React.Fragment>
            );
        }
      })}
    </>
  );
};

export default Blocks;
