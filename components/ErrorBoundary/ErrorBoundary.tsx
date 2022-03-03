import React, { ComponentType } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(err: any) {
    return { error: err };
  }

  componentDidCatch(err: any, info: any) {
    console.warn('ErrorBoundary did catch', err.message, info); // eslint-disable-line no-console
    this.setState({ error: err });
    // TODO: report problem with a tool like Sentry
  }

  render() {
    const {
      children,
      wrapInCard,
      errorMessage = 'Doh! Something went wrong…',
    } = this.props;
    const { error } = this.state;
    if (error) {
      const content = (
        <div style={{ textAlign: 'center' }} className="error-boundary">
          <div color="error">
            {errorMessage}
          </div>

          {/* <details>
            <summary>Details</summary>
            <pre>{error.stack}</pre>
          </details> */}
        </div>
      );
      if (wrapInCard) {
        return content;
      }
      return content;
    }

    return children;
  }
}

export default ErrorBoundary;

export const withErrorBoundary = (Comp: ComponentType) => {
  const Safe = (props: any) => (
    <ErrorBoundary>
      <Comp
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </ErrorBoundary>
  );
  Safe.displayName = `ErrorSafe(${Comp.displayName || Comp.name || 'WTF'})`;
  return Safe;
};
