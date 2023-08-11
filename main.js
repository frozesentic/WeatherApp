const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js')
      },
      icon: path.join(__dirname, 'WheaterApp.png') // Specify the correct icon file path
  });

  mainWindow.loadFile('iindex.html');

  mainWindow.setMenu(null); // Add this line

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'iindex.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
