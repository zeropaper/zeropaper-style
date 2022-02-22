import styles from '../styles/Home.module.css'

import { useOryKratos } from '../contexts/Ory'

export const SignedOut = () => (
  <>
    Get started and{' '}
    <a href={'/api/.ory/self-service/registration/browser'}>
      create an example account
    </a>{' '}
    or <a href={'/api/.ory/self-service/login/browser'}>sign in</a>,{' '}
    <a href={'/api/.ory/self-service/recovery/browser'}>recover your account</a>{' '}
    or{' '}
    <a href={'/api/.ory/self-service/verification/browser'}>
      verify your email address
    </a>
    ! All using open source{' '}
    <a href={'https://github.com/ory/kratos'}>Ory Kratos</a> in minutes with
    just a{' '}
    <a
      href={
        'https://www.ory.sh/login-spa-react-nextjs-authentication-example-api-open-source/'
      }
    >
      few lines of code
    </a>
    !
  </>
)

export const SignedIn = ({ session, logoutUrl }: any) => {
  return (
    <>
      {session ? (
        <>
          <a href={'/api/.ory/self-service/settings/browser'}>
            Update your settings
          </a>{' '}
          or{' '}
          <a data-testid="logout" href={logoutUrl} aria-disabled={!logoutUrl}>
            sign out
          </a>
          !
        </>
      ) : (
        <SignedOut />
      )}
    </>
  )
}

const Ory = (props: any) => {
  const { session, logoutUrl, error } = useOryKratos()

  const alert = error ? (
    <div className={styles.description}>
      {`Error: ${error.data?.error?.message || error.message || 'Unkonwn'}`}
      <details style={{ textAlign: 'left' }}>
        <summary>Details</summary>
        <pre>{JSON.stringify(error, null, 2)}</pre>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </details>
    </div>
  ) : null

  return (
    <div className={styles.description}>
      {alert}
      {session ? (
        <SignedIn session={session} logoutUrl={logoutUrl} />
      ) : (
        <SignedOut />
      )}
    </div>
  )
}

export default Ory
