import {
  useContext,
  createContext,
  ReactNode,
  useMemo,
  useState,
  useEffect
} from 'react'
import { staticRequest } from 'tinacms'

type QueryResult = {
  getPostList: {
    edges: {
      node: {
        sys: {
          filename: string
        }
      }
    }[]
  }
}

type PostEdges = QueryResult['getPostList']['edges']

const defaultCtx: {
  loading: boolean
  loaded: boolean
  error: any
  posts: PostEdges
} = {
  loading: false,
  loaded: false,
  error: null,
  posts: []
}

const PostsCtx = createContext(defaultCtx)

const { Provider } = PostsCtx

export const getPosts = async (): Promise<QueryResult> => {
  const postsListData = await staticRequest({
    query: `
      query {
        getPostList {
          edges {
            node {
              sys {
                filename
              }
            }
          }
      }
    }
    `,
    variables: {}
  })
  return postsListData as QueryResult
}

export type PostsProviderProps = {
  children: ReactNode
}

export const PostsProvider = ({ children }: PostsProviderProps) => {
  const [posts, setPosts] = useState<PostEdges>([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)
  const ctx = useMemo(
    () => ({ loading, loaded, error, posts }),
    [loading, loaded, error, posts]
  )

  useEffect(() => {
    setLoading(true)
    getPosts()
      .then((res) => {
        setLoaded(true)
        setLoading(false)
        setPosts(() => res?.getPostList?.edges || [])
      })
      .catch((err) => {
        setLoaded(true)
        setLoading(false)
        setError(err)
      })
  }, [])

  return <Provider value={ctx}>{children}</Provider>
}

export const usePosts = () => {
  const ctx = useContext(PostsCtx)
  return ctx
}

export default PostsProvider
