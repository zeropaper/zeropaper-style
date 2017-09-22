/* global document, window */

import L from 'leaflet';
import React from 'react';

require('leaflet/dist/leaflet.css');

window.L = L;

require('./tile.stamen');

const pinIcon = L.icon({
  iconUrl: '/static/pin.png',
  shadowUrl: '/static/pin-shadow.png',
  iconSize: [9, 29],
  shadowSize: [19, 17],
  iconAnchor: [3, 29],
  shadowAnchor: [0, 17],
  popupAnchor: [1, -29],
});


export default class Leaflet extends React.Component {
  constructor(/* props */) {
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
    document.querySelectorAll('[data-event]').forEach((el) => {
      const name = el.getAttribute('data-event');
      const coords = el.getAttribute('data-coords')
        .split(',')
        .map(val => parseFloat(val.trim(), 10));
      this.state.events.push({
        name,
        coords,
        date: el.getAttribute('data-date'),
        location: el.getAttribute('data-location'),
        marker: null,
      });
    });

    this.map = L.map(this.el, {
      center: (this.currentEvent() || {}).coords || [51.505, -0.09],
      zoom: 11,
    });

    const markers = [];
    this.state.events.forEach((event) => {
      // eslint-disable-next-line no-param-reassign
      event.marker = L.marker(event.coords, { icon: pinIcon })
        .bindPopup(event.name)
        .openPopup();
      event.marker.addTo(this.map);
      markers.push(event.marker);
    });

    // eslint-disable-next-line
    const group = new L.featureGroup(markers);
    this.map.fitBounds(group.getBounds());

    (new L.StamenTileLayer('toner', {
      detectRetina: true,
    })).addTo(this.map);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !this.state.events.length ||
           this.state.currentIndex === null ||
            this.state.currentIndex !== nextState.currentIndex;
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div className="map" ref={(el) => { this.el = el; }}></div>
    );
  }
}
