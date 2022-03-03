import React from 'react'

import type {
  LandingPage,
  LandingPageBlocksFeatures,
  LandingPageBlocksHero
} from '../../.tina/__generated__/types'

import LinkCard from '../LinkCard/LinkCard'

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
                  {...(block as LandingPageBlocksHero)}
                  tinaField={[tinaField, i]
                    .filter((v) => typeof v !== undefined && v !== null)
                    .join('.')}
                />
              </React.Fragment>
            )
          case 'LandingPageBlocksFeature':
          case 'PageBlocksFeature':
          case 'LandingPageBlocksFeatures':
          case 'PageBlocksFeatures':
            return (
              <React.Fragment key={i + type}>
                <Features
                  {...(block as LandingPageBlocksFeatures)}
                  tinaField={[tinaField, i]
                    .filter((v) => typeof v !== undefined && v !== null)
                    .join('.')}
                />
              </React.Fragment>
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
