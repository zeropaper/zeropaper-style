import { resolve } from 'path';
import { tmpdir } from 'os';
import { readFile, writeFile, stat } from 'fs/promises';
import axios from 'axios';
import { AsyncReturnType } from 'typings';

const reposQuery = `query repos($after: String) {
  viewer {
    repositories(
      first: 75
      after: $after
      affiliations: [OWNER]
      privacy: PUBLIC
      isFork: false
      orderBy: {field: CREATED_AT, direction: DESC}
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        name
        createdAt
        updatedAt
        url
        stargazerCount
        isDisabled
        isTemplate
        homepageUrl
        nameWithOwner
        description
        descriptionHTML
        shortDescriptionHTML
        licenseInfo {
          id
          name
          nickname
        }
        labels {
          edges {
            node {
              id
              name
            }
          }
        }
        owner {
          login
          ... on Organization {
            id
            name
          }
        }
        languages(first: 100) {
          nodes {
            color
            id
            name
          }
        }
      }
    }
  }
}`;

interface Edges<T> {
  edges: T[];
}

export type NodeLabel = {
  id: string;
  name: string;
};

export type NodeOwner = {
  login: string;
  id: string;
  name: string;
};

export type NodeLanguage = {
  id: string;
  name: string;
  color: string;
};

export type RepoInfo = {
  name: string;
  createdAt: string;
  updatedAt: string;
  homepageUrl: string;
  nameWithOwner: string;
  isDisabled: boolean;
  isTemplate: boolean;
  url: string;
  stargazerCount: number;
  description: string;
  descriptionHTML: string;
  shortDescriptionHTML: string;
  owner: NodeOwner;
  labels: Edges<NodeLabel>;
  languages: { nodes: NodeLanguage[] };
};

type ReposResponse = {
  viewer: {
    repositories: {
      totalCount: number;
      pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
      };
      nodes: RepoInfo[];
    };
  };
};

const options = {
  headers: {
    Authorization: `bearer ${process.env.GITHUB_GRAPHQL_TOKEN}`,
  }
};

export async function querGHGrapQL<S = any>(query: string, variables: { [k: string]: any } = {}): Promise<S> {
  return axios.post('https://api.github.com/graphql', JSON.stringify({
    query,
    variables
  }), options).then((res) => res.data.data);
}

export function cacheTmpPath(key: string) {
  return resolve(tmpdir(), `gh-repos-${key}.json`);
}

export async function getCacheTmp(key: string): Promise<AsyncReturnType<typeof queryRepos> | null> {
  const path = cacheTmpPath(key);
  try {
    await stat(path);
    return JSON.parse(await readFile(path, 'utf-8'));
  } catch (e) {
    return null;
  }
}

export async function setCacheTmp(key: string, value: AsyncReturnType<typeof queryRepos>): Promise<void> {
  const path = cacheTmpPath(key);
  await writeFile(path, JSON.stringify(value));
}

export default async function queryRepos(after?: string): Promise<ReposResponse> {
  const key = after ? `${after}` : 'default';
  const cached = await getCacheTmp(key);
  if (cached) return cached;

  const result = await querGHGrapQL<ReposResponse>(reposQuery, { after });

  // the response is paginated, so... eagerly fetch...
  const {
    nodes,
    pageInfo: {
      hasNextPage,
      endCursor,
    }
  } = result.viewer.repositories;

  let returned = result;

  if (hasNextPage) {
    const nextPage = await queryRepos(endCursor);
    returned = {
      ...nextPage,
      viewer: {
        ...nextPage.viewer,
        repositories: {
          ...nextPage.viewer.repositories,
          nodes: [
            ...nodes,
            ...nextPage.viewer.repositories.nodes,
          ],
        }
      },
    };
  }

  setCacheTmp(key, result);

  return returned;
}