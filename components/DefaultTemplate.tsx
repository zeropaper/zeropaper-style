import React from 'react';
import { PageProps } from 'gatsby';
import Layout from './Layout/Layout';

const DefaultTemplate: React.ReactNode = ({
  pageContext,
}: PageProps) => (
  <Layout>
    <pre>{JSON.stringify(pageContext, null, 2)}</pre>
  </Layout>
);

export default DefaultTemplate;
