var app = require('app');
var BrowserWindow = require('browser-window');

app.on('ready', function() {
  var atomScreen = require('screen');
  var size = atomScreen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    top: 0,
    left: 0,
    width: size.width,
    height: size.height,
    frame: false,
    resizeable: false,
    'always-on-top': true,
    'accept-first-mouse': true,
    transparent: true
  });

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

