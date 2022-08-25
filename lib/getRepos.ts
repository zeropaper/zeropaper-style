
import axios from 'axios';

const reposQuery = `query repos($after: String) {
  viewer {
    repositories(
      first: 75
      after: $after
      affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
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
}

export async function querGHGrapQL<S = any>(query: string, variables: { [k: string]: any } = {}): Promise<S> {
  return axios.post('https://api.github.com/graphql', JSON.stringify({
    query,
    variables
  }), {
    headers: {
      Authorization: `bearer ${process.env.GITHUB_GRAPHQL_TOKEN}`,
    }
  }).then((res) => res.data.data);
}

export default async function queryRepos(after?: string): Promise<ReposResponse> {
  const result = await querGHGrapQL<ReposResponse>(reposQuery, { after });
  // the response is paginated, so we need to get all the repos
  const {
    nodes,
    pageInfo: {
      hasNextPage,
      endCursor,
    }
  } = result.viewer.repositories;

  if (hasNextPage) {
    const nextPage = await queryRepos(endCursor);
    return {
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

  return result;
}