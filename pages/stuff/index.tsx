import React from "react";
import Head from "next/head";
import { Box, Grid, Text, Title } from "@mantine/core";

import type { AsyncReturnType } from "../../typings";
import getRepos from "../../lib/getRepos";
import { LayoutContentWrapper } from "../../components/Layout/Layout";
import filterUnpublished from "../../lib/filterUnpublished";
import getStuffContext from "../../lib/getStuffContext";
import { Repos } from "../../components/Repos/Repos";
import PinnedStuff from "../../components/PinnedStuff/PinnedStuff";

const Stuff = (props: AsyncReturnType<typeof getStaticProps>["props"]) => {
  return (
    <LayoutContentWrapper>
      <Head>
        <meta name="description" content='Stuff by Valentin "zeropaper" Vago' />
      </Head>

      <Box component="header">
        <Title>Stuff</Title>

        <Text component="p">
          Code, like paint, is a medium to me.
          <br />
          If you give me paint it is going to be a mess, give me a text editor
          and I will draw you a sheep in CSS.
        </Text>
        <Text component="p">
          I frequently create new repository to try a new idea or tech and
          tinker with it.
          <br />
          This implies that some aspects may not be consistent across all the
          repositories.
        </Text>
      </Box>

      {props.data.posts.length ? (
        <Grid justify="center" grow my="sm">
          {props.data.posts.map((post) => (
            <PinnedStuff key={post.href} {...post} />
          ))}
        </Grid>
      ) : null}

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
  const {
    viewer: { repositories: repos },
  } = await getRepos();
  return {
    props: {
      data: {
        repos,
        posts,
      },
    },
  };
};
