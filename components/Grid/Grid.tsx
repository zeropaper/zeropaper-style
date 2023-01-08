import React, { ComponentProps } from "react";

// import styles from '../../styles/Home.module.css'
const styles: any = {};

import { Blocks, BlocksProps } from "../Blocks/Blocks";

const Grid = (props: BlocksProps) => {
  return <Blocks blocks={props.blocks || []} tinaField={props.tinaField} />;
};

export default Grid;
