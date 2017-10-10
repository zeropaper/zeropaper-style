import React from 'react';
// import moment from 'moment';
import vis from 'vis';

require('vis/dist/vis.css');
require('vis/dist/vis-timeline-graph2d.min.css');

export default class Timeline extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      currentIndex: null,
    };
  }

  currentEvent() {
    return this.state.events[this.state.currentIndex];
  }

  componentDidMount() {
    const events = this.state.events;
    const items = new vis.DataSet(events);

    this.timeline = new vis.Timeline(this.el, items, {
      height: '100%',
    });

    this.timeline.on('select', (properties) => {
      this.props.focusEvent(properties.items[0]);
      const currentEvent = this.currentEvent();
      if (currentEvent.end) this.timeline.setWindow(currentEvent.start, currentEvent.end);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !this.state.events.length ||
           this.state.currentIndex === null ||
            this.state.currentIndex !== nextState.currentIndex;
  }

  componentDidUpdate(prevProps, prevState) {
    const tl = this.timeline;
    // console.info(prevState.events.length, this.state.events.length);
    if (prevState.events.length !== this.state.events.length) {
      tl.setItems(this.state.events.map((event, e) => {
        const info = {
          id: e,
          content: event.name,
          start: event.dates[0],
        };
        if (event.dates[1]) info.end = event.dates[1];
        return info;
      }));
      tl.fit();
    }

    const currentEvent = this.currentEvent();
    if (currentEvent) {
      tl.setSelection(this.state.currentIndex, {
        focus: true,
      });
      if (currentEvent.end) tl.setWindow(currentEvent.start, currentEvent.end);
    }
  }

  componentWillUnmount() {
    this.timeline.destroy();
  }

  render() {
    return (
      <div className="timeline"
        ref={(el) => { this.el = el; }}></div>
    );
  }
}
