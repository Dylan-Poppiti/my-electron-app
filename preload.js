const { remote,contextBridge, ipcRenderer } = require('electron')

//let currentWindow=remote.BrowserWWindow.getFocusedWindow();
// contextBridge connects renderer.js, main.js, and indext.html


contextBridge.exposeInMainWorld('electronAPI', {

     handleCounter: (callback) => ipcRenderer.on('u-value', callback),
     finText: (callback) => ipcRenderer.on('u-fin',callback)

        
     })