const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false, 
      preload: path.join(__dirname, "preload.js"),
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
