const electron = require('electron');
const url  = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

// Listen app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
  // Load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  })

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Handle create add windows
function createAddWindow(){
   // Create new window
   addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add shopping list item',
    webPreferences: {
      nodeIntegration: true
    }
  });
  // Load html into window
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'add_item.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Handle garbage collector
  addWindow.on('close', function(){
    addWindow = null;
  })
}

// Ctch item:add
ipcMain.on('item:add', function(event, item){
  mainWindow.webContents.send('item:add', item);
  addWindow.close();
})

// Create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add item',
        click(){
          createAddWindow();
        }
      },
      {
        label: 'Clear items',
        click(){
          mainWindow.webContents.send('item:clear');
        }
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

// If on Mac add an empty object
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Add devtools if not in production
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    accelerator: 'CmdOrCtrl+I',
    label: 'Developer Tools',
    click(item, focusedWindow){
      focusedWindow.toggleDevTools();
    }
  },
  {
    role: 'reload'
  });
};