import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MyApp from './MyApp';
require('./index.css');


const load = () => {
  if (document.body.clientWidth < 600) return;
  render((
    <AppContainer>
      <MyApp />
    </AppContainer>
  ), document.getElementById('root'))
};

if (module.hot) {
  module.hot.accept('./MyApp', load);
}


load();
window.addEventListener('resize', load, {
  capture: false,
  passive: true
});