import React from 'react';
// import moment from 'moment';
import vis from 'vis';

require('vis/dist/vis.css');
require('vis/dist/vis-timeline-graph2d.min.css');

export default class Timeline extends React.Component {
  constructor(props) {
    super();
    this.state = {
      events: props.events || [],
      currentEvent: props.currentEvent || null,
    };
    this.updateEvents = this.updateEvents.bind(this);
    this.updateCurrentEvent = this.updateCurrentEvent.bind(this);
    // console.log('Timeline props', props);
  }

  updateEvents(events) {
    this.setState({ events });
  }

  updateCurrentEvent(currentEvent) {
    this.setState({ currentEvent });
  }

  componentDidMount() {
    // const events = [];
    // document.querySelectorAll('[data-event]').forEach((el, e) => {
    //   const dates = el.getAttribute('data-date')
    //                 .split(' ')
    //                 .filter(str => !!str.trim())
    //                 .map(str => moment(str.trim()));
    //   events.push({
    //     id: e,
    //     content: el.getAttribute('data-event'),
    //     start: dates[0].format('YYYY-MM-DD'),
    //     end: dates[1] ? dates[1].format('YYYY-MM-DD') : null,
    //     coords: el.getAttribute('data-coords'),
    //     location: el.getAttribute('data-location')
    //   });
    // });
    // console.info('this.state', this.state);
    const events = this.state.events;
    const items = new vis.DataSet(events);
    this.timeline = new vis.Timeline(this.el, items, {
      height: '100%',
    });
  }

  componentWillUnmount() {
    this.timeline.destroy();
  }

  render() {
    return (
      <div className="timeline" ref={(el) => { this.el = el; }}></div>
    );
  }
}
