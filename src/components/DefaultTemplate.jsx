import React from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout/Layout';

const DefaultTemplate = (props) => {
  const {
    pageContext,
  } = props;

  console.info(pageContext);
  return (
    <Layout>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>
    </Layout>
  );
};

DefaultTemplate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pageContext: PropTypes.object.isRequired,
};

export default DefaultTemplate;
