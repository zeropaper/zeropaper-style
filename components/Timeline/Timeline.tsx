import { Text, Box, createStyles, Title, Paper } from "@mantine/core";

// @ts-ignore
import timelineData from "./timeline-data.yml";

export interface TechCategory {
  name: string;
  description?: string;
  aliases?: string[];
}

export interface TechCategories {
  [key: string]: TechCategory;
}

export interface Tech {
  name: string;
  categories?: (keyof TechCategories)[];
}

export interface Stack {
  [key: string]: Tech[];
}

export interface Experience {
  title: string;
  text: string;
  employer?: string;
  from: string;
  to?: string;
  icon?: string;
  color?: string;
  stack?: (keyof Stack)[];
  // skills?: SkillSet[];
  links?: string[];
}

export interface TimelineProps {
  // techCategories: TechCategories;
  // items: Experience[];
}

const useTimelineItemStyles = createStyles(
  ({ spacing, breakpoints, colors }, params, getRef) => {
    return {
      root: {
        display: "flex",
        flexDirection: "row",
      },
      gutter: {
        position: "relative",
        width: spacing.md * 2,
        display: "flex",

        [`@media print`]: {
          display: "none",
        },

        [`@media (min-width: ${breakpoints.xl}px)`]: {
          paddingLeft: spacing.md,
          paddingRight: spacing.md,
          width: spacing.md * 3,
        },
        "&::before,&::after": {
          position: "absolute",
          content: '""',
          top: 0,
          bottom: 0,
        },
        "&::before": {
          background: "currentColor",
          zIndex: 1,
          width: 4,
          left: `calc(((${spacing.md}px - ${4}px) * 0.5))`,
          [`@media (min-width: ${breakpoints.xl}px)`]: {
            left: `calc(${spacing.md}px + ((${spacing.md}px - ${4}px) * 0.5))`,
          },
        },
        "&::after": {
          position: "absolute",
          zIndex: 0,
          left: spacing.md,
          width: spacing.md,
        },
      },
      dot: {
        position: "relative",
        zIndex: 3,
        display: "block",
        width: spacing.md,
        height: spacing.md,
        borderRadius: spacing.md,
        backgroundColor: "currentColor",
      },
      paperWrapper: {
        marginBottom: spacing.lg,
        width: "100%",
        [`@media print`]: {
          breakInside: "avoid",
          pageBreakInside: "avoid",
          display: "table",
        },
      },
      paper: {},
      dates: {
        paddingTop: 2,
        lineHeight: 1,
      },
      employer: {},
      title: {},
      text: {
        fontSize: "1.2rem",
        marginBottom: spacing.md,
      },
      stack: {
        marginBottom: spacing.md,
        color: colors.gray[6],
      },
      stackItem: {},
    };
  }
);

function ExperienceItem({
  title,
  text,
  from,
  to,
  className,
  employer,
  stack,
}: Experience & { className?: string }) {
  const { classes, cx } = useTimelineItemStyles();
  return (
    <Box className={cx(className, classes.root)}>
      <Box className={classes.gutter}>
        <Box className={classes.dot} />
      </Box>

      <Box component="section" className={classes.paperWrapper}>
        <Box className={classes.dates}>
          {from}
          {/* {`${from}${to ? ` - ${to}` : ''}`} */}
        </Box>
        <Paper
          p="xs"
          my="xs"
          withBorder
          component="main"
          className={classes.paper}
        >
          <Title className={classes.title} order={2}>
            {title}
          </Title>
          {employer && <Title order={3}>@ {employer}</Title>}
          <Text className={classes.text}>{text}</Text>

          <Box className={classes.stack}>
            {/* {(stack || []).map((tech) => (
              <span className={classes.stackItem} key={tech}>{tech}</span>
            ))} */}
            {(stack || []).join(", ")}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

const useTimelineStyles = createStyles<
  "root" | "item",
  { reverseOrder?: boolean }
>(({ spacing, breakpoints, fn }, { reverseOrder }, getRef) => {
  return {
    root: {
      // padding: spacing.md,
      display: "flex",
      margin: "0 auto",
      width: "100%",
      maxWidth: breakpoints.md - spacing.md * 2,
      overflow: "hidden",
      [fn.smallerThan("md")]: {
        paddingLeft: spacing.md,
        paddingRight: spacing.md,
      },
      flexDirection: reverseOrder ? "column-reverse" : "column",
      [`& > .${getRef("item")}:nth-of-type(odd)`]: {
        [`@media (min-width: ${breakpoints.xl}px)`]: {
          marginRight: "auto",
          marginLeft: `calc(50% - (${spacing.md}px * 1.5))`,
          textAlign: "left",
          flexDirection: "row",
        },
      },
      [`& > .${getRef("item")}:${
        reverseOrder ? "first" : "last"
      }-of-type > div:nth-of-type(1)`]: {
        "&::before,&::after": {
          display: "none",
        },
      },
    },
    item: {
      ref: getRef("item"),
      overflow: "hidden",
      [`@media (min-width: ${breakpoints.xl}px)`]: {
        flexDirection: "row-reverse",
        textAlign: "right",
        marginRight: `calc(50% - (${spacing.md}px * 1.5))`,
        marginLeft: "auto",
      },
    },
  };
});

export function Timeline({ reverseOrder }: { reverseOrder?: boolean }) {
  const { classes, cx } = useTimelineStyles({ reverseOrder });
  return (
    <Box className={classes.root}>
      {timelineData.map((item: any) => (
        <ExperienceItem className={classes.item} key={item.text} {...item} />
      ))}
      {/*
      <ExperienceItem
        className={classes.item}
        title="Multimedia Designer"
        text="I began creating with softwares like 3D Studio Max and Photoshop, Illustrator, After Effects, Flash and the likes. Although I was still studying, it's around that time that I wrote my first invoices and started working on my first website and took the 'zeropaper' alias."
        from="2001"
        to="2005"
      />
      <ExperienceItem
        className={classes.item}
        title="Trainee Web Developer"
        from="2004"
        to="2004"
        text="My Multimedia Design studies ended with as the first trainee of a company called Mediagonal (now liip). It's really during that time that I discovered Linux and used since then. I had the chance to learn from pioneers in their fields and I got my to face my first JavaScript challenge."
      />
      <ExperienceItem
        className={classes.item}
        title="Web Developer"
        text="Moved to Berlin and worked for several years as a freelance web developer. Mostly with PHP at first, focusing on Drupal after a while. Mundraub.org, reset.org and Nitro Snowboards are among my favorite projects of that time. Although the period started on the back-end side, I gradually moved to the front-end side and started working with Sass (Compass), 96 grids and of course jQuery. And that I switched from SVN to GIT."
        from="2005"
        stack={['css', 'html5', 'javascript', 'sass', 'php', 'drupal', 'git', 'linux']}
      />
      <ExperienceItem
        className={classes.item}
        title="Software Developer"
        employer="MyDriver"
        text="I got convinced to take a position at a VTC start-up funded by Sixt but the experience cut short as they moved the whole development to an other location (and remote work wasn't a thing back in the days). However, it's during that time that I started using front-end frameworks like Backbone.js. It's about that time that I first used a JavaScript bundler like Grunt.js and wrote my first plugins for it."
        from="2012"
        to="2013"
        stack={['backbonejs', 'gruntjs', 'sass', 'compass', 'jquery', 'git', 'linux']}
      />
      <ExperienceItem
        className={classes.item}
        title="Core Developer"
        employer="Camunda"
        text="Designing, developing and maintaining the UI of the Camunda BPM platform web‐apps, documentation and blog. The major part of my work was published under an open‐source license."
        from="2014-01"
        to="2017-03"
        stack={['gruntjs', 'requirejs', 'mocha', 'jenkins', 'angularjs', 'bootstrap', 'html5', 'protractor', 'git', 'linux']}
        links={[
          'https://docs.camunda.org/manual/7.4/webapps/tasklist/',
          'https://docs.camunda.org/manual/7.4/webapps/cockpit/',
          'https://github.com/camunda/camunda-commons-ui',
        ]}
      />
      <ExperienceItem
        className={classes.item}
        title="Visual Fiha"
        text="Created an application for creative coders to generate visuals that can react to sound and can be controlled by MIDI devices. The application was published under open-source license and run without installation in the browser."
        from="2017-03"
        stack={['javascript', 'ampersandjs', 'webaudio', 'midi', 'git', 'pwa', 'cssom']}
      />
      <ExperienceItem
        className={classes.item}
        title="Lecturer"
        employer="Devugees - DCI"
        text="Teaching front‐end development fundamentals, writing exercises and establishing the curriculum for the students."
        from="2017-07"
        to="2018-01"
        stack={['javascript', 'css', 'html5', 'travisci', 'react', 'sass', 'neutrino', 'webpack', 'git', 'linux']}
      />
      <ExperienceItem
        className={classes.item}
        title="Senior Front-end Developer"
        employer="MWD"
        text="Created a React Native application for the Berlin ice hockey team."
        from="2018-05"
        to="2018-11"
        stack={['javascript', 'css', 'html5', 'react-native', 'expo', 'websockets', 'mobx', 'git', 'macos']}
      />
      <ExperienceItem
        className={classes.item}
        title="Senior Front-end Developer"
        employer="jobpal"
        text="In charge of the B2B dashboard ﴾based on ReactJS﴿ development and maintenance."
        from="2018-11"
        to="2020-11"
        stack={['javascript', 'css', 'html5', 'redux', 'react', 'nodejs', 'mongoose', 'expressjs', 'jest', 'circleci', 'eslint', 'testing-library', 'webpack', 'aws', 'websockets', 'git', 'macos']}
      />
      <ExperienceItem
        className={classes.item}
        title="Senior Front-end Developer"
        employer="SmartRecruiters"
        text="My role at SmartRecruiters was to ease the integration of the software I created during my time at jobpal."
        from="2020-11"
        to="2021-02"
        stack={['javascript', 'css', 'html5', 'redux', 'react', 'nodejs', 'mongoose', 'expressjs', 'jest', 'eslint', 'jenkins', 'testing-library', 'webpack', 'aws', 'websockets', 'git', 'macos']}
      />
      <ExperienceItem
        className={classes.item}
        title="Senior Front-end Developer"
        employer="GoStudent"
        text="Caring for the code quality, harmonization, automation, technical documentation and on‐boarding of new hires in a rapidly growing development team."
        from="2021-08"
        to="2022-01"
        stack={['javascript', 'redux', 'react', 'nodejs', 'jest', 'eslint', 'typescript', 'testing-library', 'webpack', 'websockets', 'git', 'macos']}
      />
       */}
    </Box>
  );
}

export default Timeline;
