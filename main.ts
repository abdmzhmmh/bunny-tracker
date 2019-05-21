import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import Bunny from "./src/app/entities/bunny.schema";
import IPC_EVENT from './src/app/ipcEvents'
import * as sqlite from 'sqlite';
import { Database } from "sqlite";

let win, serve;
const args = process.argv.slice(1);
// This is basically a surrogate for "dev" environment
serve = args.some(val => val === '--serve');

const createWindow = async () => {

  const database: Database = await sqlite.open('database.sqlite');
  await database.migrate({force: serve ? 'last' : undefined, migrationsPath: 'src/assets/migrations'});

  ipcMain.on(IPC_EVENT.getBunny, async (event: any, ...args: any[]) => {
    try {
      event.returnValue = await database.all('SELECT * FROM bunnies');
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on(IPC_EVENT.addBunny, async (event: any, bunny: Bunny) => {
    try {
      event.returnValue = await database.all('SELECT * FROM bunnies');
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on(IPC_EVENT.deleteBunny, async (event: any, bunny: Bunny) => {
    try {
      event.returnValue = await database.all('SELECT * FROM bunnies');
    } catch (err) {
      throw err;
    }
  });


  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

};

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
