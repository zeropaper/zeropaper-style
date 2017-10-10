const path = require('path');

module.exports = {
  // options: {
  //   output: 'docs'
  // },

  use: [
    // ['neutrino-preset-airbnb-base', {
    //   eslint: {
    //     rules: {
    //       // semi: 'off'
    //     },
    //     test: /\.(js|jsx)$/,
    //     // include: [], /* Should specify either include or exclude */
    //     // exclude: ['tile.stamen.js'], /* Should specify either include or exclude */
    //   }
    // }],
    ['neutrino-preset-react', {
      html: {
        title: 'Valentin "zeropaper" Vago\'s page',
        template: path.join(__dirname,'src/index.ejs'),
        xhtml: true,
        mobile: true,
      }
    }]
  ]
};