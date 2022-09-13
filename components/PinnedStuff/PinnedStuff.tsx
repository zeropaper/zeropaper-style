import React from "react";
import { Grid, Paper, Text, Title } from "@mantine/core";
import Image from "next/image";

import { DraftLink as Link } from "../../components/Link/Link";
import type { Stuff } from "../../typings";

export interface PropTypes extends Stuff {}

export function PinnedStuff(props: PropTypes) {
  const { published, href, title, picture, description } = props;
  return (
    <Grid.Col sm={6} key={href}>
      <Paper
        withBorder
        p="sm"
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <Title order={3} size="sm" mb="sm">
          <Link unpublished={!published} href={href}>
            {title}
          </Link>
        </Title>

        <Text mb="sm">{description}</Text>

        {picture ? (
          <Image
            alt={`Screenshot of "${title}"`}
            src={picture}
            width={400}
            height={300}
            layout="responsive"
            objectFit="cover"
          />
        ) : null}
      </Paper>
    </Grid.Col>
  );
}

export default PinnedStuff;
