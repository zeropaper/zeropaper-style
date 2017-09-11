/* global document, window */

/* eslint-disable no-unused-vars */
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import React from 'react';
import MyApp from './MyApp.jsx';
/* eslint-enable no-unused-vars */

const load = () => {
  if (document.body.clientWidth < 600) return;
  render((
    <AppContainer>
      <MyApp />
    </AppContainer>
  ), document.getElementById('root'));
};

if (module.hot) {
  module.hot.accept('./MyApp', load);
}


load();


window.addEventListener('resize', load, {
  capture: false,
  passive: true,
});
