const {app, BrowserWindow} = require('electron')      
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
    window.loadURL('http://localhost:3000/app')
}      
app.on('ready', createWindow);