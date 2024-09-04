const { app, BrowserWindow, dialog, ipcMain } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle('show-save-dialog', async (event, options) => {
  return dialog.showSaveDialog(options);
});
