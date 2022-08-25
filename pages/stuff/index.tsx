import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { ActionIcon, Box, Button, createStyles, Grid, Group, Paper, Select, Text, TextInput, Title } from '@mantine/core';
import getRepos, { NodeLanguage, RepoInfo } from '../../lib/getRepos';
import { LayoutContentWrapper } from '../../components/Layout/Layout';
import { DraftLink as Link } from '../../components/Link/Link';
import filterUnpublished from '../../lib/filterUnpublished';
import getStuffContext from '../../lib/getStuffContext';
import { AsyncReturnType } from '../../typings';
import { IconBrandGit, IconBrandGithub, IconGitFork, IconSortAscending2, IconSortDescending2 } from '@tabler/icons';

const useRepoStyles = createStyles(({ spacing }) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
  },
  title: {
    margin: 0,
    marginBottom: spacing.sm,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  link: {
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',
  }
}));

function Repo({
  name,
  description,
  url
}: RepoInfo) {
  const { classes } = useRepoStyles();
  return (
    <Grid.Col span={4}>
      <Paper className={classes.paper} withBorder p="sm">
        <Title className={classes.title} order={3}>
          {name}
        </Title>

        <Text>{description}</Text>

        <Link className={classes.link} unpublished={false} href={url}>
          <IconBrandGithub />
        </Link>
      </Paper>
    </Grid.Col>
  )
}

function sortBy<T>(key: keyof T, order: 'asc' | 'desc' = 'asc') {
  const orderInt = order === 'asc' ? 1 : -1;
  return function (a: T, b: T) {
    if (a[key] < b[key]) return -1 * orderInt;
    if (a[key] > b[key]) return 1 * orderInt;
    return 0;
  }
}

function repoHasLanguage(repo: RepoInfo, name: string) {
  return !!repo.languages.nodes.find((language) => name === language.name);
}

function languagesFilter(names: string[]) {
  return (repo: RepoInfo) => names.length
    ? !!names.find((name) => repoHasLanguage(repo, name))
    : true;
}

function Repos({
  repos,
  totalCount
}: {
  repos: RepoInfo[];
  totalCount: number;
}) {
  const allLanguages = useMemo(() => {
    const languages: {
      [name: string]: {
        name: string;
        color: string;
        repositories: string[];
      }
    } = {};
    repos.forEach(({ languages: repoLanguages, name: repoName }) => {
      repoLanguages?.nodes.forEach(({ name, color }) => {
        languages[name] = languages[name] || { name, color, repositories: [] };
        languages[name].repositories.push(repoName);
      });
    });
    return Object.values(languages).sort(({ repositories: a }, { repositories: b }) => b.length - a.length);
  }, [repos]);
  const [searched, setSearched] = useState('');
  const [sortOn, setSortOn] = useState<keyof RepoInfo>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [activeLanguages, setActiveLanguages] = useState<string[]>([]);
  const filtered: RepoInfo[] = useMemo(() => {
    const lcSearched = searched.toLowerCase();
    return repos
      .filter(({ name }) => name
        .toLowerCase()
        .includes(lcSearched))
      .filter(languagesFilter(activeLanguages))
      .sort(sortBy(sortOn, sortDirection));
  }, [repos, searched, sortOn, sortDirection, activeLanguages]);
  const handleToggleLanguage = (language: string) => setActiveLanguages((lngs) => lngs.includes(language) ? lngs.filter((l) => l !== language) : [...lngs, language]);

  return (
    <>
      <Group>
        {allLanguages.map(({ name, repositories }) => (
          <Button
            key={name}
            type="button"
            variant={activeLanguages.includes(name) ? 'subtle' : 'default'}
            onClick={() => handleToggleLanguage(name)}
          >
            {`${name} (${repositories.length})`}
          </Button>
        ))}
      </Group>

      <Group>
        <TextInput
          placeholder="Search"
          onChange={(e) => setSearched(e.target.value)}
        />

        <Select
          data={[
            { value: 'createdAt', label: 'Created' },
            { value: 'updatedAt', label: 'Updated' },
            { value: 'name', label: 'Name' },
          ]}
          value={sortOn}
          onChange={(value: keyof RepoInfo) => setSortOn(value)}
        />

        <ActionIcon onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
          {sortDirection === 'asc' ? <IconSortDescending2 /> : <IconSortAscending2 />}
        </ActionIcon>
      </Group>

      <Grid justify="center" grow mt="sm">
        {filtered.slice(0, 20).map(repo => (
          <Repo key={repo.name} {...repo} />
        ))}
      </Grid>
    </>
  );
}

const Stuff = (props: AsyncReturnType<typeof getStaticProps>['props']) => {
  return (
    <LayoutContentWrapper>
      <Head>
        <meta name="description" content="Stuff by zeropaper" />
      </Head>

      <Box component='header'>
        <Title>Stuff</Title>

        <Text>
          On this page you can find some stuff I have done or am currently doing.
          <br />
          It is quite common for me to try a new idea or tech by creating a Git repository and fiddle with it. This implies that some aspects may not be consistent across all the repositories.
          <br />
          Not all is open-source but most is.
        </Text>
      </Box>

      <ul>
        {props.data.posts.map((post) => (
          <li key={post.href}>
            <Link unpublished={!post?.published} href={post.href}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

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
