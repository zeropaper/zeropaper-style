import React from 'react'

import type {
  Page,
  PageBlocksFeatures,
  PageBlocksHero
} from '../.tina/__generated__/types'

import LinkCard from './LinkCard'

const Debug = (props: any) => (
  <details>
    <summary>Details</summary>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </details>
)

const Hero = LinkCard
const Features = LinkCard

export const Blocks = (props: Page & { tinafield?: string }) => {
  // console.info('Blocks.props', props)
  if (!props.blocks || !props.blocks.length) return <>Nope</>

  const tinafield = props.tinafield || ''

  return (
    <>
      {props.blocks.map(function (block, i) {
        const type: string = block?.__typename || ''

        switch (type) {
          case 'PageBlocksContent':
            return (
              <React.Fragment key={i + type}>
                <Debug data={block} />
              </React.Fragment>
            )
          case 'PageBlocksHero':
            return (
              <React.Fragment key={i + type}>
                <Hero
                  {...(block as PageBlocksHero)}
                  tinafield={[tinafield, i]
                    .filter((v) => typeof v !== undefined && v !== null)
                    .join('.')}
                />
              </React.Fragment>
            )
          case 'PageBlocksFeature':
          case 'PageBlocksFeatures':
            return (
              <React.Fragment key={i + type}>
                <Features
                  {...(block as PageBlocksFeatures)}
                  tinafield={[tinafield, i]
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
