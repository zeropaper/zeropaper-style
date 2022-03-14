import React from 'react'

import type { LandingPage } from '../../.tina/__generated__/types'

import LinkCard from '../LinkCard/LinkCard'
import Wrapper from '../PageBlockWrapper/PageBlockWrapper'

const Debug = (props: any) => (
  <details>
    <summary>Details</summary>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </details>
)

const Hero = LinkCard
const Features = LinkCard

export const Blocks = (props: LandingPage & { tinaField?: string }) => {
  if (!props.blocks || !props.blocks.length) return <>Nope</>

  const tinaField = props.tinaField || ''

  return (
    <>
      {props.blocks.map(function (block: any, i: number) {
        const type: string = block?.__typename || ''

        switch (type) {
          case 'LandingPageBlocksContent':
          case 'PageBlocksContent':
            return (
              <React.Fragment key={i + type}>
                <Debug data={block} />
              </React.Fragment>
            )
          case 'LandingPageBlocksHero':
          case 'PageBlocksHero':
            return (
              <React.Fragment key={i + type}>
                <Hero
                  {...block}
                  tinaField={[tinaField, i]
                    .filter((v) => typeof v !== undefined && v !== null)
                    .join('.')}
                />
              </React.Fragment>
            )
          case 'LandingPageBlocksFeature':
          case 'PageBlocksFeature':
            return (
              <Wrapper {...(block.deco || {})} key={i + type}>
                <Features
                  {...block}
                  tinaField={[tinaField, i]
                    .filter((v) => typeof v !== undefined && v !== null)
                    .join('.')}
                />
              </Wrapper>
            )
          default:
            return (
              <React.Fragment
                key={i + type}
              >{`Unknown "${type}" block type`}</React.Fragment>
            )
        }
      })}
    </>
  )
}

export default Blocks
