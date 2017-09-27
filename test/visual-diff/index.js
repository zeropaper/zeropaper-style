const fs = require('fs');
const path = require('path');
const resemble = require('node-resemble-v2');
const saveReference = !!process.env.TEST_SAVE_BASELINE;
var mkdirp = require('mkdirp');


const readFile = fs.readFileSync;
function writeFile(destination, data) {
  try {
    fs.unlinkSync(destination);
  } catch(up) {/* vale ist ne dreck sau */}

  mkdirp.sync(path.dirname(destination));
  fs.writeFileSync(destination, data);
}


module.exports = class VisualDiff {
  constructor(browser, shotsPath = 'shots', referencesPath = 'references', tolerance = 5) {
    this.browser = browser;
    this.referencesPath = referencesPath;
    this.shotsPath = shotsPath;
    this.tolerance = tolerance;
    this.resolutions = {
      'ipad-p': [768, 1024],
      'ipad-l': [1024, 768],
      'galaxy-s5-p': [360, 640],
      'galaxy-s5-l': [640, 360],
      'iphone-6-p': [375, 667],
      'iphone-6-l': [667, 375]
    };

    mkdirp.sync(this.referencesPath);
    mkdirp.sync(this.shotsPath);
  }

  getReference(testName, resolution) {
    var ref;
    try {
      ref  = readFile(this.referenceFilepath(testName, resolution));
    } catch(up) {/*  */}
    return ref;
  }

  shotFilename(testName, resolution) {
    return `${testName}--${resolution}.png`;
    // return [testName, resolution]
    //   .filter(v => !!v)
    //   .join('--') + '.png';
  }

  shotFilepath(testName, resolution) {
    return path.join(this.shotsPath, this.shotFilename(testName, resolution));
  }

  diffFilepath(testName, resolution) {
    return path.join(this.shotsPath, 'diff-' +this.shotFilename(testName, resolution));
  }

  baselineFilepath(testName, resolution) {
    return path.join(this.shotsPath, 'bl-' +this.shotFilename(testName, resolution));
  }

  referenceFilepath(testName, resolution) {
    return path.join(this.referencesPath, this.shotFilename(testName, resolution));
  }

  addHTML(testName) {
    if (!this.shotsPath) return;

    const images = Object.keys(this.resolutions)
      .map(r => `${testName}--${r}`);
    const htmlFile = readFile(path.join(__dirname, 'index.html')).toString()
      .split('var images = [];')
      .join('var images = ' + JSON.stringify(images) + ';');

    writeFile(path.join(this.shotsPath, testName + '.html'), htmlFile);
  }

  shootAll(testName, timeout = 0) {
    this.addHTML(testName);
    console.log('shootAll', testName);

    return Promise.all(Object.keys(this.resolutions)
      .map(resolution => this.shoot(testName, resolution, timeout)));
  }

  shoot(testName, resolution, timeout = 0) {
    console.log('shoot', testName, resolution);
    browser.windowHandleMaximize();

    browser.windowHandleSize({
      width: this.resolutions[resolution][0],
      height: this.resolutions[resolution][1]
    });

    if(timeout) browser.pause(timeout);

    const reference = this.getReference(testName, resolution);
    if (!reference) {
      console.log('no reference');
      return browser.saveScreenshot(this.referenceFilepath(testName, resolution));
    }

    writeFile(this.baselineFilepath(testName, resolution), reference);

    const screenshot = browser.saveScreenshot(this.shotFilepath(testName, resolution));

    return this.compare(testName, resolution, screenshot, reference);
  }

  compare(testName, resolution, screenshot, reference) {
    const tolerance = this.tolerance;
    const shotFilename = this.shotFilename;
    const diffFilepath = this.diffFilepath(testName, resolution);

    return new Promise((resolve, reject) => {
      resemble(screenshot)
        .compareTo(reference)
        .onComplete(function(data) {
          if (data.rawMisMatchPercentage > tolerance) {
            console.log('diffFilepath', diffFilepath);
            fs.writeFile(diffFilepath, data.getBuffer(), err => {
              if (err) return reject(err);
              reject(new Error(`The ${data.misMatchPercentage}% mismatching exceeds the ${tolerance}% tolerance`));
            });
          }
          else {
            resolve();
          }
        });
    });
  }
};