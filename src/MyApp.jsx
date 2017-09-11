/* global document, window */

import moment from 'moment';
import React from 'react';
import throttle from 'lodash.throttle';
/* eslint-disable no-unused-vars */
import Leaflet from './Leaflet.jsx';
import Timeline from './Timeline.jsx';
/* eslint-enable no-unused-vars */

require('./root.css');

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      currentEvent: null,
    };

    this.scrolledTop = 0;
    this.positions = [];

    this.populatePositions = this.populatePositions.bind(this);
    this.scrolled = throttle(this.scrolled, 100, { trailing: true }).bind(this);
  }

  populatePositions(force) {
    if (this.positions.length && !force) return this.positions;

    let prev = 0;
    const rect = document.body.getBoundingClientRect();
    const scrolledTop = Math.abs(rect.top);

    this.positions = [];
    const positions = this.positions;

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

    return positions;
  }

  scrolled() {
    const rect = document.body.getBoundingClientRect();
    this.scrolledTop = Math.abs(rect.top - (window.innerHeight * 0.5));
    const scrolledTop = this.scrolledTop;
    this.populatePositions();

    const currentIndex = this.positions
      .findIndex(position => scrolledTop >= position[0] && scrolledTop < position[1]);

    this.state.events.forEach((event, e) => event.el.classList[e === currentIndex ? 'add' : 'remove']('current'));
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
    document.querySelectorAll('[data-event]').forEach((el) => {
      const name = el.getAttribute('data-event');
      const coords = el.getAttribute('data-coords')
        .split(',')
        .map(val => parseFloat(val.trim(), 10));
      this.state.events.push({
        el,
        name,
        coords,
        dates: el.getAttribute('data-date')
          .split(' ')
          .filter(str => !str.trim())
          .map(str => moment(str)),
        location: el.getAttribute('data-location'),
      });
    });

    this.scrolled();
  }


  componentWillUnmount() {
    const opts = {
      passive: true,
      capture: false,
    };
    window.removeEventListener('resize', this.scrolled, opts);
    window.removeEventListener('scroll', this.scrolled, opts);
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <Timeline events={this.state.events} currentEvent={this.state.currentEvent} />
          <Leaflet events={this.state.events} currentEvent={this.state.currentEvent} />
        </div>
      </div>
    );
  }
}
