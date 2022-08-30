import * as React from "react";
import TinaCMS from "tinacms";
import { tinaConfig } from "../schema";
import client from '../__generated__/client';

// Importing the TinaProvider directly into your page will cause Tina to be added to the production bundle.
// Instead, import the tina/provider/index default export to have it dynamially imported in edit-moode
/**
 *
 * @private Do not import this directly, please import the dynamic provider instead
 */
const TinaProvider = ({ children }: React.PropsWithChildren<{}>) => {
  // @ts-ignore
  return <TinaCMS client={client} {...tinaConfig}>{children}</TinaCMS>;
};

export default TinaProvider;
