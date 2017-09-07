import React from 'react';
import Leaflet from './Leaflet';
import Timeline from './Timeline';
import throttle from 'lodash.throttle';
require('./root.css');

export default class MyApp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      events: [],
      currentEvent: null
    };

    this.scrolledTop = 0;
    this.positions = [];

    this.populatePositions = this.populatePositions.bind(this);
    this.scrolled = throttle(this.scrolled, 100, {trailing: true}).bind(this);
  }

  populatePositions(force) {
    if (this.positions.length && !force) return this.positions;
    const rect = document.body.getBoundingClientRect();
    const scrolledTop = Math.abs(rect.top);

    const positions = this.positions = [];
    var prev = 0;

    this.state.events.forEach((event, e) => {
      const current = event.el.getBoundingClientRect().top + (scrolledTop);
      positions.push([
                      prev,
                      current,
                      (current) - prev,
                      event.name
                    ]);
      prev = current;
    });

    return positions;
  }

  scrolled() {
    const rect = document.body.getBoundingClientRect();
    const scrolledTop = this.scrolledTop = Math.abs(rect.top - (window.innerHeight * 0.5));
    this.populatePositions();

    const currentIndex = this.positions
                          .findIndex(position => scrolledTop >= position[0] && scrolledTop < position[1]);

    this.state.events.forEach((event, e) => {
      event.el.classList[e === currentIndex ? 'add' : 'remove']('current');
    });
  }

  componentWillMount() {
    const opts = {
      passive: true,
      capture: false
    };
    window.addEventListener('resize', this.scrolled, opts);
    window.addEventListener('scroll', this.scrolled, opts);
  }


  componentDidMount() {
    document.querySelectorAll('[data-event]').forEach(el => {
      const name = el.getAttribute('data-event');
      const coords = el.getAttribute('data-coords')
                      .split(',')
                      .map(val => parseFloat(val.trim(), 10));
      this.state.events.push({
        el: el,
        name: name,
        coords: coords,
        dates: el.getAttribute('data-date')
                .split(' ')
                .filter(str => !str.trim())
                .map(str => moment(str)),
        location: el.getAttribute('data-location')
      })
    });

    this.scrolled();
  }

  componentWillUnmount() {
    const opts = {
      passive: true,
      capture: false
    };
    window.removeEventListener('resize', this.scrolled, opts);
    window.removeEventListener('scroll', this.scrolled, opts);
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <Timeline />
          <Leaflet />
        </div>
      </div>
    );
  }
}