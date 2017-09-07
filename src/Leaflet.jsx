import L from 'leaflet';
import React from 'react';
require('leaflet/dist/leaflet.css');
window.L = L;
require('./tile.stamen');
// const markerIcon = L.icon({
//   iconUrl: '/static/marker.png',
//   shadowUrl: '/static/marker-shadow.png',

//   iconSize:     [35, 29], // size of the icon
//   shadowSize:   [48, 25], // size of the shadow
//   iconAnchor:   [11, 29], // point of the icon which will correspond to marker's location
//   shadowAnchor: [11, 25],  // the same for the shadow
//   popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
// });

const pinIcon = L.icon({
  iconUrl: '/static/pin.png',
  shadowUrl: '/static/pin-shadow.png',

  iconSize:     [9, 29], // size of the icon
  shadowSize:   [19, 17], // size of the shadow
  iconAnchor:   [3, 29], // point of the icon which will correspond to marker's location
  shadowAnchor: [0, 17],  // the same for the shadow
  popupAnchor:  [1, -29] // point from which the popup should open relative to the iconAnchor
});


export default class Leaflet extends React.Component {
  constructor(props) {
    super();
    this.state = {
      events: [],
      currentEvent: null
    };
  }

  componentDidMount() {
    document.querySelectorAll('[data-event]').forEach(el => {
      const name = el.getAttribute('data-event');
      const coords = el.getAttribute('data-coords')
                      .split(',')
                      .map(val => parseFloat(val.trim(), 10));
      this.state.events.push({
        name: name,
        coords: coords,
        date: el.getAttribute('data-date'),
        location: el.getAttribute('data-location'),
        marker: null
      })
    });

    this.state.currentEvent = this.state.events[0] || null;

    this.map = L.map(this.el, {
      center: (this.state.currentEvent || {}).coords || [51.505, -0.09],
      zoom: 11
    });

    const markers = [];
    this.state.events.forEach(event => {
      event.marker = L.marker(event.coords, {icon: pinIcon})
        .bindPopup(event.name)
        .openPopup()
        ;
      event.marker.addTo(this.map);
      markers.push(event.marker);
    });

    const group = new L.featureGroup(markers);
    this.map.fitBounds(group.getBounds());

    (new L.StamenTileLayer('toner', {
        detectRetina: true
    })).addTo(this.map);

    // // https://leaflet-extras.github.io/leaflet-providers/preview/
    // L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(this.map);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    // this.map.setZoom(12)
    return (
      <div className="map" ref={el => this.el = el}></div>
    );
  }
};