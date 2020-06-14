const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let wondow;

function createWindow () {   
    // Create the browser window.     
    window = new BrowserWindow({
        width: 800, 
        height: 600, 
        webPreferences: {
        nodeIntegration: true,
      }
    });
        
    // and load the index.html of the app.     
    //window.loadFile('index.html')
    window.loadURL(isDev ? 'http://localhost:3000/app' : `file://${path.join(__dirname, '../build/index.html')}`);
    window.on('closed', () => mainWindow = null);
}      
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  app.on('activate', () => {
    if (window === null) {
      createWindow();
    }
  });