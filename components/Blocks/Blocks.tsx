import { MDXRenderer } from "components/MDXRenderer/MDXRenderer";
import React from "react";

import type { LandingPage } from "../../.tina/__generated__/types";

import LinkCard from "../LinkCard/LinkCard";
import Wrapper from "../PageBlockWrapper/PageBlockWrapper";
import Timeline from "../Timeline/Timeline";

const Debug = (props: any) => (
  <details>
    <summary>Details</summary>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </details>
);

const Hero = LinkCard;
const Features = LinkCard;
export type BlocksProps = Omit<LandingPage, "id" | "_sys" | "_values"> & {
  tinaField?: string;
};
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
          case "Content":
            return (
              <React.Fragment key={i + type}>
                <MDXRenderer content={block} />
              </React.Fragment>
            );
          case "Hero":
            return (
              <React.Fragment key={i + type}>
                <Hero
                  {...block}
                  tinaField={[tinaField, i]
                    .filter((v) => typeof v !== undefined && v !== null)
                    .join(".")}
                />
              </React.Fragment>
            );
          case "Feature":
            return (
              <Wrapper {...(block.deco || {})} key={i + type}>
                <Features
                  {...block}
                  tinaField={[tinaField, i]
                    .filter((v) => typeof v !== undefined && v !== null)
                    .join(".")}
                />
              </Wrapper>
            );
          case "Timeline":
            return (
              <React.Fragment key={i + type}>
                <Timeline block={block} />
              </React.Fragment>
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
