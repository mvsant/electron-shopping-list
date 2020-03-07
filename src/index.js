const electron = require('electron');
const url  = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Listen app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({

  })
  // Load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add item'
      },
      {
        label: 'Clear items'
      },
      {
        accelerator: 'CmdOrCtrl+Q',
        label: 'Quit',
        click(){
          app.quit();
        }
      }
    ]
  }
];
