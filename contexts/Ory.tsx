import { edgeConfig as defaultEdgeConfig } from '@ory/integrations/next'
import { Session, Configuration, V0alpha2Api } from '@ory/kratos-client'
import { AxiosError } from 'axios'
import {
  useState,
  useContext,
  useEffect,
  createContext,
  ReactNode,
  useMemo
} from 'react'

const defaultCtx: {
  session?: Session
  logoutUrl?: string
  error?: any
} = {}

const OryCtx = createContext(defaultCtx)

const { Provider } = OryCtx

export type OryProviderProps = {
  children: ReactNode
  edgeConfig?: typeof defaultEdgeConfig
}

export const OryProvider = ({
  children,
  edgeConfig = defaultEdgeConfig
}: OryProviderProps) => {
  const kratos = useMemo(
    () => new V0alpha2Api(new Configuration(edgeConfig)),
    [edgeConfig]
  )
  // Contains the current session or undefined.
  const [session, setSession] = useState<Session>()

  // The URL we can use to log out.
  const [logoutUrl, setLogoutUrl] = useState<string>()

  // The error message or undefined.
  const [error, setError] = useState<any>()

  useEffect(() => {
    // If the session or error have been loaded, do nothing.
    if (session || error) {
      return
    }

    // Try to load the session.
    kratos
      .toSession()
      .then(({ data: session }) => {
        // Session loaded successfully! Let's set it.
        setSession(session)

        // Since we have a session, we can also get the logout URL.
        return kratos
          .createSelfServiceLogoutFlowUrlForBrowsers()
          .then(({ data }) => {
            setLogoutUrl(data.logout_url)
          })
      })
      .catch((err: AxiosError) => {
        // An error occurred while loading the session or fetching
        // the logout URL. Let's show that!
        setError({
          error: err.toString(),
          data: err.response?.data
        })
      })
  }, [session, error, kratos])

  const ctx = useMemo(
    () => ({ session, logoutUrl, error }),
    [session, logoutUrl, error]
  )

  return <Provider value={ctx}>{children}</Provider>
}

export const useOryKratos = () => {
  const ctx = useContext(OryCtx)
  return ctx
}

export default OryProvider
