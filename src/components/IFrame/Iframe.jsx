import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Link from '../Link/Link';

const useStyles = createUseStyles(({
  spacing,
  background: {
    shades: backgroundShades,
  },
  typography: {
    shades,
  },
}) => ({
  root: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  iframe: {
    border: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
  },
  aside: ({ open }) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '35vw',
    zIndex: 100,
    background: backgroundShades[0],
    transition: 'all 218ms ease-in',
    right: open ? 0 : '-35vw',
    borderLeft: open ? `1px solid ${shades[5]}` : '1px solid transparent',
    padding: spacing(1),
  }),
  asideToggle: {
    position: 'absolute',
    right: '100%',
  },
}), {
  name: 'IFrame',
});

const IFrame = (props) => {
  const {
    src,
    title,
    description,
    source,
  } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles({ ...props, open });

  const handleToggle = () => setOpen((val) => !val);

  return (
    <div className={classes.root}>
      <aside className={classes.aside}>
        <div className={classes.asideToggle}>
          <button type="button" onClick={handleToggle}>
            Info
          </button>
        </div>
        <header>
          <h1>{title}</h1>
          {source && (
            <Link href={source}>Source</Link>
          )}
        </header>
        <div>
          {description}
        </div>
      </aside>
      <iframe className={classes.iframe} title={title} src={src} />
    </div>
  );
};

IFrame.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  source: PropTypes.string,
};

IFrame.defaultProps = {
  description: null,
  source: null,
};

export default IFrame;
