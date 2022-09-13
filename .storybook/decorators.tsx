import React from "react";
import { DecoratorFn } from "@storybook/react";
import Layout from "../components/Layout/Layout";

// eslint-disable-next-line storybook/prefer-pascal-case
export const withLayout: DecoratorFn = (Story) => (
  <Layout>
    <Story />
  </Layout>
);
