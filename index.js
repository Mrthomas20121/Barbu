const {app, BrowserWindow} = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');

let mainWindow;
app.on('ready', function() {
  
  mainWindow = new BrowserWindow({
    name: 'Barbu',
    width: 1280,
    height: 720,
    icon: path.join(__dirname,'app/icons/barbu.png'),
    nodeIntegration: false
  })
  
  // close the app when closing
  app.on('window-all-closed', function() {
    app.quit();
  })
  app.on('closed', function() {
    app.quit();
  })

  // open file event
  app.on('open-file', function (event, file) {
    var content = fs.readFileSync(file).toString()
    mainWindow.webContents.send('file-opened', file, content)
  });
  
  // mainWindow.setMenu(null);

  // load url
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))
})
