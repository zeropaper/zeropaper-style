import { createStyles, Grid, Group, Paper, Text, Title } from '@mantine/core';
import { formatDistanceToNow } from 'date-fns';
import { IconBrandGithub } from '@tabler/icons';
import { RepoInfo } from '../../lib/getRepos';
import { DraftLink as Link } from '../Link/Link';

const useStyles = createStyles(({ spacing, colors }) => ({
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
  },
  description: {
    flexGrow: 1,
    marginBottom: spacing.sm,
  },
  languages: {
    color: colors.gray[6],
  }
}));
export function Repo({
  name, description, url, languages, createdAt, updatedAt,
}: RepoInfo) {
  const { classes } = useStyles();
  return (
    <Grid.Col sm={6}>
      <Paper className={classes.paper} withBorder p="sm">
        <Title className={classes.title} order={3}>
          {name}
        </Title>

        {/*
        <Group>
          <Text>C: {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</Text>
          <Text>U: {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}</Text>
        </Group>
        */}

        <Text className={classes.description}>
          {description}
        </Text>
        <Text className={classes.languages}>
          {languages.nodes.map(({ name }) => name).join(', ')}
        </Text>

        <Link title="Code on GitHub" className={classes.link} href={url}>
          <IconBrandGithub />
        </Link>
      </Paper>
    </Grid.Col>
  );
}

export default Repo;
