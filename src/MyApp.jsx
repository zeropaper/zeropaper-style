/* global document, window */

import moment from 'moment';
import React from 'react';
import throttle from 'lodash.throttle';
/* eslint-disable no-unused-vars */
// import Leaflet from './Leaflet.jsx';
import Timeline from './Timeline.jsx';
/* eslint-enable no-unused-vars */

require('./root.css');

function scrollVert(el) {
  window.scroll(0, el.offsetTop - (window.innerHeight / 2));
}

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolledTop: 0,
      positions: [],
      events: [],
      currentIndex: null,
    };

    this.broadcastState = this.broadcastState.bind(this);
    this.populatePositions = this.populatePositions.bind(this);
    this.scrolled = throttle(this.scrolled, 100, { trailing: true }).bind(this);
    this.focusEvent = this.focusEvent.bind(this);
  }

  currentEvent() {
    return this.state.events[this.state.currentIndex];
  }

  populatePositions(force) {
    if (this.state.positions.length && !force) return this.state.positions;

    let prev = 0;
    const rect = document.body.getBoundingClientRect();
    const scrolledTop = Math.abs(rect.top);

    const positions = [];

    this.state.events.forEach((event) => {
      const current = event.el.getBoundingClientRect().top + (scrolledTop);
      positions.push([
        prev,
        current,
        (current) - prev,
        event.name,
      ]);
      prev = current;
    });

    this.broadcastState({ positions });

    return positions;
  }

  scrolled() {
    const rect = document.body.getBoundingClientRect();
    const scrolledTop = Math.abs(rect.top - (window.innerHeight * 0.5));
    this.setState({ scrolledTop });

    this.populatePositions();

    const currentIndex = this.state.positions
      .findIndex(position => scrolledTop >= position[0] && scrolledTop < position[1]);

    this.state.events.forEach((event, e) => event.el.classList[e === currentIndex ? 'add' : 'remove']('current'));

    this.broadcastState({ currentIndex });
  }

  componentWillMount() {
    const opts = {
      passive: true,
      capture: false,
    };
    window.addEventListener('resize', this.scrolled, opts);
    window.addEventListener('scroll', this.scrolled, opts);
  }


  componentDidMount() {
    const events = [];
    document.querySelectorAll('[data-event]').forEach((el) => {
      const name = el.getAttribute('data-event');

      const coords = el.getAttribute('data-coords')
        .split(',')
        .map(val => parseFloat(val.trim(), 10));

      const dates = el.getAttribute('data-date')
        .split(' ')
        .filter(str => str.trim())
        .map(str => moment(str));

      events.push({
        el,
        name,
        coords,
        dates,
        location: el.getAttribute('data-location'),
      });
    });
    this.timelineHeight = document.querySelector('.timeline').clientHeight;

    this.broadcastState({ events });

    this.scrolled();
  }

  broadcastState(obj) {
    this.setState(obj);
    Object.keys(this.refs)
      .forEach(key => this.refs[key].setState(obj));
  }

  componentWillUnmount() {
    const opts = {
      passive: true,
      capture: false,
    };
    window.removeEventListener('resize', this.scrolled, opts);
    window.removeEventListener('scroll', this.scrolled, opts);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !this.state.events.length ||
           this.state.currentIndex === null ||
            this.state.currentIndex !== nextState.currentIndex;
  }

  focusEvent(index) {
    this.setState({ currentIndex: index });
    const currentEvent = this.currentEvent();
    if (!currentEvent) return;
    scrollVert(currentEvent.el);
    this.scrolled();
    this.broadcastState({ currentEvent });
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <Timeline
            ref="timeline"
            focusEvent={this.focusEvent}
          />
        </div>
      </div>
    );
  }
}
