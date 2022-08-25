import { useState, useMemo } from 'react';
import { ActionIcon, Box, Button, createStyles, Grid, Group, Select, Text, TextInput, Title } from '@mantine/core';
import { formatDistanceToNow } from 'date-fns';
import { IconSortAscending2, IconSortDescending2 } from '@tabler/icons';
import { RepoInfo } from '../../lib/getRepos';
import Repo from './Repo';

function sortBy<T>(key: keyof T, order: 'asc' | 'desc' = 'asc') {
  const orderInt = order === 'asc' ? 1 : -1;
  return function (a: T, b: T) {
    if (a[key] < b[key])
      return -1 * orderInt;
    if (a[key] > b[key])
      return 1 * orderInt;
    return 0;
  };
}
function repoHasLanguage(repo: RepoInfo, name: string) {
  return !!repo.languages.nodes.find((language) => name === language.name);
}
function languagesFilter(names: string[]) {
  return (repo: RepoInfo) => names.length
    ? !!names.find((name) => repoHasLanguage(repo, name))
    : true;
}
const useLanguagesGraphStyles = createStyles(({ spacing }) => ({
  root: {
    listStyle: 'none',
    padding: 0,
    margin: `${spacing.sm}px 0`,
  },
  item: {
    display: 'block',
    height: spacing.xs,
    width: '100%',
  }
}));
function LanguagesGraph({
  languages, repos,
}: {
  languages: { name: string; color: string; }[];
  repos: RepoInfo[];
}) {
  const { classes } = useLanguagesGraphStyles();
  return (
    <Box component='ul' className={classes.root}>
      {languages.map(({ name, color }) => (
        <Box
          className={classes.item}
          component='li'
          title={name}
          key={name}
          sx={{
            backgroundColor: color,
          }} />
      ))}
    </Box>
  );
}
function findTimeEdges(repos: RepoInfo[]) {
  let start = Date.now();
  let end = 0;
  repos.forEach((repo) => {
    const ts = new Date(repo.createdAt).getTime();
    if (ts < start)
      start = ts;
    if (ts > end)
      end = ts;
  });
  return [start, end, end - start];
}
export function Repos({
  repos, totalCount
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
      };
    } = {};
    repos.forEach(({ languages: repoLanguages, name: repoName }) => {
      repoLanguages?.nodes.forEach(({ name, color }) => {
        languages[name] = languages[name] || { name, color, repositories: [] };
        languages[name].repositories.push(repoName);
      });
    });
    return Object.values(languages).sort(({ repositories: a }, { repositories: b }) => b.length - a.length);
  }, [repos]);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
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
  const allTimesEdges = useMemo(() => {
    return findTimeEdges(repos);
  }, [repos]);
  const filteredEdges = useMemo(() => {
    return findTimeEdges(filtered);
  }, [filtered]);

  const handleToggleLanguage = (language: string) => setActiveLanguages((lngs) => lngs.includes(language) ? lngs.filter((l) => l !== language) : [...lngs, language]);
  return (
    <>
      <Title order={2}>Git Repositories</Title>
      <Text component='p'>This list does not contain forks, private repositories or the ones hosted outside of GitHub.</Text>

      <Group my="sm">
        <TextInput
          sx={{ flexGrow: 1 }}
          placeholder="Search"
          onChange={(e) => setSearched(e.target.value)} />

        <Select
          data={[
            { value: 'createdAt', label: 'Created' },
            { value: 'updatedAt', label: 'Updated' },
            { value: 'name', label: 'Name' },
          ]}
          value={sortOn}
          onChange={(value: keyof RepoInfo) => setSortOn(value)} />

        <ActionIcon onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
          {sortDirection === 'asc' ? <IconSortDescending2 /> : <IconSortAscending2 />}
        </ActionIcon>
      </Group>

      <Group mb="sm">
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

      <LanguagesGraph languages={allLanguages} repos={filtered} />
      <Text component='p'>
        {`Earliest: ${formatDistanceToNow(new Date(filteredEdges[0]), { addSuffix: true })} - Latest: ${formatDistanceToNow(new Date(filteredEdges[1]), { addSuffix: true })}`}
      </Text>

      <Grid justify="center" grow mb="sm">
        {filtered.slice(start, start + limit).map(repo => (
          <Repo key={repo.name} {...repo} />
        ))}
      </Grid>
    </>
  );
}

export default Repos;
