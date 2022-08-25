import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Grid, Paper, Text, Title } from '@mantine/core';

import getRepos from '../../lib/getRepos';
import { LayoutContentWrapper } from '../../components/Layout/Layout';
import { DraftLink as Link } from '../../components/Link/Link';
import filterUnpublished from '../../lib/filterUnpublished';
import getStuffContext from '../../lib/getStuffContext';
import { AsyncReturnType } from '../../typings';
import { Repos } from '../../components/Repos/Repos';

const Stuff = (props: AsyncReturnType<typeof getStaticProps>['props']) => {
  return (
    <LayoutContentWrapper>
      <Head>
        <meta name="description" content="Stuff by zeropaper" />
      </Head>

      <Box component='header'>
        <Title>Stuff</Title>

        <Text component='p'>
          Code, like paint, is a medium to me. Give me paint and it is going to be a mess, give me a text editor and I will draw you a sheep in CSS.
        </Text>
        <Text component='p'>
          It is quite common that I try a new idea or tech by creating a Git repository and fiddle with it. This implies that some aspects may not be consistent across all the repositories.
        </Text>
      </Box>

      <Grid justify="center" grow my="sm">
        {props.data.posts.map((post) => (
          <Grid.Col sm={6} key={post.href}>
            <Paper withBorder p="sm">
              <Link unpublished={!post?.published} href={post.href}>
                {post.title}
              </Link>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>

      <Repos
        totalCount={props.data.repos.totalCount}
        repos={props.data.repos.nodes}
      />
    </LayoutContentWrapper>
  );
};

export default Stuff;

export const getStaticProps = async function () {
  const postsListData = await getStuffContext();
  const posts = filterUnpublished(Object.values(postsListData));
  const { viewer: { repositories: repos } } = await getRepos();
  return {
    props: {
      data: {
        repos,
        posts,
      },
    },
  };
};
