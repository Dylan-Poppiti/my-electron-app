const {app, BrowserWindow, Menu, ipcMain, dialog} = require('electron')

const path = require('path')
const child_process = require('child_process')

var hold ={
    a:'0',
    b:'1',
    c:'2'
}

//call cmd to  run script (fin) 
function run_script(fin){

    hold.b= child_process.execSync(fin).toString();


    /*child_process.exec(fin,(error, stdout,stderr)=>{
        if(error){
            console.log(`error: ${error.message}`)
        }
        if(stderr){
            console.log(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`)

        
        
    })*/

    

    console.log("In Script " + hold.b)
}

//create window
function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
        
      
        nodeIntegration: true,
        contextIsolation: true,
        enableRemoteModule: false,
        ipcPassingArrayByReference: true,
        //connects to the preload.js file
        preload: path.join(__dirname, 'preload.js')
    }  })

  const menu = Menu.buildFromTemplate([{
      label: app.name,
      //create submenu
      submenu: [
          {
        //send button
            label: 'Send',
            click(){ 
               var cut = "Lob"
               mainWindow.webContents.send('u-value', hold); 
               createSend()           
            }
        },
        {
            label: 'Set',
            click(){
                 mainWindow.webContents.send('u-fin', hold.b);
                 createReceive()
            }
        }    
      ]}
  ])
  Menu.setApplicationMenu(menu)
  mainWindow.loadFile('index.html')
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

function createSend () {
    const op ={
        title:'Alert',
        message: 'Mail Notice',
        detail:'Message sent!'
    }
    const sendPath =dialog.showMessageBox(null,op);
    console.log(sendPath);
}

function createReceive(){
    const op ={
        title:'Alert',
        message: 'You\'ve got mail!',
        detail:'Data received from the backend'
    }
    const sendPath =dialog.showMessageBox(null,op);
    console.log(sendPath);
}
app.whenReady().then(() => {
  ipcMain.on('u-value', (_event, value) => {
    console.log(value) // will print value to Node console
  })

ipcMain.on('u-value',(event, arg)=>{
    
    hold.a=arg

    var dd = 'echo Yob | perl back.pl'

    const pass = 'echo ' + hold.a;
    const fin = pass +' | perl back.pl'
    console.log(fin)
    run_script(fin);
    console.log(hold.b + "\nBruh")
        
})

ipcMain.on('u-fin',(event,arg)=>{

})

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

