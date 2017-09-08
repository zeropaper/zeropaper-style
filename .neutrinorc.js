const path = require('path');
module.exports = {
  // options: {
  //   output: 'docs'
  // },

  use: [
    ['neutrino-preset-airbnb', {}],
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