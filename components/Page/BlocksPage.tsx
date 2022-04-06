import Head from 'next/head'

import Blocks from '../Blocks/Blocks'
import { PropTypes } from './GridPage'

export type BlocksPageProps = PropTypes & {
}

export const BlocksPage = ({
  title,
  blocks,
}: BlocksPageProps) => {
  return (
      <Head>
        <title>{title}</title>
        {/* <meta name="description" content="Generated by create next app" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <Blocks blocks={blocks || []} />
  </>
)
}

export default BlocksPage