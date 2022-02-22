import * as React from 'react'

import { getStaticProps } from '../../../pages/blog/post/[path]'

describe('blog/post/[path]', () => {
  it.todo('getStaticPaths')

  it('getStaticProps', async () => {
    expect.hasAssertions()
    let result: any = await getStaticProps({
      params: {
        path: '/ghost-post'
      }
    })
    expect(result).toBeTruthy()

    expect(result).toHaveProperty('props')
    expect(result).toHaveProperty('props.title', 'Ghost post example')
    expect(result).toHaveProperty('props.description', '/ghost-post')
    expect(result).toHaveProperty('props.blocks')

    const [postBlock] = result.props.blocks
    expect(postBlock).toHaveProperty('component', 'post')
    expect(postBlock).toHaveProperty('wrapper')
    expect(postBlock).toHaveProperty('props')
    expect(postBlock).toHaveProperty('props.title', 'Ghost post example')
    expect(postBlock).toHaveProperty('props.overline', 'Redaction')
    expect(postBlock).toHaveProperty('props.subtitle', 'A post about redaction')
    expect(postBlock).toHaveProperty(
      'props.teaser',
      'The post that shall never be published'
    )
    expect(postBlock).toHaveProperty('props.published', false)
    expect(postBlock).toHaveProperty(
      'props.featuredimage',
      'media/ghost-post-featuredimage.jpg'
    )
    expect(postBlock).toHaveProperty('props.context', 'page')
    expect(postBlock).toHaveProperty('props.publishedAt', '2077-08-18')
    expect(postBlock).toHaveProperty('props.mdx')
    expect(postBlock).toHaveProperty('props.mdx.compiledSource')
  })
})
